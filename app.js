// ================= setup =================
const $ = s => document.querySelector(s);
const KEY = "jpPractice.v1";
const store = Object.assign({ items: {}, best: 0 }, JSON.parse(localStorage.getItem(KEY) || "{}"));
const save = () => localStorage.setItem(KEY, JSON.stringify(store));
const state = Object.assign({ deck: "vocab", level: "4", mode: "mixed" },
  JSON.parse(localStorage.getItem(KEY + ".settings") || "{}"));
const saveSettings = () => localStorage.setItem(KEY + ".settings", JSON.stringify(state));

const ITEMS = [
  ...KANJI.map(([k, hv, on, kun, m, lv, w, r, wm]) =>
    ({ id: "k:" + k, type: "kanji", q: k, hv, on, kun, meaning: m, lv, word: w, reading: r, wordMeaning: wm })),
  ...VOCAB.map(([w, r, m, pos, lv, s, se]) =>
    ({ id: "v:" + w, type: "vocab", q: w, word: w, reading: r, meaning: m, pos, lv, s, se, wordMeaning: m })),
];

const MODE_NAMES = { choice: "Trắc nghiệm · 選択", match: "Kéo nối · マッチング", type: "Gõ cách đọc · 読み入力",
  spell: "Ghép cách đọc · 読み並べ", fill: "Điền chỗ trống · 穴埋め", cards: "Thẻ ghi nhớ · カード" };

let session = { c: 0, t: 0, streak: 0 };
let recent = [];
let waiting = false, nextReadyAt = 0, autoTimer = null, keyHandler = null;

const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rand = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ================= romaji → kana =================
const ROMA = (() => {
  const t = { a: "あ", i: "い", u: "う", e: "え", o: "お" };
  const rows = { k: "かきくけこ", s: "さしすせそ", t: "たちつてと", n: "なにぬねの", h: "はひふへほ", m: "まみむめも",
    r: "らりるれろ", g: "がぎぐげご", z: "ざじずぜぞ", d: "だぢづでど", b: "ばびぶべぼ", p: "ぱぴぷぺぽ" };
  const v = "aiueo";
  for (const c in rows) for (let j = 0; j < 5; j++) t[c + v[j]] = rows[c][j];
  Object.assign(t, { ya: "や", yu: "ゆ", yo: "よ", wa: "わ", wo: "を", shi: "し", chi: "ち", tsu: "つ", fu: "ふ", ji: "じ",
    sha: "しゃ", shu: "しゅ", sho: "しょ", she: "しぇ", cha: "ちゃ", chu: "ちゅ", cho: "ちょ", che: "ちぇ",
    ja: "じゃ", ju: "じゅ", jo: "じょ", je: "じぇ", "-": "ー",
    xa: "ぁ", xi: "ぃ", xu: "ぅ", xe: "ぇ", xo: "ぉ", la: "ぁ", li: "ぃ", lu: "ぅ", le: "ぇ", lo: "ぉ",
    xtu: "っ", ltu: "っ", xya: "ゃ", xyu: "ゅ", xyo: "ょ", lya: "ゃ", lyu: "ゅ", lyo: "ょ" });
  const iRow = { k: "き", g: "ぎ", n: "に", h: "ひ", b: "び", p: "ぴ", m: "み", r: "り", s: "し", z: "じ", t: "ち", c: "ち", d: "ぢ", j: "じ" };
  const sm = { a: "ゃ", u: "ゅ", o: "ょ" };
  for (const c in iRow) for (const x in sm) t[c + "y" + x] = iRow[c] + sm[x];
  return t;
})();

function toKana(str, final) {
  const s = str.toLowerCase().replace(/\s+/g, "");
  let out = "", i = 0;
  while (i < s.length) {
    const c = s[i], n1 = s[i + 1], n2 = s[i + 2];
    if (c === "n") {
      if (n1 === undefined) { out += final ? "ん" : "n"; i++; continue; }
      if (n1 === "'") { out += "ん"; i += 2; continue; }
      if (n1 === "n") { out += "ん"; i += (n2 !== undefined && /[aiueoy]/.test(n2)) ? 1 : 2; continue; }
      if (!/[aiueoy]/.test(n1)) { out += "ん"; i++; continue; }
    }
    if (n1 === c && /[bcdfghjkmpqrstvwxz]/.test(c)) { out += "っ"; i++; continue; }
    let hit = false;
    for (let L = 3; L > 0; L--) {
      const seg = s.substr(i, L);
      if (ROMA[seg]) { out += ROMA[seg]; i += L; hit = true; break; }
    }
    if (!hit) { out += s[i]; i++; }
  }
  return out;
}
const kataToHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

// ================= speech =================
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP"; u.rate = .85;
  const v = speechSynthesis.getVoices().find(v => v.lang.startsWith("ja"));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}

// ================= item selection =================
function pool() {
  return ITEMS.filter(i => i.type === state.deck && (state.level === "both" || String(i.lv) === state.level));
}
const rec = it => store.items[it.id] || { c: 0, w: 0 };
const learned = r => r.c >= 3 && r.c >= 2 * r.w;
function weight(it) {
  const r = rec(it);
  let w = 1 + 3 * r.w / (r.c + 1);
  if (r.c + r.w === 0) w += 1;          // unseen items get a boost
  if (learned(r)) w *= 0.4;              // learned ones come up less
  if (recent.includes(it.id)) w *= 0.05; // avoid repeats
  return w;
}
function pickN(list, n) {
  const pool = [...list], out = [];
  while (out.length < n && pool.length) {
    const ws = pool.map(weight);
    let t = Math.random() * ws.reduce((a, b) => a + b, 0), k = 0;
    for (; k < pool.length - 1; k++) { t -= ws[k]; if (t <= 0) break; }
    out.push(pool.splice(k, 1)[0]);
  }
  return out;
}
function remember(it) { recent.push(it.id); if (recent.length > 8) recent.shift(); }

// distractors: other items with a different answer, unique
function distractors(it, field, n, list) {
  const ans = field(it), seen = new Set([ans]), out = [];
  const sources = [shuffle(list || pool()), shuffle(ITEMS.filter(x => x.type === it.type))];
  for (const src of sources) for (const x of src) {
    if (out.length >= n) break;
    const v = field(x);
    if (x.id !== it.id && !seen.has(v)) { seen.add(v); out.push(v); }
  }
  return out;
}

function record(it, ok) {
  const r = store.items[it.id] || (store.items[it.id] = { c: 0, w: 0 });
  ok ? r.c++ : r.w++;
  session.t++;
  if (ok) { session.c++; session.streak++; store.best = Math.max(store.best, session.streak); }
  else session.streak = 0;
  save(); renderStats();
}

// ================= feedback / flow =================
const KMAP = Object.fromEntries(ITEMS.filter(i => i.type === "kanji").map(i => [i.q, i]));
// one row per kanji in the word, the studied kanji highlighted
function kanjiParts(word, focus) {
  const rows = [...word].filter(c => /[一-龯]/.test(c)).map(c => {
    const k = KMAP[c], x = KANJI_EXTRA[c];
    const hv = k ? k.hv : x ? x[0] : "", m = k ? k.meaning : x ? x[1] : "";
    const rd = k ? [k.on, k.kun] : KANJI_EXTRA_RD[c];
    const reads = rd ? `On ${rd[0] || "—"} · Kun ${rd[1] || "—"}` : "";
    const now = c === focus ? '<span class="now">chữ đang học</span>' : "";
    return `<tr><td class="kc">${c}</td><td class="hv">${hv}</td><td>${esc(m)}${now}</td><td class="rd">${reads}</td></tr>`;
  });
  return rows.length ? `<table class="parts">${rows.join("")}</table>` : "";
}
// kanjiFirst: the question was about the single kanji, so lead with it and show the word as an example
function info(it, kanjiFirst = false) {
  if (it.type === "kanji" && kanjiFirst) {
    const others = [...it.word].filter(c => c !== it.q).join("");
    return `<div class="head"><span class="big">${it.q}</span><span class="hvbig">${it.hv}</span><span class="wm">${esc(it.meaning)}</span></div>
      <div class="rdline">On <span class="r">${it.on || "—"}</span> · Kun <span class="r">${it.kun || "—"}</span></div>
      <div class="example"><span class="exlabel">Ví dụ</span><span class="r exw">${it.word}</span><span class="r">${it.reading}</span><span>${esc(it.wordMeaning)}</span></div>
      ${kanjiParts(others, null)}`;
  }
  const head = `<div class="head"><span class="big">${it.word}</span><span class="r">${it.reading}</span><span class="wm">${esc(it.wordMeaning)}</span></div>`;
  return head + kanjiParts(it.word, it.type === "kanji" ? it.q : null);
}
function showFeedback(ok, html) {
  const fb = $("#feedback");
  fb.className = "feedback show " + (ok ? "ok" : "no");
  $("#fbInfo").innerHTML = `<div class="verdict">${ok ? "正解！ Chính xác!" : "残念… Chưa đúng."}</div>` + html;
  waiting = true; nextReadyAt = Date.now() + 250;
  if (!ok) { $("#card").classList.remove("shake"); void $("#card").offsetWidth; $("#card").classList.add("shake"); }
  $("#nextBtn").focus({ preventScroll: true });
}

function availableModes() {
  return state.deck === "vocab" ? ["choice", "match", "type", "spell", "fill", "cards"] : ["choice", "match", "type", "spell", "cards"];
}

function next() {
  clearTimeout(autoTimer);
  waiting = false; keyHandler = null;
  $("#feedback").className = "feedback";
  let mode = state.mode;
  if (mode === "mixed") {
    const bag = ["choice", "choice", "choice", "type", "type", "spell", "spell", "match"];
    if (state.deck === "vocab") bag.push("fill", "fill", "fill");
    mode = rand(bag);
  }
  if (!availableModes().includes(mode)) mode = "choice";
  $("#tag").textContent = (state.mode === "mixed" ? "Hỗn hợp · " : "") + MODE_NAMES[mode];
  const stage = $("#stage");
  stage.innerHTML = "";
  ({ choice: modeChoice, match: modeMatch, type: modeType, spell: modeSpell, fill: modeFill, cards: modeCards })[mode](stage);
}

// ================= mode: multiple choice =================
function choiceButtons(stage, options, correct, isJp, onPick) {
  const box = document.createElement("div");
  box.className = "choices";
  options.forEach((o, i) => {
    const b = document.createElement("button");
    if (isJp) b.classList.add("jpopt");
    b.innerHTML = `<span class="n">${i + 1}</span><span>${esc(o)}</span>`;
    b.onclick = () => {
      if (waiting) return;
      box.querySelectorAll("button").forEach(x => { x.disabled = true; if (x.dataset.v === correct) x.classList.add("right"); });
      if (o !== correct) b.classList.add("wrong");
      onPick(o === correct);
    };
    b.dataset.v = o;
    box.appendChild(b);
  });
  stage.appendChild(box);
  keyHandler = e => { const b = box.children[parseInt(e.key) - 1]; if (b && !waiting) b.click(); };
}

function modeChoice(stage) {
  const [it] = pickN(pool(), 1); remember(it);
  const kinds = it.type === "kanji" ? ["meaning", "meaning", "hv", "char", "reading"] : ["meaning", "word", "reading"];
  const kind = rand(kinds);
  let promptHtml, sub, field, jpOpts;
  if (kind === "meaning") {
    promptHtml = `<div class="prompt ${it.type === "vocab" ? "word" : ""}">${it.q}</div>`;
    sub = "Nghĩa là gì? · 意味は？"; field = x => x.meaning; jpOpts = false;
  } else if (kind === "hv") {
    promptHtml = `<div class="prompt">${it.q}</div>`;
    sub = "Âm Hán Việt là gì? · 漢越音は？"; field = x => x.hv; jpOpts = false;
  } else if (kind === "reading") {
    promptHtml = `<div class="prompt word">${it.word}</div>`;
    sub = `Đọc thế nào? · 読み方は？ · <i>${esc(it.wordMeaning)}</i>`; field = x => x.reading; jpOpts = true;
  } else {
    promptHtml = `<div class="prompt en">${esc(it.meaning)}</div>`;
    sub = it.type === "kanji" ? "Chữ kanji nào mang nghĩa này? · どの漢字？" : "Từ nào mang nghĩa này? · どの言葉？"; field = x => x.q; jpOpts = true;
  }
  stage.innerHTML = promptHtml + `<div class="sub">${sub}</div>`;
  const ans = field(it);
  const opts = shuffle([ans, ...distractors(it, field, 3)]);
  choiceButtons(stage, opts, ans, jpOpts, ok => {
    record(it, ok); speak(it.reading); showFeedback(ok, info(it, kind !== "reading"));
  });
}

// ================= mode: drag to match =================
function modeMatch(stage) {
  const kind = state.deck === "kanji" ? rand(["meaning", "hv"]) : rand(["meaning", "reading"]);
  const field = x => kind === "meaning" ? x.meaning : kind === "hv" ? x.hv : x.reading;
  const kindName = { meaning: "nghĩa", hv: "âm Hán Việt", reading: "cách đọc" }[kind];
  const items = [], seen = new Set();
  for (const x of pickN(pool(), 12)) {
    if (items.length >= 5) break;
    if (!seen.has(field(x))) { seen.add(field(x)); items.push(x); }
  }
  items.forEach(remember);
  stage.innerHTML = `<div class="prompt en" style="font-size:22px;margin:30px 0 4px">Nối mỗi ${state.deck === "kanji" ? "chữ kanji" : "từ"} với ${kindName} của nó</div>
    <div class="sub">Kéo từ cột trái sang cột phải — hoặc bấm chọn mỗi bên một ô · 線で結ぼう</div>`;
  const wrap = document.createElement("div"); wrap.className = "match";
  const L = document.createElement("div"), R = document.createElement("div");
  L.className = R.className = "col";
  wrap.append(L, R); stage.appendChild(wrap);

  const missed = new Set(); let doneCount = 0, selected = null;
  shuffle(items).forEach(it => {
    const d = document.createElement("div"); d.className = "m left"; d.textContent = it.q; d.item = it; d.style.gridColumn = 1; d.style.gridRow = L.children.length + 1; L.appendChild(d);
  });
  shuffle(items).forEach(it => {
    const d = document.createElement("div"); d.className = "m right" + (kind === "reading" ? " jpopt" : "");
    d.textContent = field(it); d.item = it; d.style.gridColumn = 2; d.style.gridRow = R.children.length + 1; R.appendChild(d);
  });

  function attempt(left, right) {
    if (left.classList.contains("done") || right.classList.contains("done")) return;
    left.classList.remove("sel"); selected = null;
    if (left.item === right.item) {
      left.classList.add("done"); right.classList.add("done");
      // slide the matched answer into its kanji's row (swap with whatever card is there)
      const row = left.style.gridRow, old = right.style.gridRow;
      if (row !== old) {
        const occupant = [...R.children].find(x => x.style.gridRow === row);
        if (occupant) occupant.style.gridRow = old;
        right.style.gridRow = row;
      }
      if (missed.has(left.item.id)) { left.classList.add("late"); right.classList.add("late"); }
      speak(left.item.reading);
      record(left.item, !missed.has(left.item.id));
      if (++doneCount === items.length) {
        const ok = missed.size === 0;
        const rows = items.map(i => `<tr><td class="kc">${i.q}</td>${i.type === "kanji" ? `<td class="hv">${i.hv}</td>` : `<td class="r">${i.reading}</td>`}<td>${esc(i.meaning)}</td>
          <td class="rd">${missed.has(i.id) ? '<span class="now">nối sai</span>' : ""}</td></tr>`).join("");
        showFeedback(ok, `<div class="head"><span class="wm">${ok ? "Nối đúng hết ngay lần đầu!" : `Nối sai ${missed.size} / ${items.length} cặp <small>· ô màu cam là cặp bạn đã nối sai lúc đầu</small>`}</span></div>
          <table class="parts">${rows}</table>`);
      }
    } else {
      if (!missed.has(left.item.id)) { missed.add(left.item.id); }
      [left, right].forEach(el => { el.classList.add("bad"); setTimeout(() => el.classList.remove("bad"), 450); });
    }
  }

  // drag with pointer events (works with mouse and touch)
  L.addEventListener("pointerdown", e => {
    const el = e.target.closest(".m.left");
    if (!el || el.classList.contains("done")) return;
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY;
    let ghost = null, over = null;
    const move = ev => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
        ghost = document.createElement("div"); ghost.className = "ghost"; ghost.textContent = el.textContent;
        document.body.appendChild(ghost); el.classList.add("sel");
      }
      if (ghost) {
        ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px";
        const t = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".m.right:not(.done)");
        if (over && over !== t) over.classList.remove("over");
        over = t; if (over) over.classList.add("over");
      }
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      if (ghost) {
        ghost.remove(); el.classList.remove("sel");
        if (over) { over.classList.remove("over"); attempt(el, over); }
      } else {
        // plain click: select
        L.querySelectorAll(".sel").forEach(x => x.classList.remove("sel"));
        if (selected === el) { selected = null; } else { selected = el; el.classList.add("sel"); }
      }
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  });
  R.addEventListener("click", e => {
    const el = e.target.closest(".m.right");
    if (el && selected) attempt(selected, el);
  });
}

// ================= mode: type the reading =================
function modeType(stage) {
  const [it] = pickN(pool(), 1); remember(it);
  stage.innerHTML = `<div class="prompt word">${it.word}</div>
    <div class="sub">Gõ cách đọc bằng romaji (hoặc kana) · 読みを入力 · <i>${esc(it.wordMeaning)}</i></div>
    <div class="typebox"><input id="typeIn" autocomplete="off" spellcheck="false" placeholder="vd: kaisha"></div>
    <div class="kanaPreview" id="kanaPrev"></div>
    <div class="tip">Enter để kiểm tra · gõ phụ âm đôi ra っ (kitte) · gõ “nn” hoặc “n'” ra ん khi cần</div>`;
  const inp = $("#typeIn");
  inp.addEventListener("input", () => { $("#kanaPrev").textContent = toKana(inp.value, false); });
  inp.addEventListener("keydown", e => {
    if (e.key !== "Enter" || waiting) return;
    e.stopPropagation();
    const val = kataToHira(toKana(inp.value, true));
    if (!val) return;
    const ok = val === it.reading;
    inp.disabled = true;
    $("#kanaPrev").innerHTML = ok ? val : `<s style="color:var(--red)">${esc(val)}</s> → ${it.reading}`;
    record(it, ok); speak(it.reading); showFeedback(ok, info(it));
  });
  setTimeout(() => inp.focus(), 30);
}

// ================= mode: build the reading from tiles =================
const units = r => { const u = []; for (const ch of r) { if ("ゃゅょぁぃぅぇぉ".includes(ch) && u.length) u[u.length - 1] += ch; else u.push(ch); } return u; };
function modeSpell(stage) {
  const [it] = pickN(pool(), 1); remember(it);
  const target = units(it.reading);
  const decoyPool = [...new Set(ITEMS.flatMap(x => units(x.reading)))].filter(u => !target.includes(u));
  const tiles = shuffle([...target, ...shuffle(decoyPool).slice(0, 3)]);
  stage.innerHTML = `<div class="prompt word">${it.word}</div>
    <div class="sub">Bấm các chữ kana theo đúng thứ tự · 読みを並べよう · <i>${esc(it.wordMeaning)}</i></div>
    <div class="slots" id="slots"></div><div class="tiles" id="tiles"></div>
    <div class="tip" style="margin-top:12px">Bấm vào ô đã điền để xóa · hoặc nhấn Backspace</div>`;
  const slots = $("#slots"), tilesBox = $("#tiles");
  const placed = []; // tile elements
  target.forEach(() => { const s = document.createElement("div"); s.className = "slot"; slots.appendChild(s); });
  tiles.forEach(t => {
    const b = document.createElement("button"); b.className = "tile"; b.textContent = t;
    b.onclick = () => { if (waiting || b.classList.contains("used")) return; placed.push(b); b.classList.add("used"); draw(); };
    tilesBox.appendChild(b);
  });
  function undo(i = placed.length - 1) {
    if (waiting || i < 0 || i >= placed.length) return;
    placed.splice(i, 1).forEach(b => b.classList.remove("used")); draw();
  }
  [...slots.children].forEach((s, i) => s.onclick = () => undo(i));
  function draw() {
    [...slots.children].forEach((s, i) => { s.textContent = placed[i] ? placed[i].textContent : ""; s.classList.toggle("filled", !!placed[i]); });
    if (placed.length === target.length) {
      const built = placed.map(b => b.textContent).join("");
      const ok = built === it.reading;
      slots.classList.add(ok ? "right" : "wrong");
      if (!ok) slots.insertAdjacentHTML("afterend", `<div class="kanaPreview">→ ${it.reading}</div>`);
      record(it, ok); speak(it.reading); showFeedback(ok, info(it));
    }
  }
  keyHandler = e => { if (e.key === "Backspace") undo(); };
}

// ================= mode: fill the blank =================
function modeFill(stage) {
  const list = pool().filter(x => x.s);
  const [it] = pickN(list, 1); remember(it);
  const sameType = list.filter(x => x.pos === it.pos);
  stage.innerHTML = `<div class="sentence">${esc(it.s).replace("＿＿", '<span class="blank" id="blank">？</span>')}</div>
    <div class="english">${esc(it.se)}</div>`;
  const opts = shuffle([it.word, ...distractors(it, x => x.word, 3, sameType)]);
  choiceButtons(stage, opts, it.word, true, ok => {
    $("#blank").textContent = it.word;
    record(it, ok); speak(it.s.replace("＿＿", it.word)); showFeedback(ok, info(it));
  });
}

// ================= mode: flashcards =================
function modeCards(stage) {
  const [it] = pickN(pool(), 1); remember(it);
  stage.innerHTML = `<div class="flash" id="flash">
      <div class="prompt ${it.type === "vocab" ? "word" : ""}">${it.q}</div>
      <div class="sub">Nhớ lại nghĩa và cách đọc, rồi bấm vào thẻ (hoặc phím Space) để lật · めくってみよう</div>
    </div>`;
  let flipped = false;
  const flip = () => {
    if (flipped) return; flipped = true; speak(it.reading);
    $("#flash").innerHTML = `<div class="prompt ${it.type === "vocab" ? "word" : ""}">${it.q}</div>
      <div class="info cardback">${info(it, true)}</div>`;
    stage.insertAdjacentHTML("beforeend", `<div class="rate">
      <button class="btn red" id="again">1 · Chưa nhớ</button>
      <button class="btn green" id="good">2 · Đã nhớ</button></div>`);
    $("#again").onclick = () => rate(false);
    $("#good").onclick = () => rate(true);
  };
  const rate = ok => { if (waiting) return; waiting = true; record(it, ok); setTimeout(next, 150); };
  $("#flash").onclick = flip;
  keyHandler = e => {
    if (e.key === " " && !flipped) { e.preventDefault(); flip(); }
    else if (flipped && e.key === "1") rate(false);
    else if (flipped && e.key === "2") rate(true);
  };
}

// ================= stats & progress =================
function renderStats() {
  $("#sCorrect").textContent = session.c;
  $("#sAcc").textContent = session.t ? Math.round(session.c / session.t * 100) + "%" : "–";
  $("#sStreak").textContent = session.streak;
  $("#sBest").textContent = store.best;
}
function renderProgress() {
  const rows = [];
  for (const deck of ["kanji", "vocab"]) for (const lv of [4, 3]) {
    const list = ITEMS.filter(i => i.type === deck && i.lv === lv);
    const l = list.filter(i => learned(rec(i))).length;
    const s = list.filter(i => { const r = rec(i); return r.c + r.w > 0 && !learned(r); }).length;
    rows.push(`<div class="bar"><div class="t"><b>${deck === "kanji" ? "Kanji 漢字" : "Từ vựng 語彙"} · N${lv}</b><span>đã thuộc ${l} / ${list.length}</span></div>
      <div class="track"><i class="l" style="width:${l / list.length * 100}%"></i><i class="s" style="width:${s / list.length * 100}%"></i></div></div>`);
  }
  $("#bars").innerHTML = rows.join("");
  const weak = ITEMS.filter(i => rec(i).w > 0).sort((a, b) => (rec(b).w - rec(b).c / 2) - (rec(a).w - rec(a).c / 2)).slice(0, 18);
  $("#weak").innerHTML = weak.length ? weak.map(i =>
    `<div><span class="x">✗${rec(i).w} ✓${rec(i).c}</span><span class="w">${i.q}</span>${i.type === "vocab" ? `<span class="jp">${i.reading}</span>` : `<b>${i.hv}</b>`}<br><span class="tip">${esc(i.meaning)}</span></div>`).join("")
    : '<span class="tip">Chưa sai câu nào — luyện tập thôi!</span>';
}

// ================= wiring =================
function syncButtons() {
  for (const g of ["deck", "level", "mode"])
    document.querySelectorAll(`#${g} button`).forEach(b => b.classList.toggle("on", b.dataset.v === state[g]));
  const fill = $('#mode [data-v="fill"]');
  fill.disabled = state.deck !== "vocab";
  fill.title = fill.disabled ? "Điền chỗ trống chỉ dùng cho từ vựng" : "";
  if (fill.disabled && state.mode === "fill") { state.mode = "mixed"; syncButtons(); }
}
for (const g of ["deck", "level", "mode"])
  $("#" + g).addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.disabled) return;
    state[g] = b.dataset.v; saveSettings(); syncButtons(); if (g !== "mode") recent = []; next();
  });

$("#nextBtn").onclick = () => { if (waiting) next(); };
document.addEventListener("keydown", e => {
  if (!$("#practice").classList.contains("on")) return;
  if (waiting && (e.key === "Enter" || e.key === " ") && Date.now() > nextReadyAt) { e.preventDefault(); next(); return; }
  if (keyHandler && e.target.tagName !== "INPUT") keyHandler(e);
});
document.querySelectorAll("nav button").forEach(b => b.onclick = () => {
  document.querySelectorAll("nav button, .panel").forEach(x => x.classList.remove("on"));
  b.classList.add("on"); $("#" + b.dataset.tab).classList.add("on");
  if (b.dataset.tab === "progress") renderProgress();
});
$("#reset").onclick = () => {
  if (!confirm("Xóa toàn bộ tiến độ đã lưu?")) return;
  store.items = {}; store.best = 0; session = { c: 0, t: 0, streak: 0 };
  save(); renderStats(); renderProgress();
};
if ("speechSynthesis" in window) speechSynthesis.getVoices();

syncButtons(); renderStats(); next();

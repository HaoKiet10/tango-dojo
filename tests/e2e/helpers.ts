import { expect, type Page } from "@playwright/test";

export interface TestSettings { deck: "kanji" | "vocab"; level: "4" | "3" | "both"; mode: string; sound: boolean }

/** Open the practice page with the given settings already saved. Collects console and page errors. */
export async function gotoPractice(page: Page, settings: Partial<TestSettings>): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));
  const s = { deck: "vocab", level: "4", mode: "mixed", sound: false, ...settings };
  await page.addInitScript(v => localStorage.setItem("tango-dojo:settings", v), JSON.stringify(s));
  await page.goto("./#/practice");
  await expect(page.getByTestId("question")).toBeVisible();
  return errors;
}

/** Answer whatever practice type is showing, using the test ids. Returns the mode that was answered. */
export async function answerAny(page: Page): Promise<"cards" | "other"> {
  if (await page.getByTestId("flip-card").count()) {
    await page.getByTestId("flip-card").click();
    await page.getByTestId("rate-good").click();
    return "cards";
  }
  if (await page.getByTestId("choice-option").count()) {
    await page.getByTestId("choice-option").first().click();
  } else if (await page.getByTestId("type-input").count()) {
    await page.getByTestId("type-input").fill("a");
    await page.getByTestId("check-button").click();
  } else if (await page.getByTestId("tile").count()) {
    const slots = await page.getByTestId("slot").count();
    for (let i = 0; i < slots; i++) await page.locator('[data-testid="tile"]:not(.invisible)').first().click();
  } else if (await page.getByTestId("match-left").count()) {
    const lefts = page.getByTestId("match-left");
    for (let i = 0; i < (await lefts.count()); i++) {
      const left = lefts.nth(i);
      const id = await left.getAttribute("data-item");
      await left.click();
      await page.locator(`[data-testid="match-right"][data-item="${id}"]`).click();
    }
  } else {
    throw new Error("No known practice type on screen");
  }
  await expect(page.getByTestId("next-button")).toBeVisible();
  return "other";
}

export async function expectNoHorizontalOverflow(page: Page) {
  const [scroll, width] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  expect(scroll, "page scrolls sideways").toBeLessThanOrEqual(width);
}

export async function expectTapTargets(page: Page, selector: string, min = 44) {
  const heights = await page.locator(selector).evaluateAll(els =>
    els.filter(e => (e as HTMLElement).offsetParent !== null && !e.classList.contains("invisible"))
      .map(e => [e.getAttribute("data-testid"), Math.round(e.getBoundingClientRect().height)] as const));
  for (const [id, h] of heights) expect(h, `${id} tap target height`).toBeGreaterThanOrEqual(min);
}

/** The element is inside the viewport and nothing covers its centre. */
export async function expectReachable(page: Page, testId: string) {
  const ok = await page.getByTestId(testId).evaluate(el => {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const inView = r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth;
    const hit = document.elementFromPoint(x, y);
    return inView && !!hit && (hit === el || el.contains(hit));
  });
  expect(ok, `${testId} visible and not covered`).toBe(true);
}

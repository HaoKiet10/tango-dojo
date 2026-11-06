import { expect, test } from "@playwright/test";
import { answerAny, expectNoHorizontalOverflow, expectReachable, expectTapTargets, gotoPractice } from "./helpers";

const MODES = {
  kanji: ["mixed", "choice", "match", "type", "spell", "cards"],
  vocab: ["mixed", "choice", "match", "type", "spell", "fill", "cards"],
} as const;
const TARGETS = '[data-testid="choice-option"],[data-testid="tile"],[data-testid="match-left"],[data-testid="match-right"],[data-testid="check-button"],[data-testid="next-button"],[data-testid="rate-good"],[data-testid="rate-again"]';

for (const deck of ["kanji", "vocab"] as const) {
  for (const mode of MODES[deck]) {
    test(`${deck} · ${mode}: fits the screen, answers, waits for Next`, async ({ page }, info) => {
      const errors = await gotoPractice(page, { deck, mode, level: "both" });
      const isPhone = info.project.name.startsWith("phone");

      await expectNoHorizontalOverflow(page);
      if (isPhone) {
        const top = await page.getByTestId("question").evaluate(e => e.getBoundingClientRect().top);
        expect(top, "question starts in the top half").toBeLessThan(page.viewportSize()!.height / 2);
      }
      await expectTapTargets(page, TARGETS);

      const kind = await answerAny(page);
      await expectNoHorizontalOverflow(page);
      if (kind === "cards") {
        await expect(page.getByTestId("flip-card")).toBeVisible();   // rated card moves straight on
      } else {
        await page.waitForTimeout(400);                               // let the panel scroll into view
        await expectReachable(page, "next-button");
        await expectTapTargets(page, TARGETS);
        await page.waitForTimeout(1200);
        await expect(page.getByTestId("next-button"), "no auto-advance").toBeVisible();
        await page.getByTestId("next-button").click();
        await expect(page.getByTestId("next-button")).toHaveCount(0);
      }
      expect(errors).toEqual([]);
    });
  }
}

test("match drag works with the mouse", async ({ page }, info) => {
  test.skip(info.project.name.startsWith("phone"), "mouse drag is a desktop interaction");
  await gotoPractice(page, { deck: "kanji", mode: "match", level: "4" });
  const left = page.getByTestId("match-left").first();
  const id = await left.getAttribute("data-item");
  const right = page.locator(`[data-testid="match-right"][data-item="${id}"]`);
  const a = (await left.boundingBox())!, b = (await right.boundingBox())!;
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(a.x + a.width / 2 + 20, a.y + a.height / 2, { steps: 4 });
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 });
  await page.mouse.up();
  await expect(left).toHaveAttribute("data-state", "done");
  await expect(right).toHaveAttribute("data-state", "done");
});

test("settings sheet opens on phones, inline controls on larger screens", async ({ page }, info) => {
  await gotoPractice(page, {});
  if (info.project.name.startsWith("phone")) {
    await page.getByTestId("settings-summary").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").getByRole("button", { name: "N3" }).click();
    await expect(page.getByTestId("settings-summary")).toContainText("N3");
    await page.getByRole("button", { name: "Xong" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  } else {
    await expect(page.getByTestId("settings-summary")).toBeHidden();
    await expect(page.getByRole("group", { name: "Dạng bài" }).first()).toBeVisible();
  }
  await expectNoHorizontalOverflow(page);
});

for (const route of ["progress", "kana"]) {
  test(`${route} page fits the screen`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`./#/${route}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    if (route === "kana") {
      await page.getByRole("button", { name: "Bảng chữ 五十音表" }).click();
      await expect(page.getByTestId("kana-cell")).toHaveCount(104);
      await expectNoHorizontalOverflow(page);
    }
    expect(errors).toEqual([]);
  });
}

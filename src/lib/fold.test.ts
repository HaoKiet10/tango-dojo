import { fold } from "./fold";

test("fold drops case, Vietnamese accents, đ and the 〜 mark", () => {
  expect(fold("Vừa … vừa …")).toContain("vua");
  expect(fold("Để")).toBe("de");
  expect(fold("Đã")).toBe("da");
  expect(fold("〜ながら")).toBe("ながら");
});

test("fold keeps kana intact", () => {
  expect(fold("ばかり")).toBe("ばかり");
  expect(fold("ガ")).toBe("ガ");
});

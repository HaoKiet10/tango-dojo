/** Text for loose search: lowercase, no Vietnamese accents (đ → d), no 〜. Kana stays as written. */
export const fold = (s: string): string =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/〜/g, "").normalize("NFC");

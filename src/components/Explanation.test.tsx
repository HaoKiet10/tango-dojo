import { render, screen } from "@testing-library/react";
import { ITEMS } from "../data/items";
import { Explanation } from "./Explanation";

const kanji = (c: string) => ITEMS.find(i => i.id === "k:" + c)!;
const vocab = (w: string) => ITEMS.find(i => i.id === "v:" + w)!;

test("kanji-first explanation leads with the kanji, then Ví dụ and the other kanji of the word", () => {
  render(<Explanation item={kanji("去")} kanjiFirst />);   // example 去年
  expect(screen.getByTestId("explain-head")).toHaveTextContent("去KHỨrời đi; quá khứ");
  expect(screen.getByText("Ví dụ")).toBeInTheDocument();
  expect(screen.getByText("去年")).toBeInTheDocument();
  const rows = screen.getAllByTestId("breakdown-row");
  expect(rows).toHaveLength(1);
  expect(rows[0]).toHaveTextContent("年NIÊNnăm");
});

test("word explanation lists every kanji and tags the studied one", () => {
  render(<Explanation item={kanji("館")} kanjiFirst={false} />);   // example 旅館
  expect(screen.getByTestId("explain-head")).toHaveTextContent("旅館りょかんnhà trọ kiểu Nhật");
  const rows = screen.getAllByTestId("breakdown-row");
  expect(rows).toHaveLength(2);
  expect(rows[0]).toHaveTextContent("旅LỮ");
  expect(rows[1]).toHaveTextContent("館QUÁN");
  expect(rows[1]).toHaveTextContent("chữ đang học");
  expect(rows[0]).not.toHaveTextContent("chữ đang học");
});

test("vocab explanation shows readings of extra kanji and no tag", () => {
  render(<Explanation item={vocab("経験")} kanjiFirst={false} />);
  const rows = screen.getAllByTestId("breakdown-row");
  expect(rows.map(r => r.textContent)).toEqual([
    expect.stringContaining("KINH"), expect.stringContaining("NGHIỆM"),
  ]);
  expect(screen.queryByText("chữ đang học")).not.toBeInTheDocument();
  expect(rows[1]).toHaveTextContent("On ケン · Kun —");
});

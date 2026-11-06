/** The product mark: a vermilion hanko-style seal with 道. */
export function SealMark({ size = 28 }: { size?: number }) {
  return (
    <span aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-seal font-jp font-semibold leading-none text-white"
      style={{ width: size, height: size, fontSize: size * 0.6 }}>
      道
    </span>
  );
}

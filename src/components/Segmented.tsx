/** A row of toggle buttons; the selected one is a neutral grey pill. */
export function Segmented<T extends string>({ label, value, options, onChange, disabled, grid }: {
  label: string; value: T; options: { value: T; text: string }[]; onChange: (v: T) => void;
  disabled?: (v: T) => string | undefined;
  /** Lay the options out as an even grid (4 per row from 640px) so long labels never clip. */
  grid?: boolean;
}) {
  return (
    <div role="group" aria-label={label}
      className={`flex gap-1 rounded-card border border-line bg-surface p-1 ${grid ? "flex-wrap sm:grid sm:grid-cols-4" : "flex-wrap"}`}>
      {options.map(o => {
        const reason = disabled?.(o.value);
        return (
          <button key={o.value} type="button" aria-pressed={value === o.value} disabled={!!reason} title={reason}
            onClick={() => onChange(o.value)}
            className={`min-h-9 rounded-control px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:text-faint ${
              value === o.value ? "bg-active font-semibold text-ink" : "text-muted hover:text-ink"}`}>
            {o.text}
          </button>
        );
      })}
    </div>
  );
}

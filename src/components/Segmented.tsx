/** A row of toggle buttons; the selected one is a neutral grey pill. */
export function Segmented<T extends string>({ label, value, options, onChange, disabled }: {
  label: string; value: T; options: { value: T; text: string }[]; onChange: (v: T) => void;
  disabled?: (v: T) => string | undefined;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1 rounded-card border border-line bg-surface p-1">
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

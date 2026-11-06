import { useEffect } from "react";

/** Bottom sheet for the phone's settings. Closes on backdrop tap, Escape, or "Xong". */
export function SettingsSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 sm:hidden">
      <button type="button" aria-label="Đóng" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div role="dialog" aria-modal="true" aria-label="Cài đặt"
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[16px] bg-surface p-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Cài đặt 設定</h2>
          <button type="button" onClick={onClose} className="min-h-11 rounded-control bg-primary px-4 text-sm font-semibold text-on-primary">Xong</button>
        </div>
        {children}
      </div>
    </div>
  );
}

import { useEffect } from "react";

/**
 * Full conversion chart (Nigeria/UK · US · Europe EU).
 * Matches common Nigerian retail sizing.
 */
const FULL_CHART = [
  { ngUk: "6", us: "2", eu: "34" },
  { ngUk: "8", us: "4", eu: "36" },
  { ngUk: "10", us: "6", eu: "38" },
  { ngUk: "12", us: "8", eu: "40" },
  { ngUk: "14", us: "10", eu: "42" },
  { ngUk: "16", us: "12", eu: "44" },
  { ngUk: "18", us: "14", eu: "46" },
  { ngUk: "20", us: "16", eu: "48" },
  { ngUk: "22", us: "18", eu: "50" },
];

/** How Shop with Dee order sizes map. */
const SHOP_SIZES = [
  { size: "12", ngUk: "12", us: "8", eu: "40" },
  { size: "13", ngUk: "13 – 14", us: "9 – 10", eu: "41 – 42" },
  { size: "14", ngUk: "14", us: "10", eu: "42" },
];

export default function SizeGuide({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative bg-cream w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
      >
        <div className="sticky top-0 bg-cream z-10 flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <h2 id="size-guide-title" className="font-display text-xl text-ink">
            Size guide
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center"
          >
            &#10005;
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Shop sizes */}
          <div>
            <p className="text-sm font-medium text-ink/70 mb-3">
              Our sizes (what you select when ordering)
            </p>
            <div className="overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-espresso-dark text-cream">
                    <th className="px-3 py-2.5 font-medium">Size</th>
                    <th className="px-3 py-2.5 font-medium">Nigeria / UK</th>
                    <th className="px-3 py-2.5 font-medium">US</th>
                    <th className="px-3 py-2.5 font-medium">Europe (EU)</th>
                  </tr>
                </thead>
                <tbody>
                  {SHOP_SIZES.map((row, i) => (
                    <tr
                      key={row.size}
                      className={i % 2 === 0 ? "bg-white" : "bg-cream"}
                    >
                      <td className="px-3 py-2.5 font-semibold text-ink">
                        {row.size}
                      </td>
                      <td className="px-3 py-2.5 text-ink/80">{row.ngUk}</td>
                      <td className="px-3 py-2.5 text-ink/80">{row.us}</td>
                      <td className="px-3 py-2.5 text-ink/80 font-medium">
                        {row.eu}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Full conversion chart */}
          <div>
            <p className="text-sm font-medium text-ink/70 mb-3">
              Full size conversion
            </p>
            <div className="overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-espresso-dark text-cream">
                    <th className="px-3 py-2.5 font-medium">Nigeria / UK</th>
                    <th className="px-3 py-2.5 font-medium">US</th>
                    <th className="px-3 py-2.5 font-medium">Europe (EU)</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_CHART.map((row, i) => (
                    <tr
                      key={row.ngUk}
                      className={
                        // Highlight the sizes we actually sell
                        ["12", "14"].includes(row.ngUk)
                          ? "bg-gold/15"
                          : i % 2 === 0
                            ? "bg-white"
                            : "bg-cream"
                      }
                    >
                      <td className="px-3 py-2.5 font-semibold text-ink">
                        {row.ngUk}
                      </td>
                      <td className="px-3 py-2.5 text-ink/80">{row.us}</td>
                      <td className="px-3 py-2.5 text-ink/80 font-medium">
                        {row.eu}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-ink/40 mt-2">
              Highlighted rows match sizes available on this site (12 & 14).
            </p>
          </div>

          <p className="text-xs text-ink/45 leading-relaxed">
            If you usually wear European size 40, that is our size 12. Size 42 is
            our size 14. Unsure? Message us on WhatsApp with the size you
            normally wear — we&rsquo;ll help you choose.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-espresso text-cream py-3 font-medium hover:bg-espresso-dark transition-colors"
          >
            Got it — choose my size
          </button>
        </div>
      </div>
    </div>
  );
}

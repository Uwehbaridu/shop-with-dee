import { useEffect } from "react";

/** International size chart — letter size + UK + US (simplified from standard conversion). */
const CHART = [
  { size: "XS", uk: "6 – 8", us: "2 – 4" },
  { size: "S", uk: "10 – 12", us: "6 – 8" },
  { size: "M", uk: "14 – 16", us: "10 – 12" },
  { size: "L", uk: "18 – 20", us: "14 – 16" },
  { size: "XL", uk: "22", us: "18" },
];

/** How Shop with Dee sizes map to UK / US. */
const SHOP_SIZES = [
  { size: "12", uk: "12", us: "8", approx: "S – M" },
  { size: "13", uk: "13 – 14", us: "9 – 10", approx: "M" },
  { size: "14", uk: "14", us: "10", approx: "M – L" },
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
          {/* Shop sizes (what customers pick on the site) */}
          <div>
            <p className="text-sm font-medium text-ink/70 mb-3">
              Our sizes (what you select when ordering)
            </p>
            <div className="overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-espresso-dark text-cream">
                    <th className="px-3 py-2.5 font-medium">Size</th>
                    <th className="px-3 py-2.5 font-medium">UK</th>
                    <th className="px-3 py-2.5 font-medium">US</th>
                    <th className="px-3 py-2.5 font-medium">Approx.</th>
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
                      <td className="px-3 py-2.5 text-ink/80">{row.uk}</td>
                      <td className="px-3 py-2.5 text-ink/80">{row.us}</td>
                      <td className="px-3 py-2.5 text-ink/60">{row.approx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* International letter chart */}
          <div>
            <p className="text-sm font-medium text-ink/70 mb-3">
              International letter sizes
            </p>
            <div className="overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-espresso-dark text-cream">
                    <th className="px-3 py-2.5 font-medium">Size</th>
                    <th className="px-3 py-2.5 font-medium">UK</th>
                    <th className="px-3 py-2.5 font-medium">US</th>
                  </tr>
                </thead>
                <tbody>
                  {CHART.map((row, i) => (
                    <tr
                      key={row.size}
                      className={i % 2 === 0 ? "bg-white" : "bg-cream"}
                    >
                      <td className="px-3 py-2.5 font-semibold text-ink">
                        {row.size}
                      </td>
                      <td className="px-3 py-2.5 text-ink/80">{row.uk}</td>
                      <td className="px-3 py-2.5 text-ink/80">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-ink/45 leading-relaxed">
            Sizes can vary slightly by style. If you&rsquo;re between sizes or
            unsure, message us on WhatsApp with your usual size — we&rsquo;ll
            help you pick the best fit.
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

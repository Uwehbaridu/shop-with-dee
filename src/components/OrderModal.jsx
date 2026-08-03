import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "../config";

const SIZES = ["12", "13", "14"];

export default function OrderModal({ product, onClose }) {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [size, setSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const [lightbox, setLightbox] = useState(null); // design object when viewing full image

  // Reset when a new product is opened; Escape closes lightbox first, then the view
  useEffect(() => {
    if (!product) return;

    const designs = product.designs ?? [];
    setSelectedDesign(designs[0] ?? null);
    setSize(SIZES[0]);
    setQuantity(1);
    setLightbox(null);

    function onKeyDown(e) {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  // Keep Escape handler in sync with lightbox state
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, onClose]);

  if (!product) return null;

  const { name, price, designs = [] } = product;
  const total = price * quantity;
  const canOrder = Boolean(selectedDesign);

  return (
    <>
      {/* Full product view */}
      <div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="relative bg-cream w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[94vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center z-20"
          >
            &#10005;
          </button>

          {/* Hero / selected design preview */}
          <button
            type="button"
            onClick={() => selectedDesign && setLightbox(selectedDesign)}
            className="relative w-full h-56 sm:h-72 flex items-center justify-center overflow-hidden cursor-zoom-in group"
            style={{ backgroundColor: selectedDesign?.swatch ?? "#E8E0D5" }}
            aria-label="View full size"
          >
            {selectedDesign?.image ? (
              <img
                src={selectedDesign.image}
                alt={selectedDesign.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : null}
            {selectedDesign?.swatchBorder && (
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" aria-hidden="true" />
            )}
            <span className="absolute bottom-3 right-3 bg-white/90 text-ink text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to enlarge
            </span>
          </button>

          <div className="p-5 sm:p-7">
            <h3
              id="order-modal-title"
              className="font-display text-xl sm:text-2xl text-ink leading-snug pr-10"
            >
              {name}
            </h3>
            {selectedDesign?.name && (
              <p className="text-ink/50 text-sm mt-1">{selectedDesign.name}</p>
            )}
            <p className="text-gold font-semibold text-lg mt-1">
              &#8358;{price.toLocaleString()}
            </p>

            {/* Designs – all on one row / grid */}
            <div className="mt-6">
              <p className="text-sm font-medium text-ink/70 mb-3">Choose a design</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {designs.map((d) => {
                  const isSelected = selectedDesign?.id === d.id;
                  return (
                    <div key={d.id} className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedDesign(d)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                          isSelected
                            ? "border-gold ring-2 ring-gold/30"
                            : "border-ink/10 hover:border-ink/25"
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Select ${d.name}`}
                      >
                        <div
                          className="aspect-square flex items-center justify-center"
                          style={{ backgroundColor: d.swatch }}
                        >
                          {d.image ? (
                            <img
                              src={d.image}
                              alt={d.name}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                          {d.swatchBorder && (
                            <div
                              className="absolute inset-0 ring-1 ring-inset ring-ink/10"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </button>
                      <div className="flex items-center justify-between gap-1 px-0.5">
                        <span
                          className={`text-xs truncate ${
                            isSelected ? "text-espresso-dark font-medium" : "text-ink/60"
                          }`}
                        >
                          {d.name}
                        </span>
                        {(d.image || d.swatch) && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightbox(d);
                            }}
                            className="text-[10px] text-ink/40 hover:text-gold shrink-0"
                            aria-label={`View ${d.name} full size`}
                          >
                            View
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="text-sm font-medium text-ink/70 mb-2">Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                      size === s
                        ? "bg-espresso-dark text-cream border-espresso-dark"
                        : "border-ink/15 text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-medium text-ink/70 mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 rounded-full border border-ink/15 text-ink text-lg flex items-center justify-center hover:border-ink/30"
                >
                  &#8722;
                </button>
                <span className="w-6 text-center font-medium text-ink">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-10 rounded-full border border-ink/15 text-ink text-lg flex items-center justify-center hover:border-ink/30"
                >
                  &#43;
                </button>
              </div>
            </div>

            {/* Total + Order */}
            <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="text-ink/60 text-sm">Total</span>
              <span className="font-display text-xl text-ink">
                &#8358;{total.toLocaleString()}
              </span>
            </div>

            <a
              href={
                canOrder
                  ? buildWhatsAppLink(product, {
                      design: selectedDesign?.name,
                      size,
                      quantity,
                    })
                  : undefined
              }
              target="_blank"
              rel="noreferrer"
              onClick={canOrder ? onClose : undefined}
              aria-disabled={!canOrder}
              className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-medium transition-colors ${
                canOrder
                  ? "bg-gold text-espresso-dark hover:bg-gold-light"
                  : "bg-ink/15 text-ink/40 pointer-events-none"
              }`}
            >
              Order Now on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Full-image lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close full image"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center z-10"
          >
            &#10005;
          </button>

          <div
            className="relative max-w-lg w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.image ? (
              <img
                src={lightbox.image}
                alt={lightbox.name}
                className="w-full h-auto max-h-[85vh] object-contain bg-ink"
              />
            ) : (
              <div
                className="w-full aspect-[3/4] flex items-center justify-center"
                style={{ backgroundColor: lightbox.swatch }}
              >
                <p className="text-white/80 font-display text-lg drop-shadow">
                  {lightbox.name}
                </p>
              </div>
            )}
            <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent text-cream text-center py-4 text-sm">
              {lightbox.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

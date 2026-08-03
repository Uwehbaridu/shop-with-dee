import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "../config";

const SIZES = ["12", "13", "14"];

export default function OrderModal({ product, onClose }) {
  const [step, setStep] = useState("design"); // "design" | "details"
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [size, setSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);

  // Reset the form whenever a new product is opened, and let Escape close it.
  useEffect(() => {
    if (!product) return;

    const designs = product.designs;
    if (designs && designs.length > 1) {
      setStep("design");
      setSelectedDesign(null);
    } else {
      setStep("details");
      setSelectedDesign(designs?.[0] ?? null);
    }
    setSize(SIZES[0]);
    setQuantity(1);

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const { name, price, designs = [] } = product;
  const total = price * quantity;

  function handlePickDesign(design) {
    setSelectedDesign(design);
    setStep("details");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm px-0 sm:px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative bg-cream w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center z-10"
        >
          &#10005;
        </button>

        {step === "design" ? (
          <div className="p-6 pt-14">
            <h3 id="order-modal-title" className="font-display text-xl text-ink leading-snug pr-8">
              {name}
            </h3>
            <p className="text-gold font-semibold mt-1">&#8358;{price.toLocaleString()}</p>
            <p className="text-sm font-medium text-ink/70 mt-6 mb-3">
              Choose a design
            </p>

            <div className="grid grid-cols-2 gap-3">
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handlePickDesign(d)}
                  className="text-left rounded-xl overflow-hidden border border-ink/10 hover:border-gold/60 transition-colors group"
                >
                  <div
                    className="h-28 flex items-center justify-center relative"
                    style={{ backgroundColor: d.swatch }}
                  >
                    {d.image && (
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    )}
                    {d.swatchBorder && (
                      <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" aria-hidden="true" />
                    )}
                  </div>
                  <p className="text-sm text-ink px-3 py-2 group-hover:text-espresso-dark">
                    {d.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div
              className="h-40 flex items-center justify-center"
              style={{ backgroundColor: selectedDesign?.swatch }}
            >
              {selectedDesign?.image && (
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-6">
              {designs.length > 1 && (
                <button
                  type="button"
                  onClick={() => setStep("design")}
                  className="text-sm text-ink/50 hover:text-ink mb-3 inline-flex items-center gap-1"
                >
                  &#8592; Change design
                </button>
              )}

              <h3 id="order-modal-title" className="font-display text-xl text-ink leading-snug pr-8">
                {name}
              </h3>
              {selectedDesign?.name && (
                <p className="text-ink/50 text-sm mt-0.5">{selectedDesign.name}</p>
              )}
              <p className="text-gold font-semibold mt-1">&#8358;{price.toLocaleString()}</p>

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

              <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-ink/60 text-sm">Total</span>
                <span className="font-display text-lg text-ink">&#8358;{total.toLocaleString()}</span>
              </div>

              <a
                href={buildWhatsAppLink(product, {
                  design: selectedDesign?.name,
                  size,
                  quantity,
                })}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-espresso-dark py-3.5 font-medium hover:bg-gold-light transition-colors"
              >
                Order Now on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
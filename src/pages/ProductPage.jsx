import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { buildWhatsAppLink } from "../config";
import { useCart } from "../cart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SizeGuide from "../components/SizeGuide";
import ProductReviews, { getProductRating } from "../components/ProductReviews";
import { StarRating } from "../components/StarRating";

const SIZES = ["12", "13", "14"];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedDesign, setSelectedDesign] = useState(null);
  const [size, setSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const [lightbox, setLightbox] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const designs = product.designs ?? [];
    setSelectedDesign(designs[0] ?? null);
    setSize(SIZES[0]);
    setQuantity(1);
    setLightbox(null);
    setJustAdded(false);
    setSizeGuideOpen(false);
  }, [product]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && lightbox) setLightbox(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-lg mx-auto px-5 py-32 text-center">
          <h1 className="font-display text-2xl text-ink">Product not found</h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-gold hover:text-espresso-dark font-medium"
          >
            ← Back to collection
          </Link>
        </div>
        <Footer />
        <CartDrawer />
      </div>
    );
  }

  const { name, price, designs = [], reviews = [] } = product;
  const total = price * quantity;
  const canAdd = Boolean(selectedDesign);
  const { rating, count } = getProductRating(product);

  function handleAddToCart() {
    if (!canAdd) return;
    addItem({ product, design: selectedDesign, size, quantity });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <button
            type="button"
            onClick={goBack}
            className="mt-4 mb-6 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors"
          >
            <span aria-hidden="true">←</span>
            Back to collection
          </button>

          <button
            type="button"
            onClick={() => selectedDesign && setLightbox(selectedDesign)}
            className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-ink/5 cursor-zoom-in group"
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
            <span className="absolute bottom-3 right-3 bg-white/90 text-ink text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to enlarge
            </span>
          </button>

          <div className="mt-6 sm:mt-8">
            <h1 className="font-display text-2xl sm:text-3xl text-ink leading-snug">
              {name}
            </h1>
            {selectedDesign?.name && (
              <p className="text-ink/50 text-sm mt-1">{selectedDesign.name}</p>
            )}
            {count > 0 && (
              <div className="mt-2">
                <StarRating rating={rating} count={count} size="md" />
              </div>
            )}
            <p className="text-gold font-semibold text-xl mt-2">
              &#8358;{price.toLocaleString()}
            </p>

            {/* Designs */}
            <div className="mt-8">
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
                        </div>
                      </button>
                      <div className="flex items-center justify-between gap-1 px-0.5">
                        <span
                          className={`text-xs truncate ${
                            isSelected
                              ? "text-espresso-dark font-medium"
                              : "text-ink/60"
                          }`}
                        >
                          {d.name}
                        </span>
                        {d.image && (
                          <button
                            type="button"
                            onClick={() => setLightbox(d)}
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
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-ink/70">Size</p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-sm text-gold hover:text-espresso-dark font-medium underline underline-offset-2"
                >
                  Check size measurements
                </button>
              </div>
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

            <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="text-ink/60 text-sm">Total</span>
              <span className="font-display text-xl text-ink">
                &#8358;{total.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-medium transition-colors ${
                canAdd
                  ? "bg-espresso text-cream hover:bg-espresso-dark"
                  : "bg-ink/15 text-ink/40 pointer-events-none"
              }`}
            >
              {justAdded ? "Added to cart ✓" : "Add to cart"}
            </button>

            <a
              href={
                canAdd
                  ? buildWhatsAppLink(product, {
                      design: selectedDesign?.name,
                      size,
                      quantity,
                    })
                  : undefined
              }
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canAdd}
              className={`mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 font-medium transition-colors border ${
                canAdd
                  ? "border-gold/70 text-espresso-dark hover:bg-gold/10"
                  : "border-ink/10 text-ink/30 pointer-events-none"
              }`}
            >
              Order this one on WhatsApp
            </a>

            {/* Reviews */}
            <ProductReviews productId={product.id} initialReviews={reviews} />
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

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
    </div>
  );
}

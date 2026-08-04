import { useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { StarRating } from "./StarRating";
import { getProductRating } from "./ProductReviews";

// Feature bestsellers / new-in first, then fill from the rest
const FEATURED_IDS = [
  "prestige-collection",
  "the-emerald-dress",
  "the-victoria-dress",
  "the-monarch-dress",
  "asymmetric-striped-lapel-midi",
  "the-vogue-dress",
];

export default function FeaturedProducts() {
  const trackRef = useRef(null);

  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(
    Boolean
  );

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-cream pt-16 sm:pt-20 pb-4">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="uppercase text-gold text-xs tracking-widest2 mb-2">
              Featured
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-ink">
              Pieces in the spotlight
            </h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll featured left"
              className="w-10 h-10 rounded-full border border-ink/15 text-ink flex items-center justify-center hover:border-ink/30 hover:bg-white transition-colors"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll featured right"
              className="w-10 h-10 rounded-full border border-ink/15 text-ink flex items-center justify-center hover:border-ink/30 hover:bg-white transition-colors"
            >
              &#8250;
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {featured.map((product) => {
            const cover = product.designs?.[0];
            const { rating, count } = getProductRating(product);
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] bg-white rounded-2xl overflow-hidden border border-ink/5 shadow-[0_1px_2px_rgba(28,20,16,0.06)] hover:shadow-md transition-shadow"
              >
                <div
                  className="h-48 sm:h-56 overflow-hidden"
                  style={{ backgroundColor: cover?.swatch }}
                >
                  {cover?.image ? (
                    <img
                      src={cover.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base text-ink leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  {count > 0 && (
                    <div className="mt-1.5">
                      <StarRating rating={rating} count={count} size="sm" />
                    </div>
                  )}
                  <p className="text-gold font-semibold text-sm mt-2">
                    &#8358;{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

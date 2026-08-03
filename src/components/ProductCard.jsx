import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import { getProductRating } from "./ProductReviews";

export default function ProductCard({ product }) {
  const { id, name, price, tag, designs } = product;
  const cover = designs?.[0];
  const to = `/product/${id}`;
  const { rating, count } = getProductRating(product);

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(28,20,16,0.06)] border border-ink/5 flex flex-col">
      <Link
        to={to}
        className="relative h-56 sm:h-64 flex items-center justify-center overflow-hidden w-full text-left cursor-pointer"
        style={{ backgroundColor: cover?.swatch }}
        aria-label={`View ${name}`}
      >
        {cover?.image ? (
          <img src={cover.image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full opacity-0" aria-hidden="true" />
        )}

        <div
          className="preorder-badge absolute top-3 right-3 z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="preorder-badge-inner">
            <span className="preorder-text">PRE</span>
            <span className="preorder-text">ORDER</span>
          </div>
        </div>

        {tag && (
          <span className="absolute top-3 left-3 bg-espresso-dark/85 text-gold-light text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full z-10">
            {tag}
          </span>
        )}
        {designs?.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-white/90 text-ink text-[11px] font-medium px-2.5 py-1 rounded-full">
            {designs.length} designs
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <Link to={to} className="text-left">
          <h3 className="font-display text-lg text-ink leading-snug hover:text-espresso-dark transition-colors">
            {name}
          </h3>
        </Link>
        {count > 0 && (
          <StarRating rating={rating} count={count} size="sm" />
        )}
        <p className="text-gold font-semibold text-base mt-auto">
          &#8358;{price.toLocaleString()}
        </p>
        <Link
          to={to}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-espresso text-cream text-sm py-2.5 hover:bg-espresso-dark transition-colors"
        >
          Select Design & Order
        </Link>
      </div>
    </article>
  );
}

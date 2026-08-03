export default function ProductCard({ product, onSelect }) {
  const { name, price, tag, designs } = product;
  const cover = designs?.[0];

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(28,20,16,0.06)] border border-ink/5 flex flex-col">
      <div
        className="relative h-56 sm:h-64 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: cover?.swatch }}
      >
        {cover?.image ? (
          <img src={cover.image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full opacity-0" aria-hidden="true" />
        )}
        {cover?.swatchBorder && (
          <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" aria-hidden="true" />
        )}
        {tag && (
          <span className="absolute top-3 left-3 bg-espresso-dark/85 text-gold-light text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full">
            {tag}
          </span>
        )}
        {designs?.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-white/90 text-ink text-[11px] font-medium px-2.5 py-1 rounded-full">
            {designs.length} designs
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display text-lg text-ink leading-snug">{name}</h3>
        <p className="text-gold font-semibold text-base mt-auto">
          &#8358;{price.toLocaleString()}
        </p>
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-espresso text-cream text-sm py-2.5 hover:bg-espresso-dark transition-colors"
        >
          Select Design &amp; Order
        </button>
      </div>
    </article>
  );
}
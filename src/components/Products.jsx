import { useEffect, useState } from "react";
import { products as fallbackProducts } from "../data/products";
import { fetchProducts } from "../firebase";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProducts(fallbackProducts).then((list) => {
      if (!cancelled) {
        setProducts(list);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="collection" className="bg-cream py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="uppercase text-berry text-xs tracking-widest2 mb-3">
            The Collection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            Deals with all types of female corporate wear
          </h2>
          <div className="flourish text-gold/60 my-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
          </div>
          <p className="text-ink/60">
            Every piece below is currently in stock. Tap a dress to send its
            name and price straight to our WhatsApp — we&rsquo;ll confirm size
            and availability right away.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
            loading ? "opacity-70" : "opacity-100"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="text-center text-ink/45 text-sm mt-10">
          Don&rsquo;t see your size or color? Ask us on WhatsApp — new stock
          arrives every week.
        </p>
      </div>
    </section>
  );
}

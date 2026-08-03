import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { products as fallbackProducts } from "../data/products";
import { fetchProducts } from "../firebase";

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    let cancelled = false;
    fetchProducts(fallbackProducts).then((list) => {
      if (!cancelled) setProducts(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="collection" className="bg-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="uppercase text-gold text-xs tracking-widest2 mb-3">
            The Collection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
            Boardroom-ready pieces, priced for real life.
          </h2>
          <p className="text-ink/55 mt-4 text-base sm:text-lg">
            Pick a style, choose your design and size, then message us on
            WhatsApp — we&rsquo;ll confirm availability right away.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

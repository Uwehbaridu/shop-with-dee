import { useEffect, useState, useCallback } from "react";
import { buildWhatsAppLink } from "../config";

import slide1 from "../assets/products/Golden Radiance Dress – Color_ Yellow.png";
import slide2 from "../assets/products/Classic Noir Dress – Color_ Black – Size.png";
import slide3 from "../assets/products/Golden Ember Dress – Color_ Mustard Yellow.png";
import slide4 from "../assets/products/Mocha Belle Dress – Color_ Brown, Blue.png";
import slide5 from "../assets/products/Ash Stripe Dress – Color_ Grey Stripe.png";

const SLIDES = [
  {
    image: slide1,
    eyebrow: "Women's Corporate Wear",
    title: "Golden Radiance",
    subtitle: "Luxury for less — boardroom ready.",
  },
  {
    image: slide2,
    eyebrow: "Timeless Classics",
    title: "Classic Noir",
    subtitle: "Elegant blacks for every occasion.",
  },
  {
    image: slide3,
    eyebrow: "Warm & Bold",
    title: "Golden Ember",
    subtitle: "Mustard tones that command the room.",
  },
  {
    image: slide4,
    eyebrow: "Refined Neutrals",
    title: "Mocha Belle",
    subtitle: "Brown and blue, perfectly balanced.",
  },
  {
    image: slide5,
    eyebrow: "Modern Stripe",
    title: "Ash Stripe",
    subtitle: "Grey stripe — understated power.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-espresso-dark h-[70vh] min-h-[420px] max-h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-espresso-dark/85 via-espresso-dark/55 to-espresso-dark/30"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-espresso-dark/70 via-transparent to-espresso-dark/40"
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-5 sm:px-8 flex flex-col justify-center">
        <div className="max-w-xl pt-16">
          <p className="uppercase text-gold-light/90 text-xs sm:text-sm tracking-widest2 mb-4 transition-opacity duration-500">
            {slide.eyebrow}
          </p>
          <h1 className="font-display text-cream text-4xl sm:text-5xl md:text-6xl leading-[1.08] transition-opacity duration-500">
            {slide.title}
          </h1>
          <p className="font-script text-gold-light/90 text-xl sm:text-2xl mt-4 transition-opacity duration-500">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#collection"
              className="rounded-full bg-gold text-espresso-dark px-7 py-3 font-medium hover:bg-gold-light transition-colors text-center"
            >
              Shop the collection
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/60 text-gold-light px-7 py-3 font-medium hover:bg-gold/10 transition-colors text-center"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-ink/40 hover:bg-ink/60 text-cream flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        &#8249;
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-ink/40 hover:bg-ink/60 text-cream flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        &#8250;
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : "w-2 bg-cream/50 hover:bg-cream/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

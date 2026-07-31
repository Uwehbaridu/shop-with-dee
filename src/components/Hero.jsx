import logoLit from "../assets/logo-lit.jpg";
import { buildWhatsAppLink } from "../config";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso-dark pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient backdrop, echoing the backlit medallion sign in-store */}
      <div
        className="absolute inset-0 opacity-[0.16] bg-center bg-cover blur-sm scale-110"
        style={{ backgroundImage: `url(${logoLit})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-dark via-espresso-dark/95 to-espresso-dark" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-gold/20 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <p className="uppercase text-gold-light/90 text-xs sm:text-sm tracking-widest2 mb-6">
          Women&rsquo;s Corporate Wear
        </p>

        <h1 className="font-display text-cream text-[2.6rem] leading-[1.08] sm:text-6xl md:text-7xl">
          Boardroom-ready,
          <br />
          <span className="text-gold-light">without the boardroom price.</span>
        </h1>

        <p className="font-script text-gold-light/90 text-2xl sm:text-3xl mt-7">
          Classic never goes out of fashion.
        </p>

        <div className="flourish text-gold/50 w-64 my-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
        </div>

        <p className="text-cream/70 max-w-md text-base sm:text-lg">
          Pencil dresses, wrap coats and belted sheaths built for the 9-to-5 —
          every piece between{" "}
          <span className="text-gold-light">&#8358;9,500 and &#8358;10,000</span>.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#collection"
            className="rounded-full bg-gold text-espresso-dark px-8 py-3.5 font-medium hover:bg-gold-light transition-colors"
          >
            Shop the collection
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/60 text-gold-light px-8 py-3.5 font-medium hover:bg-gold/10 transition-colors"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

import brandWall from "../assets/brand-wall.jpg";

export default function About() {
  return (
    <section id="about" className="bg-espresso-dark py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <img
            src={brandWall}
            alt="The Shop with Dee signage, showing the brand's gold medallion logo and a rail of corporate dresses"
            className="rounded-2xl w-full object-cover ring-1 ring-gold/20"
          />
        </div>

        <div>
          <p className="uppercase text-gold text-xs tracking-widest2 mb-3">
            About Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream leading-tight">
            Luxury for less, for the woman who runs her week in a blazer.
          </h2>
          <p className="text-cream/65 mt-6 leading-relaxed">
            Shop with Dee is a fashion hub built around one idea: a woman
            shouldn&rsquo;t have to choose between looking sharp for work and
            keeping to a budget. We curate pencil dresses, wrap coats and
            belted sheaths in the fabrics and cuts that hold up to a real
            work week — then price every single one between{" "}
            <span className="text-gold-light">&#8358;9,500</span> and{" "}
            <span className="text-gold-light">&#8358;10,000</span>.
          </p>
          <p className="text-cream/65 mt-4 leading-relaxed">
            No showroom markups, no guesswork on sizing — just message us on
            WhatsApp and we&rsquo;ll walk you through it like a friend who
            happens to know exactly what looks good on you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 max-w-sm">
            <div>
              <p className="font-display text-2xl text-gold-light">₦9.5k–10k</p>
              <p className="text-cream/50 text-sm mt-1">Every piece, every time</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold-light">100%</p>
              <p className="text-cream/50 text-sm mt-1">Women&rsquo;s corporate wear</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

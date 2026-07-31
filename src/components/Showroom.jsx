import showroom from "../assets/showroom.jpg";
import { siteConfig } from "../config";

export default function Showroom() {
  return (
    <section className="relative bg-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <p className="uppercase text-berry text-xs tracking-widest2 mb-3">
              Inside The Rail
            </p>
            <h2 className="font-display text-3xl text-ink leading-tight">
              What you see on the rack is what ships.
            </h2>
            <p className="text-ink/60 mt-5 leading-relaxed">
              Every dress is styled and photographed straight from our rail
              in {siteConfig.location.split(",")[0]} — no stock photos, no
              surprises when your order arrives.
            </p>
          </div>
          <div className="md:col-span-3 order-1 md:order-2">
            <img
              src={showroom}
              alt="A rail of Shop with Dee corporate dresses in pink, olive, navy and green, hanging beneath the brand's gold medallion logo"
              className="rounded-2xl w-full object-cover shadow-[0_18px_40px_-18px_rgba(28,20,16,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

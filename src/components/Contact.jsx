import { useState } from "react";
import { siteConfig, buildWhatsAppLink } from "../config";

const initialForm = { name: "", phone: "", message: "" };

/** Builds a WhatsApp link with the contact form details pre-filled. */
function buildContactWhatsAppLink({ name, phone, message }) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  const text = [
    "Hi Shop with Dee!",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    "",
    message,
  ].join("\n");
  return `${base}?text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);

  function handleSubmit(e) {
    e.preventDefault();
    const url = buildContactWhatsAppLink(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setForm(initialForm);
  }

  return (
    <section id="contact" className="bg-espresso-dark py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-14">
        <div>
          <p className="uppercase text-gold text-xs tracking-widest2 mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-cream leading-tight">
            Fastest way to order? WhatsApp.
          </h2>
          <p className="text-cream/60 mt-5 leading-relaxed max-w-md">
            Send us the dress name, your size and where to deliver — we&rsquo;ll
            confirm stock and payment details right in the chat.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-cream hover:text-gold-light transition-colors w-fit"
            >
              <span className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold-light">
                &#9743;
              </span>
              WhatsApp: +{siteConfig.whatsappNumber.replace(
                /(\d{3})(\d{3})(\d{3})(\d{4})/,
                "$1 $2 $3 $4"
              )}
            </a>
            <a
              href={`tel:${siteConfig.callNumberHref}`}
              className="inline-flex items-center gap-3 text-cream hover:text-gold-light transition-colors w-fit"
            >
              <span className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold-light">
                &#9742;
              </span>
              Call: {siteConfig.callNumber}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-cream hover:text-gold-light transition-colors w-fit"
            >
              <span className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold-light">
                &#9737;
              </span>
              Instagram: {siteConfig.instagramHandle}
            </a>
            <p className="text-cream/40 text-sm mt-2">{siteConfig.location}</p>
          </div>
        </div>

        <div className="bg-espresso rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl text-cream mb-1">
            Prefer to leave a message?
          </h3>
          <p className="text-cream/50 text-sm mb-6">
            Fill in the form and we&rsquo;ll open WhatsApp with your message
            ready to send.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-lg bg-espresso-dark border border-gold/20 text-cream placeholder:text-cream/35 px-4 py-3 text-sm focus:border-gold/60 outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
                className="w-full rounded-lg bg-espresso-dark border border-gold/20 text-cream placeholder:text-cream/35 px-4 py-3 text-sm focus:border-gold/60 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you're looking for"
                className="w-full rounded-lg bg-espresso-dark border border-gold/20 text-cream placeholder:text-cream/35 px-4 py-3 text-sm focus:border-gold/60 outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-gold text-espresso-dark py-3 font-medium hover:bg-gold-light transition-colors"
            >
              Send on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { siteConfig, buildWhatsAppLink } from "../config";
import { submitContactMessage } from "../firebase";

const initialForm = { name: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const ok = await submitContactMessage(form);
    if (ok) {
      setStatus("sent");
      setForm(initialForm);
    } else {
      setStatus("error");
    }
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
            We&rsquo;ll reply on WhatsApp or by phone within the day.
          </p>

          {status === "sent" ? (
            <div className="text-gold-light bg-gold/10 border border-gold/30 rounded-xl p-5 text-sm">
              Message received — thank you! We&rsquo;ll be in touch shortly.
            </div>
          ) : (
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
                disabled={status === "sending"}
                className="rounded-full bg-gold text-espresso-dark py-3 font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <p className="text-berry text-sm">
                  Firebase isn&rsquo;t connected yet — message us on WhatsApp
                  instead, or add your Firebase keys to .env.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

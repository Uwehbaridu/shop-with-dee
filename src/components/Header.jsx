import { useEffect, useState } from "react";
import logo from "../assets/logo-lit.jpg";
import { siteConfig, buildWhatsAppLink } from "../config";

const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-espresso-dark/95 backdrop-blur shadow-[0_1px_0_rgba(199,153,46,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-20">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Shop with Dee"
            className="w-11 h-11 rounded-full object-cover ring-1 ring-gold/60"
          />
          <span className="font-display text-lg sm:text-xl text-cream tracking-wide">
            Shop with Dee
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-cream/80 hover:text-gold-light transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-sm text-gold-light hover:bg-gold hover:text-espresso-dark transition-colors"
          >
            Order on WhatsApp
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-cream w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-espresso-dark border-t border-gold/20 px-5 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-cream/85 text-base py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 text-center rounded-full bg-gold text-espresso-dark py-2.5 font-medium"
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

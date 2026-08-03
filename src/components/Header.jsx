import { useEffect, useState } from "react";
import logo from "../assets/logo-lit.jpg";
import { siteConfig, buildWhatsAppLink } from "../config";
import { useCart } from "../cart";

const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-espresso-dark/95 backdrop-blur shadow-[0_1px_0_rgba(199,153,46,0.25)]"
          : "bg-transparent"
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

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart${totalItems ? `, ${totalItems} items` : ""}`}
            className="relative w-10 h-10 rounded-full border border-gold/50 text-gold-light flex items-center justify-center hover:bg-gold/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 2H2" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-espresso-dark text-[10px] font-bold flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-sm text-gold-light hover:bg-gold hover:text-espresso-dark transition-colors"
          >
            Order on WhatsApp
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-cream w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-px w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openCart();
            }}
            className="text-left text-cream/85 text-base py-1"
          >
            Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </button>
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

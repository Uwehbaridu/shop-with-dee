import logo from "../assets/logo-lit.jpg";
import { siteConfig } from "../config";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/50 py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-display text-cream/80">Shop with Dee</span>
        </div>
        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} {siteConfig.brand}. {siteConfig.tagline}.
        </p>
      </div>
    </footer>
  );
}

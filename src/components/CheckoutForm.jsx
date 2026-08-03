import { useState } from "react";
import { buildCartWhatsAppLink } from "../config";
import { useCart } from "../cart";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const initial = {
  name: "",
  phone: "",
  isWhatsApp: true,
  state: "",
  city: "",
  address: "",
};

export default function CheckoutForm({ onClose }) {
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const [form, setForm] = useState(initial);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = buildCartWhatsAppLink(items, {
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      isWhatsApp: form.isWhatsApp,
      state: form.state,
      city: form.city.trim(),
      address: form.address.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative bg-cream w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[94vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <div className="sticky top-0 bg-cream z-10 flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <h2 id="checkout-title" className="font-display text-xl text-ink">
            Complete your order
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center"
          >
            &#10005;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Order summary */}
          <div className="bg-white rounded-xl border border-ink/5 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/40 mb-2">
              Order summary
            </p>
            <ul className="space-y-1.5 text-sm text-ink/70">
              {items.map((item) => (
                <li key={item.key} className="flex justify-between gap-2">
                  <span className="truncate">
                    {item.name}
                    {item.designName ? ` · ${item.designName}` : ""}
                    {" "}×{item.quantity}
                  </span>
                  <span className="shrink-0 text-gold font-medium">
                    &#8358;{(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-ink/10 flex justify-between">
              <span className="text-sm text-ink/60">Total</span>
              <span className="font-display text-lg text-ink">
                &#8358;{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="co-name" className="block text-sm font-medium text-ink/70 mb-1.5">
              Full name
            </label>
            <input
              id="co-name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="co-phone" className="block text-sm font-medium text-ink/70 mb-1.5">
              Phone number
            </label>
            <input
              id="co-phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 08012345678"
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
            />
            <label className="mt-2 flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="isWhatsApp"
                checked={form.isWhatsApp}
                onChange={handleChange}
                className="w-4 h-4 rounded border-ink/30 text-espresso accent-gold"
              />
              <span className="text-sm text-ink/60">This is a WhatsApp number</span>
            </label>
          </div>

          {/* Delivery address */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-ink/70">Delivery address</p>

            <div>
              <label htmlFor="co-state" className="sr-only">
                State
              </label>
              <select
                id="co-state"
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-gold outline-none appearance-none"
              >
                <option value="" disabled>
                  Select state
                </option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="co-city" className="sr-only">
                City
              </label>
              <input
                id="co-city"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="City / LGA"
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
              />
            </div>

            <div>
              <label htmlFor="co-address" className="sr-only">
                House address
              </label>
              <textarea
                id="co-address"
                name="address"
                required
                rows={2}
                value={form.address}
                onChange={handleChange}
                placeholder="House address / street / landmark"
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none resize-none"
              />
            </div>
          </div>

          {/* Delivery note */}
          <div className="rounded-xl bg-gold/10 border border-gold/25 px-4 py-3 text-sm text-espresso-dark/80">
            <strong className="font-medium">Note:</strong> Delivery fee will be
            paid by you. We’ll confirm the delivery cost on WhatsApp after your
            order.
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gold text-espresso-dark py-3.5 font-medium hover:bg-gold-light transition-colors"
          >
            Place order on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

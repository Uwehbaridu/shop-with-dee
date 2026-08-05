import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildCartWhatsAppLink } from "../config";
import { useCart } from "../cart";
import { sendOrderEmails } from "../email";
import { saveLastOrder } from "../pages/OrderConfirmation";

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
  email: "",
  phone: "",
  isWhatsApp: true,
  state: "",
  city: "",
  address: "",
};

export default function CheckoutForm({ onClose }) {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const customer = {
      customerName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      isWhatsApp: form.isWhatsApp,
      state: form.state,
      city: form.city.trim(),
      address: form.address.trim(),
    };

    // Snapshot items before clearing cart
    const orderItems = items.map((item) => ({
      key: item.key,
      name: item.name,
      designName: item.designName,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const emailResult = await sendOrderEmails({
      items,
      customer,
      totalPrice,
    });

    const whatsappUrl = buildCartWhatsAppLink(items, {
      ...customer,
      orderId: emailResult.orderId,
    });

    const order = {
      orderId: emailResult.orderId,
      customer,
      items: orderItems,
      totalPrice,
      placedAt: new Date().toISOString(),
      whatsappUrl,
      emailSent: Boolean(emailResult.ok),
    };

    saveLastOrder(order);
    clearCart();
    closeCart();
    onClose();
    setSubmitting(false);

    // Open WhatsApp in a new tab, then show confirmation page
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    navigate("/order-confirmation", { state: { order } });
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

          <div>
            <label htmlFor="co-email" className="block text-sm font-medium text-ink/70 mb-1.5">
              Email address
            </label>
            <input
              id="co-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
            />
            <p className="mt-1.5 text-xs text-ink/40">
              We’ll send your order confirmation here.
            </p>
          </div>

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

          <div className="space-y-3">
            <p className="text-sm font-medium text-ink/70">Delivery address</p>

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

            <input
              id="co-city"
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="City / LGA"
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
            />

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

          <div className="rounded-xl bg-gold/10 border border-gold/25 px-4 py-3 text-sm text-espresso-dark/80">
            <strong className="font-medium">Note:</strong> Delivery fee will be
            paid by you. We’ll confirm the delivery cost on WhatsApp after your
            order. You’ll also get a confirmation email.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gold text-espresso-dark py-3.5 font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>
      </div>
    </div>
  );
}

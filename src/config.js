// Edit these once and every button/link across the site updates.

export const siteConfig = {
  brand: "Shop with Dee",
  tagline: "The fashion hub — luxury for less",
  subtagline: "Classic never goes out of fashion.",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "2349126783004", // no + or spaces
  callNumber: "+234 810 993 3872",
  callNumberHref: "+2348109933872",
  instagramHandle: "@shopwithdee", // update to the real handle
  instagramUrl: "https://instagram.com/shopwithdee",
  location: "Port Harcourt, Rivers State, Nigeria",
};

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled order message.
 * If a product is passed, the message names it, its design, size, quantity,
 * and price so Dee's team can confirm the order without back-and-forth.
 *
 * @param {object} [product] - the dress being ordered
 * @param {object} [options]
 * @param {string} [options.design] - e.g. "Deep Wine"
 * @param {string} [options.size] - e.g. "12", "13", "14"
 * @param {number} [options.quantity] - defaults to 1
 */
export function buildWhatsAppLink(product, options = {}) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;

  if (!product) {
    return `${base}?text=${encodeURIComponent(
      "Hi Shop with Dee! I'd like to place an order."
    )}`;
  }

  const { design, size, quantity = 1 } = options;
  const total = product.price * quantity;

  let message = `Hi Shop with Dee! I'd like to order:\n\n${product.name}`;
  if (design) message += `\nDesign: ${design}`;
  if (size) message += `\nSize: ${size}`;
  message += `\nQuantity: ${quantity}`;
  message += `\nPrice: ₦${product.price.toLocaleString()} each (₦${total.toLocaleString()} total)`;
  message += `\n\nIs it available?`;

  return `${base}?text=${encodeURIComponent(message)}`;
}
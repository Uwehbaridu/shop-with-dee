// Edit these once and every button/link across the site updates.

export const siteConfig = {
  brand: "Shop with Dee",
  tagline: "The fashion hub — luxury for less",
  subtagline: "Classic never goes out of fashion.",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "2347049327291", // no + or spaces
  callNumber: "+234 810 993 3872",
  callNumberHref: "+2348109933872",
  instagramHandle: "@shopwithdee", // update to the real handle
  instagramUrl: "https://instagram.com/shopwithdee",
  location: "Port Harcourt, Rivers State, Nigeria",
};

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled order message.
 * If a product is passed, the message names it and its price so Dee's team
 * can confirm the order without back-and-forth.
 */
export function buildWhatsAppLink(product) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  const message = product
    ? `Hi Shop with Dee! I'd like to order the ${product.name} (₦${product.price.toLocaleString()}). Is it available in my size?`
    : `Hi Shop with Dee! I'd like to place an order.`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

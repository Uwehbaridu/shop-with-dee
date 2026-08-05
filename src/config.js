// Edit these once and every button/link across the site updates.

export const siteConfig = {
  brand: "Shop with Dee",
  tagline: "The fashion hub — luxury for less",
  subtagline: "Classic never goes out of fashion.",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "2349126783004",
  orderEmail: import.meta.env.VITE_ORDER_EMAIL || "shopwithdee07@gmail.com",
  // Public site URL (no trailing slash) — used in confirmation emails
  siteUrl: import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : ""),
  callNumber: "+234 810 993 3872",
  callNumberHref: "+2348109933872",
  instagramHandle: "@shopwithdee",
  instagramUrl: "https://instagram.com/shopwithdee",
  location: "Port Harcourt, Rivers State, Nigeria",
};

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

export function buildCartWhatsAppLink(items, customer = {}) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;

  if (!items || items.length === 0) {
    return `${base}?text=${encodeURIComponent(
      "Hi Shop with Dee! I'd like to place an order."
    )}`;
  }

  let message = "Hi Shop with Dee! I'd like to place a pre-order.\n";

  if (customer.orderId) {
    message += `\nOrder ID: ${customer.orderId}`;
  }
  if (customer.customerName) {
    message += `\nName: ${customer.customerName}`;
  }
  if (customer.email) {
    message += `\nEmail: ${customer.email}`;
  }
  if (customer.phone) {
    message += `\nPhone: ${customer.phone}`;
    if (customer.isWhatsApp) message += " (WhatsApp)";
  }
  if (customer.state || customer.city || customer.address) {
    message += "\nDelivery address:";
    if (customer.address) message += `\n  ${customer.address}`;
    if (customer.city) message += `\n  ${customer.city}`;
    if (customer.state) message += `\n  ${customer.state}`;
  }

  message += "\n\nItems:";
  let grandTotal = 0;

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    grandTotal += lineTotal;
    message += `\n${index + 1}. ${item.name}`;
    if (item.designName) message += `\n   Design: ${item.designName}`;
    message += `\n   Size: ${item.size}`;
    message += `\n   Qty: ${item.quantity}`;
    message += `\n   ₦${item.price.toLocaleString()} each (₦${lineTotal.toLocaleString()})`;
  });

  message += `\n\nGrand total (items): ₦${grandTotal.toLocaleString()}`;
  message += "\n\nNote: Delivery fee will be paid by me.";
  message += "\n\nPlease confirm availability and delivery cost.";

  return `${base}?text=${encodeURIComponent(message)}`;
}

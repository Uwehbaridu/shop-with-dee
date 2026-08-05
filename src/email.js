import emailjs from "@emailjs/browser";
import { siteConfig } from "./config";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_SHOP = import.meta.env.VITE_EMAILJS_TEMPLATE_SHOP;
const TEMPLATE_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const shopOrderEmail = siteConfig.orderEmail;

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_SHOP && TEMPLATE_CUSTOMER && PUBLIC_KEY);
}

function formatItems(items) {
  return items
    .map((item, i) => {
      const line = item.price * item.quantity;
      let row = `${i + 1}. ${item.name}`;
      if (item.designName) row += ` — ${item.designName}`;
      row += `\n   Size: ${item.size}  |  Qty: ${item.quantity}  |  ₦${item.price.toLocaleString()} each  |  Line: ₦${line.toLocaleString()}`;
      return row;
    })
    .join("\n\n");
}

function orderId() {
  const n = Date.now().toString().slice(-6);
  return `SWD-${n}`;
}

function absoluteImageUrl(src) {
  if (!src || typeof src !== "string") return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const origin =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  if (!origin) return "";
  if (src.startsWith("/")) return `${origin.replace(/\/$/, "")}${src}`;
  return `${origin.replace(/\/$/, "")}/${src}`;
}

/** Shape required by EmailJS Order Confirmation {{#orders}} block */
function buildOrdersArray(items) {
  return items.map((item) => {
    const line = item.price * item.quantity;
    const label = item.designName
      ? `${item.name} — ${item.designName}`
      : item.name;
    return {
      name: `${label} (Size ${item.size})`,
      units: item.quantity,
      price: line.toLocaleString("en-NG"),
      image_url: absoluteImageUrl(item.image),
    };
  });
}

function buildShopMessage({ id, customer, address, itemsText, total }) {
  return [
    "══════════════════════════════════",
    "  A NEW ORDER TRACKED",
    `  Order Number: ${id}`,
    "══════════════════════════════════",
    "",
    "CUSTOMER DETAILS",
    "──────────────────────────────────",
    `Name:     ${customer.customerName || "—"}`,
    `Email:    ${customer.email || "—"}`,
    `Phone:    ${customer.phone || "—"}`,
    `WhatsApp: ${customer.isWhatsApp ? "Yes" : "No"}`,
    `Delivery: ${address || "—"}`,
    "",
    "ORDER ITEMS",
    "──────────────────────────────────",
    itemsText,
    "",
    "──────────────────────────────────",
    `GRAND TOTAL (items): ${total}`,
    "──────────────────────────────────",
    "",
    "Note: Delivery fee is paid by the customer.",
    "Confirm availability and delivery cost on WhatsApp.",
  ].join("\n");
}

export async function sendOrderEmails({ items, customer, totalPrice }) {
  const id = orderId();
  const itemsText = formatItems(items);
  const address = [customer.address, customer.city, customer.state]
    .filter(Boolean)
    .join(", ");
  const totalNum = Number(totalPrice || 0);
  const total = `₦${totalNum.toLocaleString()}`;
  const shopSubject = `A New Order Tracked - Order Number ${id}`;
  const customerSubject = `Order Confirmed #${id}!`;

  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "") ||
    siteConfig.siteUrl ||
    "";

  const viewOrderUrl = siteUrl
    ? `${siteUrl.replace(/\/$/, "")}/order-confirmation`
    : "#";

  const orders = buildOrdersArray(items);

  // EmailJS Order Confirmation template expects cost.* as strings
  const cost = {
    shipping: "To confirm",
    tax: "0",
    total: totalNum.toLocaleString("en-NG"),
  };

  const shared = {
    order_id: id,
    customer_name: customer.customerName || "",
    customer_phone: customer.phone || "",
    customer_email: customer.email || "",
    is_whatsapp: customer.isWhatsApp ? "Yes" : "No",
    delivery_address: address,
    items_list: itemsText,
    grand_total: total,
    shop_email: shopOrderEmail,
    brand: siteConfig.brand,
    name: customer.customerName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    orders,
    cost,
    view_order_url: viewOrderUrl,
    site_url: siteUrl || viewOrderUrl,
  };

  if (!isEmailConfigured()) {
    console.warn(
      "EmailJS is not configured. Add VITE_EMAILJS_* keys to .env to enable order emails."
    );
    return { ok: false, orderId: id, skipped: true };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_SHOP,
      {
        ...shared,
        to_email: shopOrderEmail,
        subject: shopSubject,
        title: shopSubject,
        message: buildShopMessage({
          id,
          customer,
          address,
          itemsText,
          total,
        }),
      },
      PUBLIC_KEY
    );

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...shared,
        to_email: customer.email,
        subject: customerSubject,
        title: customerSubject,
        message: buildShopMessage({
          id,
          customer,
          address,
          itemsText,
          total,
        }),
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

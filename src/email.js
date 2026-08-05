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
      row += ` | Size ${item.size} | Qty ${item.quantity} | ₦${line.toLocaleString()}`;
      return row;
    })
    .join("\n");
}

function orderId() {
  const n = Date.now().toString().slice(-6);
  return `SWD-${n}`;
}

/**
 * Sends two emails via EmailJS:
 * 1. Full order details → shop (shopwithdee07@gmail.com)
 * 2. Confirmation → customer
 */
export async function sendOrderEmails({ items, customer, totalPrice }) {
  const id = orderId();
  const itemsText = formatItems(items);
  const address = [customer.address, customer.city, customer.state]
    .filter(Boolean)
    .join(", ");
  const total = `₦${Number(totalPrice || 0).toLocaleString()}`;

  const messageBody = [
    `Order ID: ${id}`,
    `Name: ${customer.customerName || ""}`,
    `Email: ${customer.email || ""}`,
    `Phone: ${customer.phone || ""}${customer.isWhatsApp ? " (WhatsApp)" : ""}`,
    `Delivery: ${address}`,
    "",
    "Items:",
    itemsText,
    "",
    `Total: ${total}`,
    "",
    "Note: Delivery fee to be confirmed with customer.",
  ].join("\n");

  // Custom vars + aliases for default Contact Us / Order Confirmation templates
  const base = {
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
    // Common EmailJS defaults
    name: customer.customerName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    title: `Order ${id}`,
    message: messageBody,
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
        ...base,
        to_email: shopOrderEmail,
        subject: `New order ${id} — ${customer.customerName || "Customer"}`,
      },
      PUBLIC_KEY
    );

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...base,
        to_email: customer.email,
        subject: `Order confirmed ${id} — Shop with Dee`,
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

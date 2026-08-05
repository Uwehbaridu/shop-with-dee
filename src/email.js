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

function buildCustomerMessage({ id, customer, itemsText, total }) {
  return [
    "Shop with Dee",
    "Luxury for less",
    "",
    `ORDER ${id}`,
    "",
    `Hi ${customer.customerName || "there"},`,
    "",
    "Thank you for your order!",
    `We've received your pre-order. Your order number is ${id}.`,
    "",
    "ITEMS",
    "──────────────────────────────────",
    itemsText,
    "",
    `TOTAL: ${total}`,
    "",
    "We'll confirm availability and delivery cost on WhatsApp shortly.",
    "Delivery fee will be paid by you.",
    "",
    "Please check your items at delivery before signing.",
    "",
    "Thank you for shopping with us — classic never goes out of fashion.",
    "",
    "— Shop with Dee",
    "Port Harcourt, Rivers State",
  ].join("\n");
}

/**
 * Sends two emails via EmailJS (shop + customer).
 * Content is in the `message` field so default Contact Us / simple templates work.
 */
export async function sendOrderEmails({ items, customer, totalPrice }) {
  const id = orderId();
  const itemsText = formatItems(items);
  const address = [customer.address, customer.city, customer.state]
    .filter(Boolean)
    .join(", ");
  const total = `₦${Number(totalPrice || 0).toLocaleString()}`;
  const shopSubject = `A New Order Tracked - Order Number ${id}`;
  const customerSubject = `Order ${id} confirmed — Shop with Dee`;

  const shopMessage = buildShopMessage({
    id,
    customer,
    address,
    itemsText,
    total,
  });
  const customerMessage = buildCustomerMessage({
    id,
    customer,
    itemsText,
    total,
  });

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
        message: shopMessage,
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
        message: customerMessage,
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

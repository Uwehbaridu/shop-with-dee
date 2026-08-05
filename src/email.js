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

/**
 * Sends two emails via EmailJS.
 * Templates must use variables like {{order_id}}, {{customer_name}}, {{items_list}}
 * (HTML layout lives IN the EmailJS template — see email-templates/ folder).
 */
export async function sendOrderEmails({ items, customer, totalPrice }) {
  const id = orderId();
  const itemsText = formatItems(items);
  const address = [customer.address, customer.city, customer.state]
    .filter(Boolean)
    .join(", ");
  const total = `₦${Number(totalPrice || 0).toLocaleString()}`;
  const shopSubject = `A New Order Tracked - Order Number ${id}`;

  // Plain-text message (always readable even if template is simple)
  const plainMessage = [
    `A NEW ORDER TRACKED`,
    `Order Number: ${id}`,
    ``,
    `CUSTOMER DETAILS`,
    `Name: ${customer.customerName || "—"}`,
    `Email: ${customer.email || "—"}`,
    `Phone: ${customer.phone || "—"}`,
    `WhatsApp: ${customer.isWhatsApp ? "Yes" : "No"}`,
    `Delivery: ${address || "—"}`,
    ``,
    `ORDER ITEMS`,
    itemsText,
    ``,
    `GRAND TOTAL (items): ${total}`,
    ``,
    `Note: Delivery fee is paid by the customer — confirm cost on WhatsApp.`,
  ].join("\n");

  const params = {
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
    // Common EmailJS field names
    name: customer.customerName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    title: shopSubject,
    subject: shopSubject,
    message: plainMessage,
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
        ...params,
        to_email: shopOrderEmail,
      },
      PUBLIC_KEY
    );

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...params,
        to_email: customer.email,
        subject: `Order ${id} confirmed — Shop with Dee`,
        title: `Order ${id} confirmed`,
        message: [
          `Hi ${customer.customerName || "there"},`,
          ``,
          `Thank you for your order with Shop with Dee!`,
          `Order number: ${id}`,
          ``,
          `Items:`,
          itemsText,
          ``,
          `Total: ${total}`,
          ``,
          `We'll confirm delivery cost on WhatsApp shortly.`,
          `Delivery fee will be paid by you.`,
          ``,
          `— Shop with Dee`,
        ].join("\n"),
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

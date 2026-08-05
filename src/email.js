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

function formatItemsHtml(items) {
  return items
    .map((item) => {
      const line = item.price * item.quantity;
      const design = item.designName ? ` · ${item.designName}` : "";
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1C1410;">
          <strong>${item.name}</strong>${design}<br/>
          <span style="color:#777;font-size:12px;">Size ${item.size} · Qty ${item.quantity}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#C7992E;text-align:right;white-space:nowrap;">
          ₦${line.toLocaleString()}
        </td>
      </tr>`;
    })
    .join("");
}

function orderId() {
  const n = Date.now().toString().slice(-6);
  return `SWD-${n}`;
}

function customerEmailHtml({ id, name, itemsHtml, total }) {
  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1C1410;line-height:1.55;background:#ffffff;">
  <div style="text-align:center;padding:28px 20px 12px;background:#180F0A;">
    <p style="margin:0;font-size:12px;letter-spacing:0.28em;color:#E4C878;text-transform:uppercase;">Shop with Dee</p>
    <p style="margin:8px 0 0;font-size:13px;color:#F8F3E9;opacity:0.8;">Luxury for less</p>
  </div>

  <div style="padding:28px 24px;">
    <p style="text-align:right;color:#999;font-size:12px;margin:0 0 20px;letter-spacing:0.04em;">ORDER ${id}</p>

    <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;color:#1C1410;">Thank you for your order!</h1>

    <p style="color:#555;margin:0 0 18px;font-size:15px;">
      Hi ${name || "there"}, we’ve received your pre-order. Your order number is
      <strong>${id}</strong>.
    </p>

    <p style="margin:0 0 8px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.06em;">Items</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${itemsHtml}
    </table>

    <p style="margin:0 0 20px;font-size:16px;">
      <strong>Total:</strong> <span style="color:#C7992E;">${total}</span>
    </p>

    <p style="color:#555;font-size:14px;margin:0 0 12px;">
      We’ll confirm availability and delivery cost on WhatsApp shortly.
      <strong>Delivery fee will be paid by you.</strong>
    </p>

    <p style="color:#555;font-size:14px;margin:0 0 28px;">
      Please check your items at delivery before signing. Thank you for shopping with us — classic never goes out of fashion.
    </p>

    <p style="margin:0;font-size:13px;color:#C7992E;">
      — Shop with Dee<br/>
      <span style="color:#888;">Port Harcourt, Rivers State</span>
    </p>
  </div>
</div>`;
}

function shopEmailText({ id, customer, address, itemsText, total }) {
  return [
    `New order from the website`,
    ``,
    `Order ID: ${id}`,
    `Name: ${customer.customerName || ""}`,
    `Email: ${customer.email || ""}`,
    `Phone: ${customer.phone || ""}${customer.isWhatsApp ? " (WhatsApp)" : ""}`,
    `Delivery: ${address}`,
    ``,
    `Items:`,
    itemsText,
    ``,
    `Total: ${total}`,
    ``,
    `Note: Confirm availability and delivery fee with the customer on WhatsApp.`,
  ].join("\n");
}

/**
 * Sends two emails via EmailJS:
 * 1. Full order details → shop
 * 2. Branded confirmation → customer
 */
export async function sendOrderEmails({ items, customer, totalPrice }) {
  const id = orderId();
  const itemsText = formatItems(items);
  const itemsHtml = formatItemsHtml(items);
  const address = [customer.address, customer.city, customer.state]
    .filter(Boolean)
    .join(", ");
  const total = `₦${Number(totalPrice || 0).toLocaleString()}`;
  const htmlBody = customerEmailHtml({
    id,
    name: customer.customerName,
    itemsHtml,
    total,
  });
  const shopMessage = shopEmailText({
    id,
    customer,
    address,
    itemsText,
    total,
  });

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
    name: customer.customerName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    title: `Order ${id}`,
    message: shopMessage,
    html_body: htmlBody,
  };

  if (!isEmailConfigured()) {
    console.warn(
      "EmailJS is not configured. Add VITE_EMAILJS_* keys to .env to enable order emails."
    );
    return { ok: false, orderId: id, skipped: true };
  }

  try {
    // Shop notification (Contact Us template uses name / email / message)
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_SHOP,
      {
        ...base,
        to_email: shopOrderEmail,
        subject: `New order ${id} — ${customer.customerName || "Customer"}`,
        message: shopMessage,
      },
      PUBLIC_KEY
    );

    // Customer confirmation — template should contain only {{{html_body}}} or {{message}}
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...base,
        to_email: customer.email,
        subject: `Order ${id} confirmed — Shop with Dee`,
        message: htmlBody,
        html_body: htmlBody,
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

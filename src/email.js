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

function shopItemsTableRows(items) {
  return items
    .map((item, i) => {
      const line = item.price * item.quantity;
      return `<tr>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;">${i + 1}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;">${item.name}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;">${item.designName || "—"}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;text-align:center;">${item.size}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;text-align:right;">₦${item.price.toLocaleString()}</td>
        <td style="padding:10px 12px;border:1px solid #e5e5e5;font-size:13px;text-align:right;font-weight:600;">₦${line.toLocaleString()}</td>
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

function shopEmailHtml({ id, customer, address, items, total }) {
  const rows = shopItemsTableRows(items);
  const whatsapp = customer.isWhatsApp ? "Yes" : "No";
  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#1C1410;line-height:1.5;">
  <div style="background:#180F0A;padding:20px 24px;">
    <p style="margin:0;font-size:11px;letter-spacing:0.2em;color:#E4C878;text-transform:uppercase;">Shop with Dee</p>
    <h1 style="margin:8px 0 0;font-size:20px;color:#F8F3E9;font-weight:600;">A New Order Tracked</h1>
    <p style="margin:6px 0 0;color:#E4C878;font-size:14px;">Order Number: <strong>${id}</strong></p>
  </div>

  <div style="padding:24px;">
    <h2 style="margin:0 0 12px;font-size:15px;color:#333;text-transform:uppercase;letter-spacing:0.04em;">Customer details</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f8f3e9;width:140px;"><strong>Name</strong></td>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;">${customer.customerName || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f8f3e9;"><strong>Email</strong></td>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;">${customer.email || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f8f3e9;"><strong>Phone</strong></td>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;">${customer.phone || "—"}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f8f3e9;"><strong>WhatsApp?</strong></td>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;">${whatsapp}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f8f3e9;"><strong>Delivery</strong></td>
        <td style="padding:8px 12px;border:1px solid #e5e5e5;">${address || "—"}</td>
      </tr>
    </table>

    <h2 style="margin:0 0 12px;font-size:15px;color:#333;text-transform:uppercase;letter-spacing:0.04em;">Order items</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px;">
      <thead>
        <tr style="background:#180F0A;color:#F8F3E9;">
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:left;">#</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:left;">Product</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:left;">Design</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:center;">Size</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:center;">Qty</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:right;">Unit</th>
          <th style="padding:10px 12px;border:1px solid #180F0A;text-align:right;">Line</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <p style="margin:0 0 8px;font-size:16px;">
      <strong>Grand total (items):</strong>
      <span style="color:#C7992E;font-size:18px;">${total}</span>
    </p>
    <p style="margin:0;font-size:13px;color:#666;">
      Delivery fee is paid by the customer — confirm cost on WhatsApp.
    </p>
  </div>
</div>`;
}

/**
 * Sends two emails via EmailJS:
 * 1. Full order table → shop
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

  const customerHtml = customerEmailHtml({
    id,
    name: customer.customerName,
    itemsHtml,
    total,
  });

  const shopHtml = shopEmailHtml({
    id,
    customer,
    address,
    items,
    total,
  });

  const shopSubject = `A New Order Tracked - Order Number ${id}`;

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
    title: shopSubject,
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
        subject: shopSubject,
        message: shopHtml,
        html_body: shopHtml,
      },
      PUBLIC_KEY
    );

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...base,
        to_email: customer.email,
        subject: `Order ${id} confirmed — Shop with Dee`,
        message: customerHtml,
        html_body: customerHtml,
      },
      PUBLIC_KEY
    );

    return { ok: true, orderId: id };
  } catch (err) {
    console.error("Order email failed", err);
    return { ok: false, orderId: id, error: err };
  }
}

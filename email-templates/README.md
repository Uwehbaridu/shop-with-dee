# EmailJS templates — required one-time setup

You must edit both templates in the EmailJS dashboard.
The website cannot change them for you.

## 1. Shop template (Contact Us — template_gfnh6ar)

1. Open https://dashboard.emailjs.com → Email Templates → Contact Us
2. **To Email:** `shopwithdee07@gmail.com`
3. **Subject:** `A New Order Tracked - Order Number {{order_id}}`
4. **Body:** delete everything, put only:

```
{{message}}
```

5. Save

## 2. Customer template (Order Confirmation — template_orndzp8)

1. Open Order Confirmation template
2. **To Email:** `{{to_email}}`
3. **Subject:** `Order {{order_id}} confirmed — Shop with Dee`
4. **Body:** delete the default design, put only:

```
{{message}}
```

5. Save

After this, both emails show full order details in plain readable text (no raw HTML).

Optional: for a styled HTML look, paste the contents of `SHOP_NEW_ORDER.html` / `CUSTOMER_ORDER_CONFIRMATION.html` instead of `{{message}}`.

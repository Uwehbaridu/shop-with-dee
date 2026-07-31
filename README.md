# Shop with Dee — landing page

A responsive landing page for **Shop with Dee**, "the fashion hub — luxury
for less." Built with React + Vite + Tailwind CSS, backed by Firebase
(Firestore for the product catalogue and contact messages), and deployed on
Vercel.

Every "Order on WhatsApp" button opens WhatsApp with a pre-filled message
naming the dress and price, so a customer never has to type anything to
start an order.

## Project structure

```
src/
  components/    Header, Hero, Products, ProductCard, About, Showroom, Contact, Footer
  data/products.js   Starter catalogue (used until Firestore has products)
  config.js          Brand name, WhatsApp/phone/Instagram, WhatsApp link builder
  firebase.js         Firebase init + fetchProducts() / submitContactMessage()
```

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost address. The site works immediately with the
8 starter dresses in `src/data/products.js` — no Firebase setup required
to preview it.

## 2. Edit the basics

- **Prices, dresses, tags** — edit `src/data/products.js` (or manage them in
  Firestore once it's connected — see below).
- **WhatsApp number, phone number, Instagram handle, location** — edit
  `src/config.js`.
- **Colors and fonts** — `tailwind.config.js` (`espresso`, `gold`, `berry`,
  `cream` colors; `display` / `script` / `body` fonts).

## 3. Connect Firebase (optional but recommended)

Firebase gives you a product database you can update without touching code,
image storage, and a place for contact-form messages to land.

1. Go to console.firebase.google.com → **Add project**.
2. Inside the project: **Build → Firestore Database → Create database**
   (start in production mode).
3. Inside the project: **Build → Storage → Get started** (for product photos).
4. **Project settings → General → Your apps → Add app → Web**. Copy the
   `firebaseConfig` values it gives you.
5. Copy `.env.example` to `.env` and paste those values in:

   ```bash
   cp .env.example .env
   ```

6. Restart `npm run dev`. The site will now read products from a Firestore
   collection called `products` (falling back to `src/data/products.js` if
   that collection is empty).

### Adding products in Firestore

Create a `products` collection, and add one document per dress with these
fields:

| Field    | Type    | Example                          |
| -------- | ------- | --------------------------------- |
| name     | string  | "Magenta Sleeveless Pencil Dress" |
| price    | number  | 9500                              |
| swatch   | string  | "#B0154F" (a hex color from the photo) |
| image    | string  | URL of the photo (upload to Storage first, then paste its URL here) |
| tag      | string  | "Bestseller" (optional)           |

### Firestore security rules

Lock the database down so only your team can write, but anyone can read the
catalogue and submit a contact message:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // manage products from the Firebase console
    }
    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Paste this under **Firestore Database → Rules** in the console.

## 4. Deploy on Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com → **Add New → Project** → import the repo. Vercel
   auto-detects Vite; no build settings need changing.
3. Add your Firebase keys as **Environment Variables** in the Vercel project
   settings (same names as in `.env.example`), so the live site can reach
   Firestore.
4. Deploy. Every future push to `main` redeploys automatically.
5. **Custom domain**: Project → Settings → Domains → add `shopwithdee.com`
   and follow Vercel's DNS instructions.

Vercel handles hosting, SSL, and the CDN; Firebase only needs to run
Firestore (and Storage, if you use it for photos) — there's no need to use
Firebase Hosting as well.

## 5. Before launch checklist

- [ ] Confirm the WhatsApp number in `src/config.js` is the one the team
      actually monitors.
- [ ] Swap `instagramHandle` / `instagramUrl` in `src/config.js` for the
      real account.
- [ ] Add real product photos (Firestore `image` field, or replace the
      color swatches in `src/data/products.js`).
- [ ] Test the WhatsApp buttons on an actual phone — desktop opens
      WhatsApp Web, mobile opens the app.

// Starter catalogue for Shop with Dee.
// Once Firestore is connected (see src/firebase.js), this file becomes the
// fallback used if the "products" collection hasn't been created yet —
// nothing breaks while the store is being stocked in the Firebase console.
//
// Each product can offer several "designs" (color/print variations of the
// same cut). If real photos exist, set `image` on a design instead of
// (or in addition to) `swatch` and it'll show the photo rather than a flat color block.

import asymmetricDress from "../assets/products/Asymmetric-Button-Corporate-Dress.jpeg";

export const products = [
  {
    id: "magenta-pencil",
    name: "Magenta Sleeveless Pencil Dress",
    price: 9500,
    tag: "Bestseller",
    designs: [
      {
        id: "d1",
        name: "Classic Magenta",
        swatch: "#B0154F",
        image: asymmetricDress, // real photo for the first design
      },
      { id: "d2", name: "Deep Wine", swatch: "#7A1237" },
      { id: "d3", name: "Blush Pink", swatch: "#E8A0B4" },
      { id: "d4", name: "Coral", swatch: "#E4664E" },
    ],
  },
  {
    id: "ivory-sheath",
    name: "Ivory Long-Sleeve Sheath Dress",
    price: 9800,
    tag: "New in",
    designs: [
      { id: "d1", name: "Ivory", swatch: "#F4EFE6", swatchBorder: true },
      { id: "d2", name: "Champagne", swatch: "#E9D9B8" },
      { id: "d3", name: "Soft Grey", swatch: "#D8D4CC" },
      { id: "d4", name: "Blush", swatch: "#EAD3C9" },
    ],
  },
  {
    id: "chartreuse-dress",
    name: "Chartreuse Long-Sleeve Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Chartreuse", swatch: "#B8C022" },
      { id: "d2", name: "Olive", swatch: "#707A1F" },
      { id: "d3", name: "Mustard", swatch: "#C99A2E" },
      { id: "d4", name: "Teal", swatch: "#1F6B6B" },
    ],
  },
  {
    id: "black-button",
    name: "Black Button-Front Dress",
    price: 9700,
    designs: [
      { id: "d1", name: "Classic Black", swatch: "#1A1815" },
      { id: "d2", name: "Charcoal", swatch: "#3A3733" },
      { id: "d3", name: "Navy", swatch: "#1B2A4A" },
      { id: "d4", name: "Espresso Brown", swatch: "#3D2A1C" },
    ],
  },
  {
    id: "camel-wrap",
    name: "Camel Wrap Coat Dress",
    price: 10000,
    tag: "Bestseller",
    designs: [
      { id: "d1", name: "Camel", swatch: "#C6A26B" },
      { id: "d2", name: "Taupe", swatch: "#A99783" },
      { id: "d3", name: "Rust", swatch: "#A45A2A" },
      { id: "d4", name: "Black", swatch: "#1A1815" },
    ],
  },
  {
    id: "navy-belted",
    name: "Navy Belted Wrap Dress",
    price: 10000,
    designs: [
      { id: "d1", name: "Navy", swatch: "#1B2A4A" },
      { id: "d2", name: "Black", swatch: "#1A1815" },
      { id: "d3", name: "Wine", swatch: "#7A1237" },
      { id: "d4", name: "Forest Green", swatch: "#28492F" },
    ],
  },
  {
    id: "forest-button",
    name: "Forest Green Button Dress",
    price: 9800,
    designs: [
      { id: "d1", name: "Forest Green", swatch: "#28492F" },
      { id: "d2", name: "Olive", swatch: "#707A1F" },
      { id: "d3", name: "Navy", swatch: "#1B2A4A" },
      { id: "d4", name: "Camel", swatch: "#C6A26B" },
    ],
  },
  {
    id: "red-puff-sleeve",
    name: "Red Puff-Sleeve Wrap Dress",
    price: 9900,
    tag: "New in",
    designs: [
      { id: "d1", name: "Classic Red", swatch: "#A31C22" },
      { id: "d2", name: "Burgundy", swatch: "#6E1420" },
      { id: "d3", name: "Magenta", swatch: "#B0154F" },
      { id: "d4", name: "Black", swatch: "#1A1815" },
    ],
  },
];

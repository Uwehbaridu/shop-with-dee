// Firebase setup for Shop with Dee.
//
// 1. Create a project at https://console.firebase.google.com
// 2. Add a Web App inside that project, copy the config it gives you,
//    and paste the values into a ".env" file at the project root (see
//    ".env.example"). Vite only exposes variables prefixed VITE_.
// 3. Turn on the products you need in the console:
//      - Firestore Database  -> collections "products" and "messages"
//      - Storage             -> for product photos
//      - Analytics           -> optional, enabled automatically below if configured
//
// The site works with zero Firebase setup too — src/data/products.js is
// used as a fallback so the page never breaks while you're getting set up.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let db = null;
if (isConfigured && !getApps().length) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else if (isConfigured) {
  db = getFirestore(getApps()[0]);
}

/**
 * Fetches the product catalogue from Firestore's "products" collection.
 * Falls back to the static catalogue (src/data/products.js) if Firebase
 * hasn't been configured yet, or the collection is still empty.
 */
export async function fetchProducts(fallback) {
  if (!db) return fallback;
  try {
    const snapshot = await getDocs(collection(db, "products"));
    if (snapshot.empty) return fallback;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.warn("Could not reach Firestore, showing the default catalogue instead.", err);
    return fallback;
  }
}

/**
 * Saves a contact-form submission to Firestore's "messages" collection.
 * Returns true on success so the UI can show a confirmation state.
 */
export async function submitContactMessage({ name, phone, message }) {
  if (!db) {
    console.warn("Firebase isn't configured yet — add your keys to .env to store messages.");
    return false;
  }
  try {
    await addDoc(collection(db, "messages"), {
      name,
      phone,
      message,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Could not save message to Firestore", err);
    return false;
  }
}

export { db };

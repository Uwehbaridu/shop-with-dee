import { useEffect, useMemo, useState } from "react";
import { StarRating, StarInput } from "./StarRating";

const STORAGE_KEY = "shop-with-dee-reviews";

function loadStoredReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredReviews(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

function average(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export default function ProductReviews({ productId, initialReviews = [] }) {
  const [extraReviews, setExtraReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const all = loadStoredReviews();
    setExtraReviews(all[productId] ?? []);
  }, [productId]);

  const reviews = useMemo(
    () => [...initialReviews, ...extraReviews],
    [initialReviews, extraReviews]
  );

  const avg = average(reviews);
  const count = reviews.length;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating < 1) return;

    const review = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    const all = loadStoredReviews();
    const list = [...(all[productId] ?? []), review];
    all[productId] = list;
    saveStoredReviews(all);
    setExtraReviews(list);

    setName("");
    setRating(5);
    setComment("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="mt-12 border-t border-ink/10 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display text-xl text-ink">Customer reviews</h2>
          {count > 0 ? (
            <div className="mt-1.5">
              <StarRating rating={avg} count={count} size="md" />
            </div>
          ) : (
            <p className="text-sm text-ink/45 mt-1">No reviews yet — be the first</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-full border border-gold/60 text-espresso-dark px-4 py-2 text-sm font-medium hover:bg-gold/10 transition-colors"
        >
          {showForm ? "Cancel" : "Write a review"}
        </button>
      </div>

      {submitted && (
        <p className="mb-4 text-sm text-gold bg-gold/10 border border-gold/25 rounded-xl px-4 py-3">
          Thank you! Your review has been added.
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white rounded-2xl border border-ink/5 p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">
              Your rating
            </label>
            <StarInput value={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="review-name" className="block text-sm font-medium text-ink/70 mb-1.5">
              Your name
            </label>
            <input
              id="review-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chioma A."
              className="w-full rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none"
            />
          </div>
          <div>
            <label htmlFor="review-comment" className="block text-sm font-medium text-ink/70 mb-1.5">
              Your review
            </label>
            <textarea
              id="review-comment"
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the fit, fabric, and quality?"
              className="w-full rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-gold outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-espresso text-cream px-6 py-2.5 text-sm font-medium hover:bg-espresso-dark transition-colors"
          >
            Submit review
          </button>
        </form>
      )}

      {reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews
            .slice()
            .reverse()
            .map((r) => (
              <li
                key={r.id}
                className="bg-white rounded-xl border border-ink/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink text-sm">{r.name}</p>
                    <StarRating rating={r.rating} size="sm" showValue={false} />
                  </div>
                  {r.date && (
                    <time className="text-xs text-ink/35 shrink-0">{r.date}</time>
                  )}
                </div>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{r.comment}</p>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

/** Compute display rating from product seed reviews (for cards). */
export function getProductRating(product) {
  const reviews = product.reviews ?? [];
  if (!reviews.length) return { rating: 0, count: 0 };
  const rating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return { rating, count: reviews.length };
}

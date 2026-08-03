/** Filled / empty star icons for ratings. */
function Star({ filled, half, size = "md" }) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";
  const color = filled || half ? "text-gold" : "text-ink/20";

  if (half) {
    return (
      <span className={`relative inline-block ${sizeClass}`}>
        <svg className={`${sizeClass} text-ink/20 absolute inset-0`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg className={`${sizeClass} text-gold absolute inset-0`} viewBox="0 0 20 20" fill="currentColor" style={{ clipPath: "inset(0 50% 0 0)" }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>
    );
  }

  return (
    <svg className={`${sizeClass} ${color}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/**
 * Display-only star rating.
 * @param {number} rating - 0 to 5 (supports halves)
 * @param {number} [count] - number of reviews
 * @param {"sm"|"md"|"lg"} [size]
 */
export function StarRating({ rating = 0, count, size = "md", showValue = true }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<Star key={i} filled size={size} />);
    else if (rating >= i - 0.5) stars.push(<Star key={i} half size={size} />);
    else stars.push(<Star key={i} size={size} />);
  }

  return (
    <div className="inline-flex items-center gap-1.5" title={`${rating.toFixed(1)} out of 5`}>
      <span className="inline-flex items-center gap-0.5">{stars}</span>
      {showValue && (
        <span className={`text-ink/50 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {rating.toFixed(1)}
          {typeof count === "number" && count > 0 && (
            <span className="text-ink/35"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
}

/** Interactive stars for writing a review. */
export function StarInput({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className="p-0.5 hover:scale-110 transition-transform"
        >
          <Star filled={value >= n} size="lg" />
        </button>
      ))}
    </div>
  );
}

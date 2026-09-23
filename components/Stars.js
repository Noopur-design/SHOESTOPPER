export default function Stars({ rating = 0, showValue = false }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1" title={`${rating} out of 5`}>
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${
              i < full ? "text-brand-500" : "text-line"
            }`}
            fill="currentColor"
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
          </svg>
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-medium text-muted">{rating}</span>
      )}
    </span>
  );
}

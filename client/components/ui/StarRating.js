// ============================================================
// STAR RATING COMPONENT
// ============================================================
// Displays star ratings (read-only or interactive).
// Used in reviews, listing cards, and review forms.
// ============================================================

'use client';

export default function StarRating({ rating = 0, maxStars = 5, size = 'md', interactive = false, onChange }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const starSize = sizes[size] || sizes.md;

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxStars)].map((_, index) => {
        const filled = index < Math.floor(rating);
        const half = index === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform disabled:opacity-100`}
          >
            <svg
              className={`${starSize} ${filled || half ? 'text-amber-400' : 'text-slate-200'}`}
              fill={filled ? 'currentColor' : half ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        );
      })}
      {rating > 0 && !interactive && (
        <span className="ml-1.5 text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

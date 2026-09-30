import { RatingStars } from "@/components/rating-stars";
import type { Review } from "@/data";

export function ReviewsSection({
  reviews,
  average,
}: {
  reviews: Review[];
  average: number;
}) {
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      <div className="rounded-2xl border border-border bg-brand-tint p-5">
        <p className="font-heading text-4xl font-semibold leading-none">
          {average.toFixed(1)}
        </p>
        <RatingStars rating={average} className="mt-2" size={16} />
        <p className="mt-2 text-sm text-muted-foreground">
          {reviews.length} resident {reviews.length === 1 ? "review" : "reviews"}
        </p>

        <ul className="mt-5 space-y-2">
          {distribution.map(({ star, count }) => (
            <li key={star} className="flex items-center gap-2 text-xs">
              <span className="w-3 tabular-nums text-muted-foreground">
                {star}
              </span>
              <span
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-border"
                aria-hidden
              >
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{
                    width: `${reviews.length ? (count / reviews.length) * 100 : 0}%`,
                  }}
                />
              </span>
              <span className="w-4 tabular-nums text-right text-muted-foreground">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-muted text-[12px] font-semibold text-brand-strong">
                {review.author
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="font-medium">{review.author}</span>
              <RatingStars rating={review.rating} />
              <span className="ml-auto text-xs text-muted-foreground">
                {review.date}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-[15px] font-semibold">
              {review.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
              {review.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

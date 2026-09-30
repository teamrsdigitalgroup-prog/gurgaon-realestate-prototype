import { SearchX } from "lucide-react";
import type { Listing } from "@/data";
import { PropertyCard } from "./property-card";
import { cn } from "@/lib/utils";

export function PropertyGrid({
  listings,
  className,
  emptyTitle = "No properties match these filters",
  emptyHint = "Try widening the budget or clearing the locality — or call us and we will find something off-market.",
  action,
}: {
  listings: Listing[];
  className?: string;
  emptyTitle?: string;
  emptyHint?: string;
  action?: React.ReactNode;
}) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-brand-soft">
          <SearchX className="size-5 text-brand" aria-hidden />
        </span>
        <h3 className="mt-4 font-heading text-lg font-semibold">{emptyTitle}</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{emptyHint}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6",
        className,
      )}
    >
      {listings.map((listing, index) => (
        <PropertyCard
          key={listing.id}
          listing={listing}
          priority={index < 3}
          className="animate-fade-up"
        />
      ))}
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-[4/3] animate-pulse bg-muted" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
            <div className="h-8 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

import {
  Building2,
  GraduationCap,
  Hospital,
  Plane,
  ShoppingBag,
  TrainFront,
} from "lucide-react";
import type { NearbyCategory, NearbyPlace } from "@/data";
import { formatDistance } from "@/lib/format";
import { cn } from "@/lib/utils";

const icons: Record<NearbyCategory, typeof TrainFront> = {
  Metro: TrainFront,
  School: GraduationCap,
  Hospital: Hospital,
  Mall: ShoppingBag,
  "Business Park": Building2,
  Airport: Plane,
};

export function NearbyPlaces({
  places,
  className,
  compact = false,
}: {
  places: NearbyPlace[];
  className?: string;
  compact?: boolean;
}) {
  if (places.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid gap-2.5",
        compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {places.map((place) => {
        const Icon = icons[place.category];
        return (
          <li
            key={`${place.category}-${place.name}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft">
              <Icon className="size-4 text-brand" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-medium leading-tight">
                {place.name}
              </span>
              <span className="text-[11.5px] uppercase tracking-wide text-muted-foreground">
                {place.category}
              </span>
            </span>
            <span className="shrink-0 text-[13px] font-semibold tabular-nums text-brand">
              {formatDistance(place.distanceKm)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

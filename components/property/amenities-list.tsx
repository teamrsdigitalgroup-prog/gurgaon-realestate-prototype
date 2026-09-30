import { Check } from "lucide-react";

export function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {amenities.map((amenity) => (
        <li
          key={amenity}
          className="flex items-center gap-2.5 rounded-xl bg-brand-tint px-3 py-2.5 text-[13.5px]"
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-brand-ink">
            <Check className="size-3" aria-hidden strokeWidth={3} />
          </span>
          {amenity}
        </li>
      ))}
    </ul>
  );
}

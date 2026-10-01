import { PropertyCard } from "./property-card";
import type { Listing } from "@/data";

export function SimilarProperties({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) return null;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {listings.map((listing) => (
        <li key={listing.id} className="flex">
          <PropertyCard listing={listing} className="w-full" />
        </li>
      ))}
    </ul>
  );
}

import { properties } from "./properties";
import { rentals } from "./rentals";
import type { Listing, RentListing, SaleListing } from "./types";

export * from "./types";
export { localities, localityBySlug, localityName } from "./localities";
export { properties, featuredProperties, recentlySold } from "./properties";
export { rentals, featuredRentals } from "./rentals";
export { reviews, reviewsFor, averageRating, testimonials } from "./reviews";
export { nearbyFor } from "./nearby";

export const allListings: Listing[] = [...properties, ...rentals];

export function getListing(id: string): Listing | undefined {
  return allListings.find((l) => l.id === id);
}

export function isSale(listing: Listing): listing is SaleListing {
  return listing.listingType === "sale";
}

export function isRent(listing: Listing): listing is RentListing {
  return listing.listingType === "rent";
}

/** Same locality first, then same bedroom count, capped at four cards. */
export function similarListings(listing: Listing, limit = 4): Listing[] {
  const pool = listing.listingType === "sale" ? properties : rentals;
  const sameLocality = pool.filter(
    (l) => l.id !== listing.id && l.localitySlug === listing.localitySlug,
  );
  const sameSize = pool.filter(
    (l) =>
      l.id !== listing.id &&
      l.localitySlug !== listing.localitySlug &&
      l.bhk === listing.bhk,
  );
  return [...sameLocality, ...sameSize].slice(0, limit);
}

export function listingsInLocality(slug: string): Listing[] {
  return allListings.filter((l) => l.localitySlug === slug);
}

export function propertyTypes(listings: Listing[]): string[] {
  return [...new Set(listings.map((l) => l.type))].sort();
}

export const SALE_BUDGETS = [
  { label: "Under ₹1.5 Cr", min: 0, max: 15000000 },
  { label: "₹1.5 Cr – ₹3 Cr", min: 15000000, max: 30000000 },
  { label: "₹3 Cr – ₹5 Cr", min: 30000000, max: 50000000 },
  { label: "₹5 Cr – ₹10 Cr", min: 50000000, max: 100000000 },
  { label: "Above ₹10 Cr", min: 100000000, max: Number.MAX_SAFE_INTEGER },
] as const;

export const RENT_BUDGETS = [
  { label: "Under ₹30,000", min: 0, max: 30000 },
  { label: "₹30,000 – ₹60,000", min: 30000, max: 60000 },
  { label: "₹60,000 – ₹1.5 Lakh", min: 60000, max: 150000 },
  { label: "Above ₹1.5 Lakh", min: 150000, max: Number.MAX_SAFE_INTEGER },
] as const;

export const BHK_OPTIONS = [1, 2, 3, 4] as const;

export const FURNISHING_OPTIONS = [
  "Unfurnished",
  "Semi-Furnished",
  "Fully Furnished",
] as const;

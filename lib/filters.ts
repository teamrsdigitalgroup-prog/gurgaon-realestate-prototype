import {
  RENT_BUDGETS,
  SALE_BUDGETS,
  type Listing,
  type RentListing,
  type SaleListing,
} from "@/data";
import type { RawSearchParams } from "./broker";

export type FilterValues = {
  locality: string;
  budget: string;
  bhk: string;
  type: string;
  furnishing: string;
  q: string;
};

export const EMPTY_FILTERS: FilterValues = {
  locality: "",
  budget: "",
  bhk: "",
  type: "",
  furnishing: "",
  q: "",
};

/** Keys the filter UI owns; everything else in the URL (broker, phone) is preserved. */
export const FILTER_KEYS = Object.keys(EMPTY_FILTERS) as (keyof FilterValues)[];

function one(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() ?? "";
}

export function parseFilters(searchParams: RawSearchParams): FilterValues {
  return {
    locality: one(searchParams.locality),
    budget: one(searchParams.budget),
    bhk: one(searchParams.bhk),
    type: one(searchParams.type),
    furnishing: one(searchParams.furnishing),
    q: one(searchParams.q).slice(0, 60),
  };
}

function budgetRange(mode: "sale" | "rent", index: string) {
  const buckets = mode === "sale" ? SALE_BUDGETS : RENT_BUDGETS;
  const bucket = buckets[Number(index)];
  return bucket ?? null;
}

function amountOf(listing: Listing): number {
  return listing.listingType === "sale"
    ? (listing as SaleListing).price
    : (listing as RentListing).rent;
}

export function applyFilters<T extends Listing>(
  listings: T[],
  values: FilterValues,
  mode: "sale" | "rent",
): T[] {
  const needle = values.q.toLowerCase();
  const range = values.budget ? budgetRange(mode, values.budget) : null;

  return listings.filter((listing) => {
    if (values.locality && listing.localitySlug !== values.locality) {
      return false;
    }

    if (values.type && listing.type !== values.type) return false;

    if (values.furnishing && listing.furnishing !== values.furnishing) {
      return false;
    }

    if (values.bhk) {
      const wanted = Number(values.bhk);
      // "4" means four bedrooms or more.
      const matches = wanted >= 4 ? listing.bhk >= 4 : listing.bhk === wanted;
      if (!matches) return false;
    }

    if (range) {
      const amount = amountOf(listing);
      if (amount < range.min || amount >= range.max) return false;
    }

    if (needle) {
      const haystack = [
        listing.title,
        listing.society,
        listing.localitySlug.replace(/-/g, " "),
        listing.type,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });
}

export type SortKey = "relevance" | "price-asc" | "price-desc" | "area-desc";

export function sortListings<T extends Listing>(listings: T[], key: SortKey): T[] {
  const copy = [...listings];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => amountOf(a) - amountOf(b));
    case "price-desc":
      return copy.sort((a, b) => amountOf(b) - amountOf(a));
    case "area-desc":
      return copy.sort((a, b) => b.areaSqft - a.areaSqft);
    default:
      return copy.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      );
  }
}

export type PropertyType =
  | "Apartment"
  | "Builder Floor"
  | "Independent House"
  | "Villa"
  | "Plot"
  | "Office Space"
  | "Retail Shop"
  | "Studio";

export type Furnishing = "Unfurnished" | "Semi-Furnished" | "Fully Furnished";

export type PossessionStatus =
  | "Ready to Move"
  | "Under Construction"
  | "New Launch";

export type NearbyCategory =
  | "Metro"
  | "School"
  | "Hospital"
  | "Mall"
  | "Business Park"
  | "Airport";

export type NearbyPlace = {
  name: string;
  category: NearbyCategory;
  distanceKm: number;
};

export type FloorPlanRoom = {
  label: string;
  areaSqft: number;
};

type BaseListing = {
  id: string;
  title: string;
  society: string;
  localitySlug: string;
  type: PropertyType;
  bhk: number;
  bathrooms: number;
  balconies: number;
  areaSqft: number;
  carpetAreaSqft: number;
  furnishing: Furnishing;
  facing: string;
  floor: string;
  images: string[];
  description: string;
  amenities: string[];
  highlights: string[];
  floorPlan: FloorPlanRoom[];
  nearby: NearbyPlace[];
  verified: boolean;
  featured?: boolean;
  parking: number;
};

export type SaleListing = BaseListing & {
  listingType: "sale";
  price: number;
  status: PossessionStatus;
  possession: string;
  ageYears: number;
  rera: string;
};

export type RentListing = BaseListing & {
  listingType: "rent";
  rent: number;
  deposit: number;
  maintenance: number;
  availableFrom: string;
  preferredTenant: string;
  minimumLease: string;
};

export type Listing = SaleListing | RentListing;

export type Locality = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  avgPricePerSqft: number;
  avgRent2Bhk: number;
  image: string;
  tags: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  listingId: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  locality: string;
  rating: number;
  quote: string;
  avatarInitials: string;
};

export type SoldListing = {
  id: string;
  title: string;
  localitySlug: string;
  areaSqft: number;
  price: number;
  soldIn: string;
  dealType: "Sold" | "Rented Out" | "Under Offer";
  image: string;
};

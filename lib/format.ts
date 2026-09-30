const CRORE = 10_000_000;
const LAKH = 100_000;

/** 24500000 -> "₹2.45 Cr", 8500000 -> "₹85 Lakh" */
export function formatPrice(rupees: number): string {
  if (rupees >= CRORE) {
    const crore = rupees / CRORE;
    const value = crore >= 10 ? crore.toFixed(1) : crore.toFixed(2);
    return `₹${trimZeros(value)} Cr`;
  }
  if (rupees >= LAKH) {
    const lakh = rupees / LAKH;
    return `₹${trimZeros(lakh.toFixed(2))} Lakh`;
  }
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/** 65000 -> "₹65,000/month" */
export function formatRent(rupees: number): string {
  return `₹${rupees.toLocaleString("en-IN")}/month`;
}

/** Compact rent for tight cards: 65000 -> "₹65K/mo" */
export function formatRentShort(rupees: number): string {
  if (rupees >= LAKH) return `₹${trimZeros((rupees / LAKH).toFixed(2))} L/mo`;
  if (rupees >= 1000) return `₹${trimZeros((rupees / 1000).toFixed(1))}K/mo`;
  return `₹${rupees.toLocaleString("en-IN")}/mo`;
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-IN")} sq ft`;
}

export function formatPricePerSqft(rupees: number, sqft: number): string {
  return `₹${Math.round(rupees / sqft).toLocaleString("en-IN")}/sq ft`;
}

export function formatDeposit(rupees: number): string {
  return formatPrice(rupees).replace("₹", "₹");
}

export function formatBhk(bhk: number): string {
  return bhk > 0 ? `${bhk} BHK` : "Commercial";
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${trimZeros(km.toFixed(1))} km`;
}

function trimZeros(value: string): string {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

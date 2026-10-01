import { photo } from "@/lib/images";
import type { Locality } from "./types";

export const localities: Locality[] = [
  {
    slug: "dlf-phase-1",
    name: "DLF Phase 1",
    tagline: "Old-money bungalows, new-money builder floors",
    description:
      "Gurgaon's first planned colony, full of wide tree-lined roads, independent kothis and renovated builder floors. Popular with families who want low-rise living without leaving the city centre.",
    avgPricePerSqft: 18500,
    avgRent2Bhk: 48000,
    image: photo("photo-1571939228382-b2f2b585ce15", 900, 700),
    tags: ["Low-rise", "Families", "Central"],
  },
  {
    slug: "dlf-phase-2",
    name: "DLF Phase 2",
    tagline: "Walk to Cyber Hub, sleep in a quiet block",
    description:
      "Wedged between Cyber City and MG Road, Phase 2 mixes gated apartment pockets like Silver Oaks with independent floors. The shortest office commute in Gurgaon.",
    avgPricePerSqft: 17200,
    avgRent2Bhk: 52000,
    image: photo("photo-1512915922686-57c11dde9b6b", 900, 700),
    tags: ["Short commute", "Rentals", "Metro"],
  },
  {
    slug: "dlf-phase-3",
    name: "DLF Phase 3",
    tagline: "The rental engine of the city",
    description:
      "Dense, walkable and endlessly rented. Phase 3 is where most Cyber City professionals land first, thanks to compact builder floors and the Rapid Metro on its edge.",
    avgPricePerSqft: 14800,
    avgRent2Bhk: 42000,
    image: photo("photo-1545324418-cc1a3fa10c00", 900, 700),
    tags: ["Budget", "Bachelors", "High yield"],
  },
  {
    slug: "dlf-phase-4",
    name: "DLF Phase 4",
    tagline: "Galleria market on one side, parks on the other",
    description:
      "Societies like Ridgewood Estate and Windsor Court sit minutes from Galleria Market. A settled, green pocket that holds resale value stubbornly well.",
    avgPricePerSqft: 16400,
    avgRent2Bhk: 50000,
    image: photo("photo-1523217582562-09d0def993a6", 900, 700),
    tags: ["Green", "Resale", "Markets"],
  },
  {
    slug: "dlf-phase-5",
    name: "DLF Phase 5",
    tagline: "Gurgaon's premium address",
    description:
      "The Magnolias, The Aralias, The Camellias and The Belaire — golf-facing towers with concierge service and the highest per-square-foot rates in the NCR.",
    avgPricePerSqft: 32000,
    avgRent2Bhk: 85000,
    image: photo("photo-1564013799919-ab600027ffc6", 900, 700),
    tags: ["Luxury", "Golf view", "Concierge"],
  },
  {
    slug: "golf-course-road",
    name: "Golf Course Road",
    tagline: "Eight lanes of signal-free luxury",
    description:
      "The spine of premium Gurgaon. Signal-free from Sector 42 to Sector 56, lined with high-rise condominiums, Sector 53 metro and every major hospital chain.",
    avgPricePerSqft: 26500,
    avgRent2Bhk: 72000,
    image: photo("photo-1568605114967-8130f3a36994", 900, 700),
    tags: ["Signal-free", "Premium", "Metro"],
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    tagline: "Best value per square foot inside the city",
    description:
      "A long stretch of mid-premium societies, schools and hospitals running south from Subhash Chowk. The sweet spot for first-time buyers who still want a clubhouse.",
    avgPricePerSqft: 12800,
    avgRent2Bhk: 32000,
    image: photo("photo-1574362848149-11496d93a7c7", 900, 700),
    tags: ["Value", "First home", "Schools"],
  },
  {
    slug: "sector-56",
    name: "Sector 56",
    tagline: "Old Gurgaon comfort at the end of Golf Course Road",
    description:
      "Hamilton Court, Heritage City and Central Park sit around a well-served market. Established, walkable and noticeably cheaper than Golf Course Road proper.",
    avgPricePerSqft: 13600,
    avgRent2Bhk: 38000,
    image: photo("photo-1600596542815-ffad4c1539a9", 900, 700),
    tags: ["Established", "Walkable", "Markets"],
  },
  {
    slug: "sector-82",
    name: "Sector 82",
    tagline: "New Gurgaon, built wide and planned properly",
    description:
      "Part of the New Gurgaon belt off NH-48. Vatika India Next and Mahindra Aura brought townships, schools and retail to what was farmland fifteen years ago.",
    avgPricePerSqft: 9600,
    avgRent2Bhk: 24000,
    image: photo("photo-1600047509807-ba8f99d2cdde", 900, 700),
    tags: ["Affordable", "Townships", "NH-48"],
  },
  {
    slug: "cyber-city",
    name: "Cyber City",
    tagline: "Where the rent cheques come from",
    description:
      "DLF Cyber City and Cyber Hub hold the densest concentration of Fortune 500 offices in North India. Commercial floor plates and studios for people who refuse to commute.",
    avgPricePerSqft: 24000,
    avgRent2Bhk: 68000,
    image: photo("photo-1519999482648-25049ddd37b1", 900, 700),
    tags: ["Commercial", "Offices", "Nightlife"],
  },
  {
    slug: "mg-road",
    name: "MG Road",
    tagline: "Metro at the door, malls on the strip",
    description:
      "Gurgaon's original retail corridor with direct Delhi Metro access. Essel Towers and The Crescent offer big old apartments; the high street offers footfall no new sector can match.",
    avgPricePerSqft: 15200,
    avgRent2Bhk: 45000,
    image: photo("photo-1600563438938-a9a27216b4f5", 900, 700),
    tags: ["Metro", "Retail", "Delhi access"],
  },
  {
    slug: "nirvana-country",
    name: "Nirvana Country",
    tagline: "Villas behind a single gate",
    description:
      "A self-contained villa township off Sohna Road with its own schools, market plaza and clubs. The default answer when a family wants a garden and a gate.",
    avgPricePerSqft: 16800,
    avgRent2Bhk: 55000,
    image: photo("photo-1570129477492-45c003edd2be", 900, 700),
    tags: ["Villas", "Township", "Families"],
  },
  {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    tagline: "The corridor everyone is betting on",
    description:
      "Now that the expressway is open end to end, Sectors 102 to 113 have become the fastest-appreciating belt in Gurgaon, with brand-new towers and the shortest run to IGI Airport.",
    avgPricePerSqft: 14500,
    avgRent2Bhk: 34000,
    image: photo("photo-1600047509358-9dc75507daeb", 900, 700),
    tags: ["Appreciation", "New builds", "Airport"],
  },
  {
    slug: "southern-peripheral-road",
    name: "Southern Peripheral Road",
    tagline: "Golf Course Extension without the price tag",
    description:
      "SPR links Golf Course Extension to NH-48 past Sectors 69 to 71. Emaar, Vatika and Tulip built large gated communities here with genuine open space.",
    avgPricePerSqft: 13900,
    avgRent2Bhk: 36000,
    image: photo("photo-1613977257363-707ba9348227", 900, 700),
    tags: ["Gated", "Open space", "Connectivity"],
  },
];

export const localityBySlug = new Map(localities.map((l) => [l.slug, l]));

export function localityName(slug: string): string {
  return localityBySlug.get(slug)?.name ?? slug;
}

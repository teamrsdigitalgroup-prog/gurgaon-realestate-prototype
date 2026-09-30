import type { Review, Testimonial } from "./types";

export const reviews: Review[] = [
  {
    id: "rv-1",
    author: "Ankit Malhotra",
    rating: 5,
    date: "August 2026",
    title: "Exactly as described on the listing",
    body: "Saw four apartments in this tower over two weekends and this was the only one where the photos matched reality. The society club and pool are genuinely maintained, and the lift lobby was spotless on both visits.",
    listingId: "the-magnolias-4bhk-golf-facing",
  },
  {
    id: "rv-2",
    author: "Divya Krishnan",
    rating: 4,
    date: "July 2026",
    title: "Great building, road noise on lower floors",
    body: "We live two floors below and the layout is excellent for a family. Only note for buyers: floors below the eighth pick up some noise from the service road, so go as high as your budget allows.",
    listingId: "the-belaire-3bhk-high-floor",
  },
  {
    id: "rv-3",
    author: "Rohit Sabharwal",
    rating: 5,
    date: "September 2026",
    title: "Metro at the gate changed our commute",
    body: "Moved here from Sohna Road last year. Having the metro station a two-minute walk away has cut forty minutes out of my day, each way. The internal green is quieter than I expected given the main road.",
    listingId: "park-place-3bhk-tower-c",
  },
  {
    id: "rv-4",
    author: "Meenakshi Rao",
    rating: 5,
    date: "June 2026",
    title: "The terrace sold it for us",
    body: "We had been looking for a duplex with usable outdoor space for almost a year. The terrace here is large enough to actually host on, and the ridge view in the evenings is worth the premium over the lower floors.",
    listingId: "ireo-victory-valley-4bhk",
  },
  {
    id: "rv-5",
    author: "Sandeep Chauhan",
    rating: 4,
    date: "August 2026",
    title: "Solid rental yield, as promised",
    body: "Bought a similar unit here in 2023 as an investment. Housekeeping and concierge being part of maintenance means it rents out fast; mine has never sat empty for more than a month.",
    listingId: "central-park-resorts-2bhk",
  },
  {
    id: "rv-6",
    author: "Nidhi Aggarwal",
    rating: 5,
    date: "July 2026",
    title: "Low density is real here",
    body: "Compared this against three towers on Golf Course Extension. Palm Gardens has noticeably more open space per family and the lawns are actually watered. The study is a genuine room, not a corner of the living area.",
    listingId: "emaar-palm-gardens-3bhk",
  },
  {
    id: "rv-7",
    author: "Vikram Bhatia",
    rating: 4,
    date: "May 2026",
    title: "Best square footage for the money",
    body: "Nothing on Golf Course Road gives you 2,900 sq ft at this price. The building is eleven years old so expect to spend on bathrooms, but the structure and plumbing are sound.",
    listingId: "vipul-belmonte-4bhk",
  },
  {
    id: "rv-8",
    author: "Preeti Sharma",
    rating: 5,
    date: "September 2026",
    title: "Good first home for a young family",
    body: "We bought our first flat in this project two years ago. School is a walk away, the club works, and the society has a sensible RWA. For under ₹1.7 Cr in Gurgaon, this is hard to beat.",
    listingId: "tulip-ivory-3bhk",
  },
  {
    id: "rv-9",
    author: "Arjun Mehra",
    rating: 5,
    date: "August 2026",
    title: "Trees you cannot buy in a new sector",
    body: "The tree cover in Hamilton Court is the reason we chose it over a newer building in Sector 65. Renovated units here come up rarely, so move quickly if the layout suits you.",
    listingId: "hamilton-court-3bhk",
  },
  {
    id: "rv-10",
    author: "Kavita Suri",
    rating: 4,
    date: "June 2026",
    title: "Lives like an independent house",
    body: "The duplex arrangement gives you separation between the living level and bedrooms, which is unusual in Gurgaon apartments. Terrace needs waterproofing attention every few years.",
    listingId: "heritage-city-4bhk",
  },
  {
    id: "rv-11",
    author: "Harpreet Singh",
    rating: 4,
    date: "July 2026",
    title: "New Gurgaon is finally functional",
    body: "Five years ago I would not have recommended Sector 82. The township market, school and roads are all working now, and prices are still well below the city centre.",
    listingId: "vatika-india-next-2bhk",
  },
  {
    id: "rv-12",
    author: "Shalini Verma",
    rating: 5,
    date: "September 2026",
    title: "Build quality stands out",
    body: "We compared four projects in this belt. Mahindra's finishing, lift lobbies and landscaping are a clear step above the others at similar pricing. Park-facing units are worth the extra.",
    listingId: "mahindra-aura-3bhk",
  },
  {
    id: "rv-13",
    author: "Deepak Nair",
    rating: 5,
    date: "August 2026",
    title: "Sobha quality is not a marketing line",
    body: "I inspected the site three times during construction. The concrete work and joinery are visibly better than neighbouring projects on the expressway. Worth the wait to 2027.",
    listingId: "sobha-city-3bhk",
  },
  {
    id: "rv-14",
    author: "Ritu Khanna",
    rating: 4,
    date: "June 2026",
    title: "Finished project, no possession risk",
    body: "The main reason we chose Emerald Bay was that it was actually complete and occupied. The club works, landscaping has grown in, and the expressway entry is genuinely close.",
    listingId: "puri-emerald-bay-4bhk",
  },
  {
    id: "rv-15",
    author: "Gaurav Tandon",
    rating: 5,
    date: "September 2026",
    title: "The township makes it worth it",
    body: "Our children walk to school inside the gate. That single fact is why we will not move out of Nirvana Country. Villas with corner plots and lawns come up two or three times a year at most.",
    listingId: "nirvana-espace-villa-4bhk",
  },
  {
    id: "rv-16",
    author: "Anjali Bose",
    rating: 5,
    date: "July 2026",
    title: "Low-rise Gurgaon still exists",
    body: "Four floors, old trees and Galleria Market on foot. We looked for two years before a Ridgewood unit came to market. Do not expect modern lift lobbies; do expect a real neighbourhood.",
    listingId: "ridgewood-estate-3bhk",
  },
  {
    id: "rv-17",
    author: "Manav Grover",
    rating: 5,
    date: "August 2026",
    title: "New construction, honest paperwork",
    body: "The builder handed over on schedule with all the fittings that were promised in writing. Stilt parking is registered, which matters more than buyers realise in Phase 1.",
    listingId: "dlf-phase-1-builder-floor-3bhk",
  },
  {
    id: "rv-18",
    author: "Sunita Iyer",
    rating: 4,
    date: "June 2026",
    title: "Tenanted from day one",
    body: "We hold two floors in this building. Cyber City commands rent that no other micro-market in Gurgaon can, and vacancy periods are measured in weeks, not months.",
    listingId: "cyber-city-office-floor",
  },
  {
    id: "rv-19",
    author: "Rajeev Dhawan",
    rating: 5,
    date: "September 2026",
    title: "Frontage is everything on MG Road",
    body: "Twenty-two feet of glass on the main carriageway is what you are paying for, and it is worth it. Footfall from the metro station carries through the evening.",
    listingId: "mg-road-retail-shop",
  },
  {
    id: "rv-20",
    author: "Pooja Malik",
    rating: 4,
    date: "July 2026",
    title: "Clean title, which is rare for plots",
    body: "We had our lawyer run the chain of title before paying a rupee. Everything was in order and the colony is properly licensed. Services were already at the boundary as claimed.",
    listingId: "sector-82-residential-plot",
  },
];

/** Every listing shows reviews; specific ones first, then a shared pool. */
const fallbackPool: Omit<Review, "listingId">[] = [
  {
    id: "rv-f1",
    author: "Neha Chopra",
    rating: 5,
    date: "August 2026",
    title: "Honest listing, no surprises on site",
    body: "The measurements and the maintenance figure were both accurate, which saved us a wasted visit. Paperwork was shared before we asked for it.",
  },
  {
    id: "rv-f2",
    author: "Siddharth Menon",
    rating: 4,
    date: "July 2026",
    title: "Well-kept society, helpful RWA",
    body: "Visited on a weekday evening to see how the parking and security actually work. Both were fine. Water supply is twice a day, which is normal for this pocket.",
  },
  {
    id: "rv-f3",
    author: "Ishita Bansal",
    rating: 5,
    date: "June 2026",
    title: "Good value for this micro-market",
    body: "We compared six options within two kilometres. This came out best on price per square foot for the condition of the unit.",
  },
];

export function reviewsFor(listingId: string): Review[] {
  const specific = reviews.filter((r) => r.listingId === listingId);
  const filler = fallbackPool
    .slice(0, Math.max(0, 3 - specific.length))
    .map((r) => ({ ...r, id: `${r.id}-${listingId}`, listingId }));
  return [...specific, ...filler];
}

export function averageRating(listingId: string): number {
  const list = reviewsFor(listingId);
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / list.length) * 10) / 10;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    author: "Aditya Raghavan",
    role: "Bought a 3 BHK",
    locality: "Golf Course Road",
    rating: 5,
    quote:
      "I had shortlisted eleven apartments online. Six were already sold and three did not exist. Every single property I was shown here was real, available and priced the way it was advertised.",
    avatarInitials: "AR",
  },
  {
    id: "t-2",
    author: "Swati Deshmukh",
    role: "Sold a builder floor",
    locality: "DLF Phase 3",
    rating: 5,
    quote:
      "My floor had been on the market for seven months with another agent. It sold in five weeks here, and at two lakh above the price I had been told to expect.",
    avatarInitials: "SD",
  },
  {
    id: "t-3",
    author: "Faisal Qureshi",
    role: "Rented a 2 BHK",
    locality: "Sohna Road",
    rating: 5,
    quote:
      "Relocated from Bengaluru with two weeks' notice. Four options were arranged in one afternoon, the agreement was drafted the same evening, and nobody asked me for a brokerage advance.",
    avatarInitials: "FQ",
  },
  {
    id: "t-4",
    author: "Lakshmi Pillai",
    role: "Bought a villa",
    locality: "Nirvana Country",
    rating: 5,
    quote:
      "What I valued most was being told which two properties not to buy, and why. That kind of advice is not what you normally get from a broker in this city.",
    avatarInitials: "LP",
  },
  {
    id: "t-5",
    author: "Karan Bajaj",
    role: "Investor, three purchases",
    locality: "Dwarka Expressway",
    rating: 5,
    quote:
      "I have bought three units on this corridor over four years on the same advice. The rental projections I was given have been accurate to within about five per cent each time.",
    avatarInitials: "KB",
  },
  {
    id: "t-6",
    author: "Ritika Sood",
    role: "First-time buyer",
    locality: "Sector 82",
    rating: 4,
    quote:
      "I knew nothing about circle rates, stamp duty or loan sanction letters. Everything was explained twice, patiently, without pushing me towards a bigger flat than I could afford.",
    avatarInitials: "RS",
  },
];

# Gurgaon Real Estate Broker Prototype

A personalised demo website for real estate brokers in Gurgaon. Send a broker a
link with their name in the URL and the whole site — logo, headings, page titles,
buttons, testimonials, footer — reads as if it were already their own website.

```
https://your-deployment.vercel.app/?broker=Sharma%20Properties
```

Built with Next.js (App Router), TypeScript and Tailwind CSS. No backend and no
database: every listing, review and testimonial is local mock data in `/data`.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 and try a personalised URL:

```
http://localhost:3000/?broker=Sharma%20Properties&phone=9811122233&color=%23b4551f
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Personalisation

Everything is driven by three optional query parameters. They are read on the
server, so the broker's name and colour are in the very first HTML response —
there is no flash of placeholder branding, and the page `<title>` is personalised
too.

| Parameter | Example | Effect |
| --- | --- | --- |
| `broker` | `?broker=Sharma%20Properties` | Name in the navbar, hero, footer, page titles, buttons, testimonials and forms. The logo mark uses the initials, so "Sharma Properties" becomes `SP`. |
| `phone` | `&phone=9811122233` | Powers every Call and WhatsApp link. Accepts 10 digits, with or without `+91`. |
| `color` | `&color=%23b4551f` | Brand colour as a hex value (URL-encode `#` as `%23`). Three- and six-digit hex both work, and button text flips between white and near-black automatically to stay readable. |

With no parameters the site falls back to the broker configured in `config.ts`
(currently Radisson Estate), so a bare link is always presentable.

### How the name persists between pages

Three mechanisms, in order:

1. Pages read the parameters on the server, so the first paint is correct.
2. `BrokerLink` appends the current parameters to every internal link, so
   clicking Buy or Rent keeps the branding.
3. The identity is saved to `localStorage`. If someone lands on an inner page
   with no parameters — a pasted bare URL, say — the stored identity is restored
   and the URL is rewritten to match.

Invalid input is handled rather than trusted: names are whitespace-collapsed and
capped at 48 characters, phone numbers must be 10 digits or the default is used,
and a malformed colour falls back to the default brand colour.

## One deployment, one client per link

`clients.json` at the repo root maps a short client id to a name, an address and
a phone number:

```json
{
  "default": {
    "name": "Radisson Estate",
    "address": "Golf Course Road, Sector 54, Gurugram 122002, Haryana",
    "phone": "+919999999999"
  },
  "rawat-street": { "name": "Rawat Street" },
  "gurugram-landbase": {
    "name": "Gurugram Landbase",
    "address": "Plot No. 94, Sector 110, Dwarka Expressway, Gurugram 122017",
    "phone": "+919792069206"
  }
}
```

Visiting `/?c=gurugram-landbase` renders those details everywhere the site shows
them: nav wordmark and Contact button, hero heading and Talk-to button, section
headings, forms, footer office block, the contact section, property enquiry
panels, `<title>` and the meta description. No `c` parameter, or an id that is
not in the file, falls back to the `default` entry — so the plain link keeps
showing the same details it always did.

Only `name` is required. A client with no `address` or `phone` — like
`rawat-street` above — simply has those elements hidden: the Call and WhatsApp
buttons and the office address disappear instead of falling back to another
client's details, so a half-filled entry can never dial a competitor.

### Adding a client

1. Add one entry to `clients.json`. The id is the name in lowercase with
   hyphens, and the phone is stored as `+91` plus 10 digits:

```json
"sharma-realty": {
  "name": "Sharma Realty",
  "address": "Sector 54, Gurugram 122002",
  "phone": "+919876543210"
}
```

2. Commit and push to `main`. Cloudflare rebuilds the Worker.
3. Send `https://<your-worker>/?c=sharma-realty`.

That is the only file you need to touch — `.cursor/rules/add-client.mdc` holds
the same instructions for an agent, including how to read a pasted tab-separated
spreadsheet row (columns 1–3 are name, address, phone; the rest are ignored).

`lib/clients.ts` imports the JSON at build time and `resolveBroker` in
`lib/broker.ts` reads the `c` parameter on the server, so the details are in the
first byte of HTML and never flash the previous client's. The same file is also
published at `/clients.json` (copied into `public/` by
`scripts/sync-clients-asset.mjs` before every dev run and build), which is a
quick way to confirm a new client reached the live bundle.

The rendered name carries a `data-company` attribute on the nav wordmark, hero
heading and footer, and the address carries `data-company-address`, so both are
easy to find and to assert against.

## Editing the demo for your own agency

Open `config.ts`. That one file holds everything you need to change:

```ts
export const AGENCY_WHATSAPP = "91XXXXXXXXXX"; // your number for the sticky banner
export const AGENCY_NAME = "R&S Digital Group";
export const DEFAULT_BRAND_COLOR = "#0e7c66";
export const DEMO_BANNER_TEXT =
  "This is a demo prototype for {broker}. Want your own website like this?";
```

**Replace `AGENCY_WHATSAPP` with your real number before sending this to
anyone** — the sticky banner at the bottom of every page links to
`https://wa.me/<AGENCY_WHATSAPP>`, and `{broker}` in the banner text is swapped
for the broker's name at render time.

## Project structure

```
app/
  page.tsx              Home: hero, Buy/Sell/Rent cards, featured, localities,
                        why choose us, testimonials, contact strip
  buy/                  Sale listings with locality/budget/BHK/type filters
  rent/                 Rentals with furnishing filter and nearby places
  sell/                 Listing form with success state + recently closed deals
  property/[id]/        Gallery, specs, amenities, floor plan, map, reviews,
                        similar properties, enquiry form
  contact/              About the broker, FAQs, contact form
components/
  broker/               Provider, context, initials logo, params-preserving link
  layout/               Navbar, footer, sticky demo banner, page shell
  property/             Cards, filters, gallery, reviews, map, nearby places
  forms/                Enquiry form, list-your-property form
  ui/                   shadcn/ui primitives
data/                   Mock listings, localities, reviews, testimonials
lib/                    Broker resolution, INR formatting, filters, image URLs
config.ts               Everything you edit per agency
```

## Mock data

`/data` holds 22 properties for sale and 12 rentals across 14 real Gurgaon
micro-markets — DLF Phases 1 to 5, Golf Course Road, Sohna Road, Sector 56,
Sector 82, Cyber City, MG Road, Nirvana Country, Dwarka Expressway and Southern
Peripheral Road — with real society names, prices in crore/lakh, per-locality
landmarks and distances, 20 reviews and 6 testimonials.

To add a listing, append an entry to the `seeds` array in `data/properties.ts`
(or `data/rentals.ts`). Images come from Unsplash via `lib/images.ts`, which
groups photo ids by what they actually show — towers, modern blocks, villas,
interiors — so an apartment never leads with a photo of a cottage. The hero is
picked from the pool matching the listing's `type`, counted per pool so no two
cards in a grid repeat. `images.unsplash.com` is already whitelisted in
`next.config.ts`.

Prices are stored as plain rupee integers. `lib/format.ts` turns them into
`₹2.45 Cr`, `₹85 Lakh` or `₹65,000/month`.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Accept the defaults — Vercel detects Next.js, and there are no environment
   variables or secrets to configure.
4. Deploy, then share personalised links:
   `https://<your-project>.vercel.app/?broker=Sharma%20Properties`

Pages are server-rendered on demand because they read query parameters, so every
broker link is generated fresh and no cache needs clearing between prospects.

## Notes

- Forms are front-end only. They validate input and show a success state, but
  nothing is submitted anywhere.
- `robots` is set to `noindex` in `app/layout.tsx`, since these are prospecting
  demos rather than pages you want in search results.
- Listings, prices, reviews and track record figures are sample data, and the
  footer says so on every page.

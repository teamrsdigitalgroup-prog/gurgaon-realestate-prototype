import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  BedDouble,
  Building,
  CalendarClock,
  Car,
  Compass,
  FileBadge,
  Layers,
  Maximize,
  Ruler,
  Sofa,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrokerLink } from "@/components/broker/broker-link";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SiteShell } from "@/components/layout/site-shell";
import { RatingStars } from "@/components/rating-stars";
import { AmenitiesList } from "@/components/property/amenities-list";
import { ContactActions } from "@/components/property/contact-actions";
import { FloorPlan } from "@/components/property/floor-plan";
import { Gallery } from "@/components/property/gallery";
import { MapPlaceholder } from "@/components/property/map-placeholder";
import { NearbyPlaces } from "@/components/property/nearby-places";
import { ReviewsSection } from "@/components/property/reviews-section";
import { SimilarProperties } from "@/components/property/similar-properties";
import {
  averageRating,
  getListing,
  localityName,
  reviewsFor,
  similarListings,
} from "@/data";
import { pageTitle, resolveBroker } from "@/lib/broker";
import {
  formatArea,
  formatPrice,
  formatPricePerSqft,
  formatRent,
} from "@/lib/format";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/property/[id]">): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) return { title: "Property not found" };

  const broker = resolveBroker(await searchParams);
  const price =
    listing.listingType === "sale"
      ? formatPrice(listing.price)
      : formatRent(listing.rent);

  return {
    title: pageTitle(
      broker,
      `${listing.title} — ${localityName(listing.localitySlug)}`,
    ),
    description: `${listing.title} at ${listing.society}, ${localityName(listing.localitySlug)}. ${formatArea(listing.areaSqft)} at ${price}. Listed by ${broker.name}.`,
  };
}

export default async function PropertyPage({
  params,
  searchParams,
}: PageProps<"/property/[id]">) {
  // Resolve the id before touching searchParams: awaiting searchParams opts the
  // route into streaming, which commits a 200 before notFound() can run.
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  const broker = resolveBroker(await searchParams);
  const locality = localityName(listing.localitySlug);
  const isSale = listing.listingType === "sale";
  const reviews = reviewsFor(listing.id);
  const rating = averageRating(listing.id);
  const similar = similarListings(listing);

  const specs = [
    {
      icon: BedDouble,
      label: "Bedrooms",
      value: listing.bhk > 0 ? `${listing.bhk} BHK` : "Commercial",
    },
    { icon: Bath, label: "Bathrooms", value: `${listing.bathrooms}` },
    { icon: Maximize, label: "Built-up area", value: formatArea(listing.areaSqft) },
    { icon: Ruler, label: "Carpet area", value: formatArea(listing.carpetAreaSqft) },
    { icon: Sofa, label: "Furnishing", value: listing.furnishing },
    { icon: Compass, label: "Facing", value: listing.facing },
    { icon: Layers, label: "Floor", value: listing.floor },
    { icon: Car, label: "Parking", value: `${listing.parking} covered` },
  ];

  const commercials = isSale
    ? [
        { icon: Building, label: "Status", value: listing.status },
        { icon: CalendarClock, label: "Possession", value: listing.possession },
        {
          icon: Users,
          label: "Age",
          value: listing.ageYears === 0 ? "New build" : `${listing.ageYears} years`,
        },
        { icon: FileBadge, label: "RERA", value: listing.rera },
      ]
    : [
        {
          icon: Building,
          label: "Maintenance",
          value:
            listing.maintenance > 0
              ? `${formatRent(listing.maintenance).replace("/month", "")} / month`
              : "Not applicable",
        },
        {
          icon: CalendarClock,
          label: "Available from",
          value: listing.availableFrom,
        },
        { icon: Users, label: "Preferred tenant", value: listing.preferredTenant },
        { icon: FileBadge, label: "Minimum lease", value: listing.minimumLease },
      ];

  return (
    <SiteShell broker={broker}>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <BrokerLink
          href={isSale ? "/buy" : "/rent"}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-brand"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to {isSale ? "properties for sale" : "rentals"}
        </BrokerLink>
      </div>

      <article className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-brand">
                {listing.type}
              </span>
              {listing.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  <BadgeCheck className="size-3.5" aria-hidden />
                  Verified listing
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                <RatingStars rating={rating} size={13} />
                {rating.toFixed(1)} · {reviews.length} reviews
              </span>
            </div>

            <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.25rem]">
              {listing.title}
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              {listing.society}, {locality}, Gurgaon
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="font-heading text-2xl font-semibold text-brand sm:text-3xl">
              {isSale ? formatPrice(listing.price) : formatRent(listing.rent)}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {isSale
                ? formatPricePerSqft(listing.price, listing.areaSqft)
                : `Deposit ${formatPrice(listing.deposit)}`}
            </p>
          </div>
        </header>

        <div className="mt-7 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Gallery images={listing.images} title={listing.title} />

            <section className="mt-10" aria-labelledby="specs-heading">
              <h2 id="specs-heading" className="font-heading text-xl font-semibold">
                Property details
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.label}
                      className="min-w-0 rounded-xl border border-border bg-card p-3.5"
                    >
                      <dt className="flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground">
                        <Icon className="size-3.5 text-brand" aria-hidden />
                        {spec.label}
                      </dt>
                      <dd className="mt-1.5 break-words text-[14px] font-medium">
                        {spec.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {commercials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="min-w-0 rounded-xl bg-brand-tint p-3.5"
                    >
                      <dt className="flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground">
                        <Icon className="size-3.5 text-brand" aria-hidden />
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 break-words text-[14px] font-medium">
                        {item.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>

            <section className="mt-10" aria-labelledby="about-heading">
              <h2 id="about-heading" className="font-heading text-xl font-semibold">
                About this property
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {listing.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {listing.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5 text-[14.5px]">
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10" aria-labelledby="amenities-heading">
              <h2
                id="amenities-heading"
                className="font-heading text-xl font-semibold"
              >
                Amenities
              </h2>
              <div className="mt-4">
                <AmenitiesList amenities={listing.amenities} />
              </div>
            </section>

            <section className="mt-10" aria-labelledby="floor-plan-heading">
              <h2
                id="floor-plan-heading"
                className="font-heading text-xl font-semibold"
              >
                Floor plan
              </h2>
              <div className="mt-4">
                <FloorPlan
                  rooms={listing.floorPlan}
                  totalSqft={listing.areaSqft}
                  carpetSqft={listing.carpetAreaSqft}
                />
              </div>
            </section>

            <section className="mt-10" aria-labelledby="location-heading">
              <h2
                id="location-heading"
                className="font-heading text-xl font-semibold"
              >
                Location and what is nearby
              </h2>
              <div className="mt-4">
                <MapPlaceholder society={listing.society} locality={locality} />
              </div>
              <div className="mt-4">
                <NearbyPlaces places={listing.nearby} />
              </div>
            </section>

            <section className="mt-12" aria-labelledby="reviews-heading">
              <h2
                id="reviews-heading"
                className="font-heading text-xl font-semibold"
              >
                Reviews and ratings
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                From residents and buyers in {listing.society} and {locality}.
              </p>
              <div className="mt-6">
                <ReviewsSection reviews={reviews} average={rating} />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="font-heading text-2xl font-semibold text-brand">
                {isSale ? formatPrice(listing.price) : formatRent(listing.rent)}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {isSale
                  ? `${formatPricePerSqft(listing.price, listing.areaSqft)} · ${listing.status}`
                  : `Deposit ${formatPrice(listing.deposit)} · ${listing.furnishing}`}
              </p>

              <ContactActions
                className="mt-5"
                context={`${listing.title} at ${listing.society}, ${locality}`}
              />

              <p className="mt-3 text-center text-xs text-muted-foreground">
                {broker.name}
                {broker.phoneDisplay ? ` · ${broker.phoneDisplay}` : ""}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <h2 className="font-heading text-[17px] font-semibold">
                  Request a site visit
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Usually arranged within 24 hours.
                </p>
                <EnquiryForm
                  compact
                  className="mt-4"
                  context={`${listing.title} at ${listing.society}`}
                />
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16" aria-labelledby="similar-heading">
            <h2 id="similar-heading" className="font-heading text-xl font-semibold">
              Similar properties
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Comparable options in {locality} and nearby micro-markets.
            </p>
            <div className="mt-6">
              <SimilarProperties listings={similar} />
            </div>
          </section>
        )}
      </article>
    </SiteShell>
  );
}

"use client";

import {
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  GraduationCap,
  Hospital,
  Maximize,
  MapPin,
  Plane,
  ShoppingBag,
  Sofa,
  TrainFront,
} from "lucide-react";
import Image from "next/image";
import { BrokerLink } from "@/components/broker/broker-link";
import { localityName, type NearbyCategory, type RentListing } from "@/data";
import { formatArea, formatDistance, formatPrice, formatRent } from "@/lib/format";

const nearbyIcons: Record<NearbyCategory, typeof TrainFront> = {
  Metro: TrainFront,
  School: GraduationCap,
  Hospital: Hospital,
  Mall: ShoppingBag,
  "Business Park": Building2,
  Airport: Plane,
};

export function RentalCard({
  listing,
  priority = false,
}: {
  listing: RentListing;
  priority?: boolean;
}) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand-border hover:shadow-[0_18px_40px_-26px_rgba(15,23,42,0.35)] sm:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,19rem)_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto sm:h-full">
        <Image
          src={listing.images[0]}
          alt={`${listing.title} in ${localityName(listing.localitySlug)}`}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-800 shadow-sm">
          {listing.type}
        </span>
        {listing.verified && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            <BadgeCheck className="size-3.5" aria-hidden />
            Verified
          </span>
        )}
      </div>

      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h3 className="font-heading text-[16px] font-semibold leading-snug sm:text-[17px]">
            <BrokerLink
              href={`/property/${listing.id}`}
              className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
            >
              {listing.title}
            </BrokerLink>
          </h3>
          <p className="shrink-0 text-right">
            <span className="block font-heading text-lg font-semibold text-brand">
              {formatRent(listing.rent)}
            </span>
            <span className="block text-[11.5px] text-muted-foreground">
              Deposit {formatPrice(listing.deposit)}
            </span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-brand" aria-hidden />
          <span className="truncate">
            {listing.society}, {localityName(listing.localitySlug)}
          </span>
        </p>

        <dl className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px]">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Bedrooms</dt>
            <dd className="font-medium">{listing.bhk} BHK</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Bathrooms</dt>
            <dd className="font-medium">{listing.bathrooms} bath</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Area</dt>
            <dd className="font-medium">{formatArea(listing.areaSqft)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Sofa className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Furnishing</dt>
            <dd className="font-medium">{listing.furnishing}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarCheck className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Available from</dt>
            <dd className="font-medium">{listing.availableFrom}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-4">
          <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Nearby
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {listing.nearby.slice(0, 4).map((place) => {
              const Icon = nearbyIcons[place.category];
              return (
                <li
                  key={`${place.category}-${place.name}`}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-brand-tint px-2.5 py-1 text-[11.5px]"
                >
                  <Icon className="size-3.5 shrink-0 text-brand" aria-hidden />
                  <span className="truncate">{place.name}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-brand">
                    {formatDistance(place.distanceKm)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

"use client";

import { BadgeCheck, Bath, BedDouble, Maximize, MapPin } from "lucide-react";
import Image from "next/image";
import { BrokerLink } from "@/components/broker/broker-link";
import { localityName, type Listing } from "@/data";
import {
  formatArea,
  formatPrice,
  formatPricePerSqft,
  formatRent,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export function PropertyCard({
  listing,
  priority = false,
  className,
}: {
  listing: Listing;
  priority?: boolean;
  className?: string;
}) {
  const isSale = listing.listingType === "sale";
  const amount = isSale ? formatPrice(listing.price) : formatRent(listing.rent);
  const secondary = isSale
    ? formatPricePerSqft(listing.price, listing.areaSqft)
    : `Deposit ${formatPrice(listing.deposit)}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={listing.images[0]}
          alt={`${listing.title} in ${localityName(listing.localitySlug)}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-800 shadow-sm backdrop-blur">
            {listing.type}
          </span>
          {listing.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              <BadgeCheck className="size-3.5" aria-hidden />
              Verified
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 pt-10">
          <p className="font-heading text-lg font-semibold text-white drop-shadow-sm sm:text-xl">
            {amount}
          </p>
          <p className="text-[11.5px] font-medium text-white/80">{secondary}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-heading text-[15px] font-semibold leading-snug">
          <BrokerLink
            href={`/property/${listing.id}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {listing.title}
          </BrokerLink>
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-brand" aria-hidden />
          <span className="truncate">
            {listing.society}, {localityName(listing.localitySlug)}
          </span>
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[12px] sm:text-[12.5px]">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Bedrooms</dt>
            <dd className="font-medium">
              {listing.bhk > 0 ? `${listing.bhk} BHK` : listing.type}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Bathrooms</dt>
            <dd className="font-medium">{listing.bathrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="size-4 text-muted-foreground" aria-hidden />
            <dt className="sr-only">Area</dt>
            <dd className="truncate font-medium">
              {formatArea(listing.areaSqft)}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

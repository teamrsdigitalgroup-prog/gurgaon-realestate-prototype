import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactActions } from "@/components/property/contact-actions";
import { ListingFilters } from "@/components/property/listing-filters";
import { RentalCard } from "@/components/property/rental-card";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_CITY } from "@/config";
import { propertyTypes, rentals } from "@/data";
import { pageTitle, resolveBroker } from "@/lib/broker";
import { applyFilters, parseFilters, sortListings, type SortKey } from "@/lib/filters";

const SORT_KEYS: SortKey[] = ["relevance", "price-asc", "price-desc", "area-desc"];

function parseSort(value: string | string[] | undefined): SortKey {
  const raw = Array.isArray(value) ? value[0] : value;
  return SORT_KEYS.includes(raw as SortKey) ? (raw as SortKey) : "relevance";
}

export async function generateMetadata({
  searchParams,
}: PageProps<"/rent">): Promise<Metadata> {
  const broker = resolveBroker(await searchParams);
  return {
    title: pageTitle(broker, `Rent a Home in ${SITE_CITY}`),
    description: `${rentals.length} furnished and unfurnished homes for rent across ${SITE_CITY}, with monthly rent, deposit and nearby metro, schools and hospitals listed by ${broker.name}.`,
  };
}

export default async function RentPage({ searchParams }: PageProps<"/rent">) {
  const resolved = await searchParams;
  const broker = resolveBroker(resolved);
  const filters = parseFilters(resolved);
  const sort = parseSort(resolved.sort);

  const matches = sortListings(applyFilters(rentals, filters, "rent"), sort);

  return (
    <SiteShell broker={broker}>
      <PageHeader
        eyebrow={`${rentals.length} homes available now`}
        title={`Rent a home in ${SITE_CITY} with ${broker.name}`}
        description="Monthly rent, security deposit and maintenance are stated upfront on every listing, along with the distance to the nearest metro station, schools, hospitals and malls."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ListingFilters
          mode="rent"
          values={filters}
          sort={sort}
          types={propertyTypes(rentals)}
          resultCount={matches.length}
          totalCount={rentals.length}
        />

        {matches.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-brand-soft">
              <SearchX className="size-5 text-brand" aria-hidden />
            </span>
            <h2 className="mt-4 font-heading text-lg font-semibold">
              No rentals match these filters
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              New rentals come in every week and the good ones go within days.
              Tell {broker.name} what you need and we will call you first.
            </p>
            <ContactActions
              className="mt-6 w-full sm:max-w-md"
              context={`a rental in ${SITE_CITY}`}
            />
          </div>
        ) : (
          <ul className="mt-8 space-y-5">
            {matches.map((listing, index) => (
              <li key={listing.id} className="animate-fade-up">
                <RentalCard listing={listing} priority={index < 2} />
              </li>
            ))}
          </ul>
        )}

        <aside className="mt-12 rounded-2xl border border-brand-border bg-brand-soft p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold sm:text-2xl">
            Relocating to {SITE_CITY} on short notice?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {broker.name} arranges four or five viewings in a single afternoon,
            drafts the rent agreement the same evening and handles police
            verification and society paperwork for you.
          </p>
          <ContactActions
            className="mt-5 sm:max-w-md"
            context={`a rental in ${SITE_CITY}`}
          />
        </aside>
      </div>
    </SiteShell>
  );
}

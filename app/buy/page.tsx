import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactActions } from "@/components/property/contact-actions";
import { ListingFilters } from "@/components/property/listing-filters";
import { PropertyGrid } from "@/components/property/property-grid";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_CITY } from "@/config";
import { properties, propertyTypes } from "@/data";
import { pageTitle, resolveBroker } from "@/lib/broker";
import { applyFilters, parseFilters, sortListings, type SortKey } from "@/lib/filters";

const SORT_KEYS: SortKey[] = ["relevance", "price-asc", "price-desc", "area-desc"];

function parseSort(value: string | string[] | undefined): SortKey {
  const raw = Array.isArray(value) ? value[0] : value;
  return SORT_KEYS.includes(raw as SortKey) ? (raw as SortKey) : "relevance";
}

export async function generateMetadata({
  searchParams,
}: PageProps<"/buy">): Promise<Metadata> {
  const broker = resolveBroker(await searchParams);
  return {
    title: pageTitle(broker, `Buy Property in ${SITE_CITY}`),
    description: `${properties.length} verified apartments, builder floors, villas, plots and commercial properties for sale across ${SITE_CITY}, listed by ${broker.name}.`,
  };
}

export default async function BuyPage({ searchParams }: PageProps<"/buy">) {
  const resolved = await searchParams;
  const broker = resolveBroker(resolved);
  const filters = parseFilters(resolved);
  const sort = parseSort(resolved.sort);

  const matches = sortListings(applyFilters(properties, filters, "sale"), sort);

  return (
    <SiteShell broker={broker}>
      <PageHeader
        eyebrow={`${properties.length} properties for sale`}
        title={`Buy property in ${SITE_CITY} with ${broker.name}`}
        description={`Every listing below was inspected in person, with title, sanction plan and HRERA registration checked before it went live. Filter by locality, budget, bedrooms or property type.`}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ListingFilters
          mode="sale"
          values={filters}
          sort={sort}
          types={propertyTypes(properties)}
          resultCount={matches.length}
          totalCount={properties.length}
        />

        <div className="mt-8">
          <PropertyGrid
            listings={matches}
            action={<ContactActions context={`a property in ${SITE_CITY}`} />}
          />
        </div>

        <aside className="mt-12 rounded-2xl border border-brand-border bg-brand-soft p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold sm:text-2xl">
            Not seeing the right property?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Roughly a third of what {broker.name} transacts never reaches a
            portal. Tell us your budget and preferred localities and we will send
            a shortlist from off-market inventory.
          </p>
          <ContactActions
            className="mt-5 sm:max-w-md"
            context={`off-market properties in ${SITE_CITY}`}
          />
        </aside>
      </div>
    </SiteShell>
  );
}

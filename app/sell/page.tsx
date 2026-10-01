import { Camera, Gavel, IndianRupee, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { ListPropertyForm } from "@/components/forms/list-property-form";
import { SiteShell } from "@/components/layout/site-shell";
import { Section, SectionHeading } from "@/components/section";
import { SITE_CITY } from "@/config";
import { localityName, recentlySold } from "@/data";
import { formatArea, formatPrice, formatRent } from "@/lib/format";
import { pageTitle, resolveBroker } from "@/lib/broker";

const steps = [
  {
    icon: IndianRupee,
    title: "Honest valuation, not a flattering one",
    copy: "We price against actual registry data from your society, not asking prices on portals. You will be told if your expectation is above market.",
  },
  {
    icon: Camera,
    title: "Photography and floor plan at our cost",
    copy: "A professional shoot and a measured floor plan, because listings with both get roughly three times the enquiries.",
  },
  {
    icon: Users,
    title: "Qualified buyers only",
    copy: "Your property is shown to buyers with a sanctioned loan or proven funds. No weekend sightseers walking through your home.",
  },
  {
    icon: Gavel,
    title: "Negotiation and registry handled",
    copy: "From the first offer to the sub-registrar appointment, including capital gains paperwork and the TDS formalities.",
  },
];

export async function generateMetadata({
  searchParams,
}: PageProps<"/sell">): Promise<Metadata> {
  const broker = resolveBroker(await searchParams);
  return {
    title: pageTitle(broker, `Sell Your Property in ${SITE_CITY}`),
    description: `List your ${SITE_CITY} apartment, builder floor, villa or plot with ${broker.name}. Free valuation, professional photography and no fee until it sells.`,
  };
}

export default async function SellPage({ searchParams }: PageProps<"/sell">) {
  const broker = resolveBroker(await searchParams);

  return (
    <SiteShell broker={broker}>
      <PageHeader
        eyebrow="Average 34 days to close"
        title={`Sell your property with ${broker.name}`}
        description={`Free valuation, photography at our cost, and your property shown only to buyers who can actually complete. Nothing is charged until the deal closes.`}
      />

      <Section id="list-your-property">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Step one"
              title="List your property"
              description={`Give ${broker.name} the basics and we will come back with a valuation and a plan within 48 hours.`}
            />

            <ul className="mt-9 space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft">
                      <Icon className="size-5 text-brand" aria-hidden />
                      <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-ink">
                        {index + 1}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-heading text-[16px] font-semibold leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <ListPropertyForm />
        </div>
      </Section>

      <Section tone="soft" id="recently-closed">
        <SectionHeading
          eyebrow="Track record"
          title="Recently listed and sold"
          description={`A sample of what ${broker.name} closed over the last two quarters, with the time each one took from listing to agreement.`}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentlySold.map((deal) => (
            <li
              key={deal.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10] bg-muted">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ${
                    deal.dealType === "Sold"
                      ? "bg-emerald-600/95"
                      : deal.dealType === "Rented Out"
                        ? "bg-sky-600/95"
                        : "bg-amber-600/95"
                  }`}
                >
                  {deal.dealType}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-[15px] font-semibold leading-snug">
                  {deal.title}
                </h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {localityName(deal.localitySlug)} · {formatArea(deal.areaSqft)}
                </p>
                <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
                  <p className="font-heading text-lg font-semibold text-brand">
                    {deal.dealType === "Rented Out"
                      ? formatRent(deal.price)
                      : formatPrice(deal.price)}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Closed in{" "}
                    <span className="font-semibold text-foreground">
                      {deal.soldIn}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </SiteShell>
  );
}

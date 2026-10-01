import { ArrowRight } from "lucide-react";
import { BrokerLink } from "@/components/broker/broker-link";
import { PropertyGrid } from "@/components/property/property-grid";
import { Section, SectionHeading } from "@/components/section";
import { featuredProperties, properties } from "@/data";
import type { Broker } from "@/lib/broker";

export function FeaturedProperties({ broker }: { broker: Broker }) {
  // Top up with the next-best listings so the grid is always full.
  const extras = properties.filter((p) => !p.featured).slice(0, 2);
  const listings = [...featuredProperties, ...extras].slice(0, 6);

  return (
    <Section id="featured">
      <SectionHeading
        eyebrow="Handpicked"
        title={`Featured properties from ${broker.name}`}
        description="Six listings worth a visit this week — each one inspected in person, with paperwork checked before it went live."
        action={
          <BrokerLink
            href="/buy"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            View all {properties.length} properties
            <ArrowRight className="size-4" aria-hidden />
          </BrokerLink>
        }
      />
      <PropertyGrid listings={listings} className="mt-10" />
    </Section>
  );
}

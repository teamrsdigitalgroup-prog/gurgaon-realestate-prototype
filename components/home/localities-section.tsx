import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BrokerLink } from "@/components/broker/broker-link";
import { Section, SectionHeading } from "@/components/section";
import { localities, listingsInLocality } from "@/data";

export function LocalitiesSection() {
  const featured = localities.slice(0, 8);

  return (
    <Section tone="soft" id="localities">
      <SectionHeading
        eyebrow="Where to look"
        title="Top Gurgaon localities"
        description="Every micro-market in Gurgaon prices and behaves differently. Here is where we are currently active, and what each pocket is actually good for."
        action={
          <BrokerLink
            href="/buy"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            See all properties
            <ArrowRight className="size-4" aria-hidden />
          </BrokerLink>
        }
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((locality) => {
          const count = listingsInLocality(locality.slug).length;
          return (
            <li key={locality.slug}>
              <BrokerLink
                href={`/buy?locality=${locality.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]"
              >
                <Image
                  src={locality.image}
                  alt={locality.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-heading text-lg font-semibold text-white">
                    {locality.name}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-white/75">
                    {locality.tagline}
                  </span>
                  <span className="mt-3 flex items-center justify-between text-[11.5px] font-medium text-white/90">
                    <span>
                      ₹{(locality.avgPricePerSqft / 1000).toFixed(1)}K / sq ft
                    </span>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 backdrop-blur">
                      {count} listed
                    </span>
                  </span>
                </span>
              </BrokerLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

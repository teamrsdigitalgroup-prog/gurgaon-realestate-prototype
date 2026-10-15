import type { Metadata } from "next";
import { ContactStrip } from "@/components/home/contact-strip";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { Hero } from "@/components/home/hero";
import { IntentCards } from "@/components/home/intent-cards";
import { LocalitiesSection } from "@/components/home/localities-section";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { SiteShell } from "@/components/layout/site-shell";
import { resolveBroker } from "@/lib/broker";

export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const broker = resolveBroker(await searchParams);
  return {
    title: `${broker.name} — Find Your Dream Property in ${broker.city}`,
    description: `${broker.name} helps you buy, sell and rent apartments, builder floors, villas and commercial property across ${broker.areas ?? broker.city}.`,
  };
}

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const broker = resolveBroker(await searchParams);

  return (
    <SiteShell broker={broker}>
      <Hero broker={broker} />
      <IntentCards broker={broker} />
      <FeaturedProperties broker={broker} />
      <LocalitiesSection broker={broker} />
      <WhyChooseUs broker={broker} />
      <Testimonials broker={broker} />
      <ContactStrip broker={broker} />
    </SiteShell>
  );
}

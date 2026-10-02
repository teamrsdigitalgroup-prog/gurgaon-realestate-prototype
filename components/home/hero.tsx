import { ArrowRight, BadgeCheck, Phone, Star } from "lucide-react";
import Image from "next/image";
import { BrokerLink } from "@/components/broker/broker-link";
import { buttonVariants } from "@/components/ui/button";
import { allListings, localities } from "@/data";
import { photo } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Broker } from "@/lib/broker";
import { SITE_CITY } from "@/config";

const stats = [
  { value: `${allListings.length}`, label: "Live listings" },
  { value: `${localities.length}`, label: "Micro-markets" },
  { value: "₹180 Cr+", label: "Closed in 2026" },
  { value: "4.9/5", label: "Client rating" },
];

export function Hero({ broker }: { broker: Broker }) {
  return (
    <section className="relative overflow-hidden bg-brand-tint">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-[28rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-background/70 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand backdrop-blur">
            <BadgeCheck className="size-3.5" aria-hidden />
            RERA-verified listings in {SITE_CITY}
          </p>

          <h1
            data-company
            className="mt-5 text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
          >
            {broker.name}
            <span className="mt-1 block text-brand">
              Find Your Dream Property in {SITE_CITY}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Apartments, builder floors, villas, plots and commercial space across
            DLF Phases 1 to 5, Golf Course Road, Sohna Road, Dwarka Expressway
            and ten more {SITE_CITY} micro-markets. One point of contact from the
            first site visit to the registry.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BrokerLink
              href="/buy"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 bg-brand px-6 text-brand-ink shadow-sm transition hover:bg-brand-strong",
              )}
            >
              Browse properties
              <ArrowRight className="size-4" aria-hidden />
            </BrokerLink>
            <a
              href={broker.telUrl}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 border-brand-border bg-background px-6 text-foreground hover:bg-brand-soft",
              )}
            >
              <Phone className="size-4 text-brand" aria-hidden />
              Talk to {broker.name}
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-brand-border pt-7 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-heading text-xl font-semibold sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_70px_-40px_rgba(15,23,42,0.5)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={photo("photo-1512917774080-9991f1c4c750", 1100, 1300)}
              alt={`Residential property represented by ${broker.name} in ${SITE_CITY}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
          </div>

          <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:right-auto sm:w-72">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <Star
                  key={step}
                  className="size-3.5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
              <span className="ml-1 text-xs font-semibold">4.9</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              “Every property {broker.name} showed us was real, available and
              priced the way it was advertised.”
            </p>
            <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-brand">
              Aditya R. · Golf Course Road
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

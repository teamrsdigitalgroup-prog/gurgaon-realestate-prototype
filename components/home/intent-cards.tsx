import { ArrowUpRight, Home, KeyRound, Tag } from "lucide-react";
import { BrokerLink } from "@/components/broker/broker-link";
import { properties, rentals } from "@/data";

const intents = [
  {
    href: "/buy",
    label: "Buy",
    icon: Home,
    headline: "Own a home in Gurgaon",
    copy: "Ready-to-move apartments, builder floors, villas and plots with clean title and verified paperwork.",
    stat: `${properties.length} properties for sale`,
  },
  {
    href: "/sell",
    label: "Sell",
    icon: Tag,
    headline: "List your property",
    copy: "Honest valuation, professional photography and qualified buyers only. No listing fee until it sells.",
    stat: "Average 34 days to close",
  },
  {
    href: "/rent",
    label: "Rent",
    icon: KeyRound,
    headline: "Find a rental fast",
    copy: "Furnished and unfurnished homes across every budget, with agreements drafted the same week.",
    stat: `${rentals.length} homes available now`,
  },
] as const;

export function IntentCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
        {intents.map((intent) => {
          const Icon = intent.icon;
          return (
            <BrokerLink
              key={intent.href}
              href={intent.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_22px_50px_-30px_rgba(15,23,42,0.4)] sm:p-7"
            >
              <span
                aria-hidden
                className="absolute -right-8 -top-8 size-28 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative grid size-12 place-items-center rounded-xl bg-brand text-brand-ink shadow-sm">
                <Icon className="size-5" aria-hidden />
              </span>

              <p className="relative mt-5 font-heading text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brand">
                {intent.label}
              </p>
              <h3 className="relative mt-1.5 font-heading text-xl font-semibold sm:text-2xl">
                {intent.headline}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {intent.copy}
              </p>

              <span className="relative mt-6 flex items-center justify-between border-t border-border pt-4 text-[13px] font-medium">
                <span className="text-muted-foreground">{intent.stat}</span>
                <span className="inline-flex items-center gap-1 text-brand">
                  Explore
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </span>
            </BrokerLink>
          );
        })}
      </div>
    </section>
  );
}

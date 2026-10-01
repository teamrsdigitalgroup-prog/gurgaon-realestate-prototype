"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Fragment } from "react";
import { BrokerLink } from "@/components/broker/broker-link";
import { BrokerLogo } from "@/components/broker/broker-logo";
import { useBroker } from "@/components/broker/broker-provider";
import { localities } from "@/data/localities";
import { AGENCY_NAME, OFFICE_ADDRESS, SITE_CITY } from "@/config";

const services = [
  { href: "/buy", label: "Buy a property" },
  { href: "/rent", label: "Rent a home" },
  { href: "/sell", label: "Sell or list" },
  { href: "/contact", label: "About & contact" },
];

export function Footer() {
  const broker = useBroker();
  const topLocalities = localities.slice(0, 6);

  return (
    <footer className="border-t border-border bg-brand-tint">
      {/* Extra bottom padding clears the fixed demo banner. */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-6 sm:pb-24 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrokerLogo broker={broker} size="lg" />
              <div>
                <p className="font-heading text-lg font-semibold">
                  {broker.name}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Real Estate, {SITE_CITY}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {broker.name} handles residential and commercial property across{" "}
              {SITE_CITY} — from builder floors in DLF Phase 1 to golf-facing
              apartments on Golf Course Road and new launches on Dwarka
              Expressway.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={broker.telUrl}
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-brand-soft"
              >
                <Phone className="size-3.5 text-brand" aria-hidden />
                {broker.phoneDisplay}
              </a>
              <a
                href={broker.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-brand-soft"
              >
                <MessageCircle className="size-3.5 text-brand" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em]">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((item) => (
                <li key={item.href}>
                  <BrokerLink
                    href={item.href}
                    className="text-sm text-muted-foreground transition hover:text-brand"
                  >
                    {item.label}
                  </BrokerLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Localities">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em]">
              Localities
            </h2>
            <ul className="mt-4 space-y-2.5">
              {topLocalities.map((locality) => (
                <li key={locality.slug}>
                  <BrokerLink
                    href={`/buy?locality=${locality.slug}`}
                    className="text-sm text-muted-foreground transition hover:text-brand"
                  >
                    {locality.name}
                  </BrokerLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em]">
              Office
            </h2>
            <p className="mt-4 flex gap-2.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                {broker.name}
                {OFFICE_ADDRESS.map((line) => (
                  <Fragment key={line}>
                    <br />
                    {line}
                  </Fragment>
                ))}
              </span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Monday to Saturday, 10:00 – 19:00
              <br />
              Sunday by appointment
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {broker.name}. Demonstration website —
            listings, prices and reviews on this site are sample data.
          </p>
          <p>
            Prototype built by{" "}
            <span className="font-medium text-foreground">{AGENCY_NAME}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

import {
  FileCheck2,
  Handshake,
  IndianRupee,
  MapPinned,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import type { Broker } from "@/lib/broker";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Every listing verified in person",
    copy: "No photo-shopped galleries and no units that sold three months ago. If it is on this site, it was inspected and it is available.",
  },
  {
    icon: FileCheck2,
    title: "Title and RERA checked first",
    copy: "Chain of title, approved sanction plan, occupancy certificate and HRERA registration are reviewed before a property is shown to you.",
  },
  {
    icon: IndianRupee,
    title: "Honest pricing, both ways",
    copy: "You are told when a seller is quoting above market, and when a property is worth paying a premium for. Circle rates and stamp duty explained upfront.",
  },
  {
    icon: MapPinned,
    title: "Fourteen micro-markets, properly known",
    copy: "DLF Phase 3 behaves nothing like Sector 82. Advice is specific to the pocket, the society and the tower, not generic city-level talk.",
  },
  {
    icon: Timer,
    title: "Site visits arranged in 24 hours",
    copy: "Shortlist on WhatsApp in the evening, see three or four properties the next day, with a route planned to avoid Gurgaon peak traffic.",
  },
  {
    icon: Handshake,
    title: "One point of contact to registry",
    copy: "Negotiation, home-loan paperwork, agreement drafting and the sub-registrar appointment are handled by the same person throughout.",
  },
];

export function WhyChooseUs({ broker }: { broker: Broker }) {
  return (
    <Section id="why-us" tone="soft">
      <SectionHeading
        eyebrow="Why work with us"
        title={`Six reasons clients stay with ${broker.name}`}
        description="Buying property in Gurgaon is mostly an exercise in filtering out noise. This is how that is done."
        align="center"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <li
              key={reason.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-border"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft">
                <Icon className="size-5 text-brand" aria-hidden />
              </span>
              <h3 className="mt-4 font-heading text-[17px] font-semibold leading-snug">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.copy}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

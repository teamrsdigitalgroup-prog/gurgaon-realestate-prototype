import { Award, Clock, Handshake, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeading } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OFFICE_ADDRESS, SITE_CITY } from "@/config";
import { allListings, localities } from "@/data";
import { photo } from "@/lib/images";
import { pageTitle, resolveBroker } from "@/lib/broker";

const credentials = [
  {
    icon: Award,
    label: "HRERA registered",
    value: "Agent licence active",
  },
  {
    icon: Handshake,
    label: "Deals closed in 2026",
    value: "₹180 Cr+ transacted",
  },
  {
    icon: Clock,
    label: "Average response",
    value: "Under 2 working hours",
  },
];

const faqs = [
  {
    question: "Do you charge buyers a brokerage fee?",
    answer:
      "Brokerage is one per cent of the transaction value for resale purchases, payable only at registry. For new launches the developer pays, so there is nothing for you to pay at all. Nothing is collected in advance either way.",
  },
  {
    question: "How quickly can you arrange site visits?",
    answer:
      "Normally within 24 hours, and we plan the route so you see three or four properties in one trip rather than crossing Gurgaon twice. Weekend slots fill up by Thursday, so earlier notice helps.",
  },
  {
    question: "Which localities do you actually cover?",
    answer: `All ${localities.length} micro-markets listed on this site, from DLF Phases 1 to 5 and Golf Course Road through to Sector 82, Dwarka Expressway and Southern Peripheral Road. We will tell you honestly if your requirement sits outside the areas we know well.`,
  },
  {
    question: "Can you help with home loans and paperwork?",
    answer:
      "Yes. We work with lenders directly for sanction letters, and handle the agreement to sell, the sub-registrar appointment, stamp duty calculation, TDS formalities and the mutation after registry.",
  },
  {
    question: "Do you handle commercial property and plots?",
    answer:
      "We do. Office floor plates in Cyber City, high-street retail on MG Road and licensed plotted colonies in New Gurgaon are all part of what we transact regularly.",
  },
];

export async function generateMetadata({
  searchParams,
}: PageProps<"/contact">): Promise<Metadata> {
  const broker = resolveBroker(await searchParams);
  return {
    title: pageTitle(broker, `About & Contact`),
    description: `Talk to ${broker.name} about buying, selling or renting property in ${SITE_CITY}. Call, WhatsApp or request a callback.`,
  };
}

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const broker = resolveBroker(await searchParams);

  return (
    <SiteShell broker={broker}>
      <PageHeader
        eyebrow="About & contact"
        title={`About ${broker.name}`}
        description={`A ${SITE_CITY} property practice built on knowing a small number of micro-markets extremely well, rather than claiming to cover the whole NCR.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={`Property advice in ${SITE_CITY}, without the noise`}
            />

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                {broker.name} has been advising buyers, sellers and tenants
                across {SITE_CITY} for over a decade. The practice covers{" "}
                {localities.length} micro-markets and currently has{" "}
                {allListings.length} active listings, from compact builder floors
                in DLF Phase 3 to golf-facing apartments in DLF Phase 5 and
                office floor plates in Cyber City.
              </p>
              <p>
                Most of the work is repeat business and referral. That only
                happens if clients are told the truth about a property — which
                means pointing out the tower that gets road noise, the society
                with a maintenance dispute, and the seller who is quoting fifteen
                per cent above the last registry in the same building.
              </p>
              <p>
                Every listing on this site is inspected in person before it goes
                live. Title documents, approved sanction plans, occupancy
                certificates and HRERA registration are reviewed first, so your
                site visits are spent judging whether you like the home rather
                than discovering it was never available.
              </p>
              <p className="rounded-xl bg-brand-tint p-4 text-[14px] text-foreground/80">
                This is placeholder copy in a demo prototype. On a live site this
                section would carry {broker.name}&apos;s own story, team photos,
                registration numbers and press mentions.
              </p>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {credentials.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-soft">
                      <Icon className="size-4.5 text-brand" aria-hidden />
                    </span>
                    <dt className="mt-3 text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-[14px] font-semibold">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl sm:aspect-[5/4]">
              <Image
                src={photo("photo-1497366754035-f200968a6e72", 1000, 800)}
                alt={`The ${broker.name} office on Golf Course Road`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <ul className="mt-5 grid gap-3">
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-[14px]">
                  <span className="font-medium">Office</span>
                  <span className="mt-0.5 block text-muted-foreground">
                    {OFFICE_ADDRESS.join(", ")}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-[14px]">
                  <span className="font-medium">Call</span>
                  <a
                    href={broker.telUrl}
                    className="mt-0.5 block text-muted-foreground hover:text-brand"
                  >
                    {broker.phoneDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <MessageCircle
                  className="mt-0.5 size-4 shrink-0 text-brand"
                  aria-hidden
                />
                <span className="text-[14px]">
                  <span className="font-medium">WhatsApp</span>
                  <a
                    href={broker.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-muted-foreground hover:text-brand"
                  >
                    Message {broker.name}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-[14px]">
                  <span className="font-medium">Office hours</span>
                  <span className="mt-0.5 block text-muted-foreground">
                    Monday to Saturday, 10:00 – 19:00. Sunday by appointment.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="soft" id="enquiry">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={`Send ${broker.name} a message`}
              description="Tell us whether you are buying, selling or renting, your budget and the localities you have in mind. You will get a shortlist, not a sales pitch."
            />

            <div className="mt-8">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em]">
                Common questions
              </h3>
              <Accordion multiple={false} className="mt-3">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="text-[14.5px]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-xl font-semibold">
              Request a callback
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Two working hours, usually much less.
            </p>
            <EnquiryForm className="mt-6" />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

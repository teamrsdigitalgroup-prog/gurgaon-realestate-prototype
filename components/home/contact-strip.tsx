import { Clock, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SITE_CITY } from "@/config";
import type { Broker } from "@/lib/broker";

export function ContactStrip({ broker }: { broker: Broker }) {
  return (
    <section id="contact" className="bg-neutral-950 text-neutral-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
            Get in touch
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">
            Tell {broker.name} what you are looking for
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-400">
            Share your budget and preferred localities. You will get a shortlist
            of three or four properties that genuinely fit, not a list of
            everything on the market.
          </p>

          <dl className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white/10">
                <Phone className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.1em] text-neutral-500">
                  Call
                </dt>
                <dd>
                  <a
                    href={broker.telUrl}
                    className="text-[15px] font-medium hover:text-brand-muted"
                  >
                    {broker.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white/10">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.1em] text-neutral-500">
                  WhatsApp
                </dt>
                <dd>
                  <a
                    href={broker.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium hover:text-brand-muted"
                  >
                    Message us directly
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white/10">
                <Clock className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.1em] text-neutral-500">
                  Office hours
                </dt>
                <dd className="text-[15px] font-medium">
                  Mon – Sat, 10:00 – 19:00 · {SITE_CITY}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-6 text-foreground shadow-2xl sm:p-7">
          <h3 className="font-heading text-lg font-semibold">
            Request a callback
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Two working hours, usually much less.
          </p>
          <EnquiryForm className="mt-5" />
        </div>
      </div>
    </section>
  );
}

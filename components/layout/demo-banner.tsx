"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useBroker } from "@/components/broker/broker-provider";
import {
  agencyWhatsAppUrl,
  DEMO_BANNER_CTA,
  DEMO_BANNER_TEXT,
} from "@/config";

/** Slim sticky pitch shown on every page. Edit the copy in /config.ts. */
export function DemoBanner() {
  const broker = useBroker();
  const message = DEMO_BANNER_TEXT.replace("{broker}", broker.name);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-950/95 pb-[max(0.625rem,env(safe-area-inset-bottom))] text-white backdrop-blur-md">
      <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-2 px-4 pt-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-6 lg:px-8">
        <Sparkles
          className="hidden size-4 shrink-0 text-amber-300 sm:block"
          aria-hidden
        />
        <p className="min-w-0 text-[13px] leading-snug text-neutral-200 sm:flex-1 sm:text-sm">
          {message}
        </p>
        <a
          href={agencyWhatsAppUrl(broker.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 sm:h-9 sm:w-auto sm:text-sm"
        >
          {DEMO_BANNER_CTA}
          <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-950/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Sparkles
          className="hidden size-4 shrink-0 text-amber-300 sm:block"
          aria-hidden
        />
        <p className="min-w-0 flex-1 text-[12.5px] leading-snug text-neutral-200 sm:text-sm">
          {message}
        </p>
        <a
          href={agencyWhatsAppUrl(broker.isPlaceholder ? "" : broker.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 sm:text-sm"
        >
          {DEMO_BANNER_CTA}
          <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

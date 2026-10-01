"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useBroker } from "@/components/broker/broker-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactActions({
  className,
  size = "default",
  context,
}: {
  className?: string;
  size?: "default" | "lg";
  /** Included in the WhatsApp message so the broker knows what was viewed. */
  context?: string;
}) {
  const broker = useBroker();
  const whatsappUrl = context
    ? `https://wa.me/91${broker.phone}?text=${encodeURIComponent(
        `Hi ${broker.name}, I'm interested in ${context}. Is it still available?`,
      )}`
    : broker.whatsappUrl;

  return (
    <div className={cn("grid gap-2.5 sm:grid-cols-2", className)}>
      <a
        href={broker.telUrl}
        className={cn(
          buttonVariants({ size }),
          "h-11 bg-brand text-brand-ink hover:bg-brand-strong",
        )}
      >
        <Phone className="size-4" aria-hidden />
        Call {broker.name}
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ size, variant: "outline" }),
          "h-11 border-brand-border text-brand hover:bg-brand-soft hover:text-brand-strong",
        )}
      >
        <MessageCircle className="size-4" aria-hidden />
        WhatsApp {broker.name}
      </a>
    </div>
  );
}

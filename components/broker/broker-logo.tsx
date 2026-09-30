import { cn } from "@/lib/utils";
import type { Broker } from "@/lib/broker";

const sizes = {
  sm: "size-9 text-[13px]",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
} as const;

/** Initials mark generated from the broker name, e.g. "Sharma Properties" -> SP. */
export function BrokerLogo({
  broker,
  size = "md",
  className,
}: {
  broker: Broker;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-xl font-heading font-semibold tracking-wide",
        "bg-brand text-brand-ink shadow-sm ring-1 ring-black/5",
        sizes[size],
        className,
      )}
    >
      <span
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.28), transparent 55%)",
        }}
      />
      <span className="relative">{broker.initials}</span>
    </span>
  );
}

export function BrokerWordmark({
  broker,
  className,
  subtitle = "Real Estate, Gurgaon",
}: {
  broker: Broker;
  className?: string;
  subtitle?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrokerLogo broker={broker} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-heading text-[15px] font-semibold text-foreground sm:text-base">
          {broker.name}
        </span>
        <span className="truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {subtitle}
        </span>
      </span>
    </span>
  );
}

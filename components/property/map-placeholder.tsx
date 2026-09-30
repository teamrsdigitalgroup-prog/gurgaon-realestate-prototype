import { MapPin, Navigation } from "lucide-react";

export function MapPlaceholder({
  society,
  locality,
}: {
  society: string;
  locality: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-brand-tint">
      {/* Stylised street grid so the section reads as a map, not a broken image. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--brand) 16%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--brand) 16%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-[18%] w-6 -skew-x-12 bg-brand/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[58%] h-5 bg-brand/10"
      />

      <div className="relative flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-64">
        <span className="relative grid size-12 place-items-center rounded-full bg-brand text-brand-ink shadow-lg">
          <MapPin className="size-5" aria-hidden />
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
        </span>
        <p className="mt-4 font-heading text-base font-semibold">{society}</p>
        <p className="text-sm text-muted-foreground">{locality}, Gurgaon</p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <Navigation className="size-3.5 text-brand" aria-hidden />
          Interactive map and exact pin shared before the site visit
        </p>
      </div>
    </div>
  );
}

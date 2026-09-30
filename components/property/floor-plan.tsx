import { FileText, Ruler } from "lucide-react";
import type { FloorPlanRoom } from "@/data";
import { formatArea } from "@/lib/format";

/**
 * Sample listings have no CAD drawings, so the plan is presented as a room
 * schedule with proportional bars rather than a missing-image placeholder.
 */
export function FloorPlan({
  rooms,
  totalSqft,
  carpetSqft,
}: {
  rooms: FloorPlanRoom[];
  totalSqft: number;
  carpetSqft: number;
}) {
  const largest = Math.max(...rooms.map((room) => room.areaSqft), 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border bg-brand-tint px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium">
          <Ruler className="size-4 text-brand" aria-hidden />
          Built-up {formatArea(totalSqft)}
        </span>
        <span className="text-[13px] text-muted-foreground">
          Carpet {formatArea(carpetSqft)}
        </span>
      </div>

      <ul className="divide-y divide-border">
        {rooms.map((room) => (
          <li
            key={room.label}
            className="flex items-center gap-4 px-4 py-3 sm:px-5"
          >
            <span className="w-32 shrink-0 text-[13.5px] font-medium sm:w-44">
              {room.label}
            </span>
            <span
              className="h-2.5 rounded-full bg-brand/80"
              style={{
                width: `${Math.max(8, (room.areaSqft / largest) * 100)}%`,
                maxWidth: "70%",
              }}
              aria-hidden
            />
            <span className="ml-auto shrink-0 text-[13px] tabular-nums text-muted-foreground">
              {room.areaSqft} sq ft
            </span>
          </li>
        ))}
      </ul>

      <p className="flex items-start gap-2 border-t border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground sm:px-5">
        <FileText className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Stamped architectural drawings and the approved sanction plan are shared
        with serious buyers on request.
      </p>
    </div>
  );
}

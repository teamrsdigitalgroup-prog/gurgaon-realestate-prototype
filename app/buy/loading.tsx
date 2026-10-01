import { PropertyGridSkeleton } from "@/components/property/property-grid";

export default function BuyLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-7 w-56 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-10 w-full max-w-2xl animate-pulse rounded bg-muted" />
      <div className="mt-8 h-40 animate-pulse rounded-2xl bg-muted" />
      <div className="mt-8">
        <PropertyGridSkeleton count={6} />
      </div>
    </div>
  );
}

export default function PropertyLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-8 w-4/5 max-w-2xl animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-60 animate-pulse rounded bg-muted" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="aspect-[16/9] animate-pulse rounded-2xl bg-muted" />
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="size-16 animate-pulse rounded-lg bg-muted sm:size-20"
              />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        </div>
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

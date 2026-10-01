export default function RentLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-7 w-56 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-10 w-full max-w-2xl animate-pulse rounded bg-muted" />
      <div className="mt-8 h-40 animate-pulse rounded-2xl bg-muted" />
      <ul className="mt-8 space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-[minmax(0,15rem)_1fr]"
          >
            <div className="aspect-[4/3] animate-pulse bg-muted sm:aspect-auto sm:h-44" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
              <div className="h-8 animate-pulse rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

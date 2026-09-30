"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localities } from "@/data/localities";
import {
  BHK_OPTIONS,
  FURNISHING_OPTIONS,
  RENT_BUDGETS,
  SALE_BUDGETS,
} from "@/data";
import { FILTER_KEYS, type FilterValues, type SortKey } from "@/lib/filters";
import { cn } from "@/lib/utils";

const ALL = "all";

const sortLabels: Record<SortKey, string> = {
  relevance: "Featured first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "area-desc": "Largest area",
};

export function ListingFilters({
  mode,
  values,
  sort,
  types,
  resultCount,
  totalCount,
}: {
  mode: "sale" | "rent";
  values: FilterValues;
  sort: SortKey;
  types: string[];
  resultCount: number;
  totalCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(values.q);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => setQuery(values.q), [values.q]);

  const budgets = mode === "sale" ? SALE_BUDGETS : RENT_BUDGETS;
  const activeCount = FILTER_KEYS.filter((key) => values[key] !== "").length;

  /** Filters live in the URL so a broker can share a filtered link. */
  function commit(updates: Record<string, string>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(updates)) {
      if (value === "" || value === ALL) params.delete(key);
      else params.set(key, value);
    }
    const search = params.toString();
    startTransition(() => {
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    });
  }

  function clearAll() {
    const params = new URLSearchParams(window.location.search);
    for (const key of [...FILTER_KEYS, "sort"]) params.delete(key);
    const search = params.toString();
    setQuery("");
    startTransition(() => {
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          commit({ q: query.trim() });
        }}
        role="search"
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Label htmlFor="listing-search" className="sr-only">
            Search by society, locality or area
          </Label>
          <Input
            id="listing-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              mode === "sale"
                ? "Search society, locality or type"
                : "Search locality, society or area"
            }
            className="h-11 pl-9"
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="h-11 flex-1 bg-brand text-brand-ink hover:bg-brand-strong sm:flex-none"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 lg:hidden"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filters
            {activeCount > 0 && (
              <span className="ml-1 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-semibold text-brand-ink">
                {activeCount}
              </span>
            )}
          </Button>
        </div>
      </form>

      <div
        className={cn(
          "mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4",
          !expanded && "hidden lg:grid",
        )}
      >
        <FilterSelect
          label="Locality"
          value={values.locality || ALL}
          onChange={(value) => commit({ locality: value })}
          options={[
            { value: ALL, label: "All Gurgaon" },
            ...localities.map((l) => ({ value: l.slug, label: l.name })),
          ]}
        />

        <FilterSelect
          label={mode === "sale" ? "Budget" : "Monthly rent"}
          value={values.budget || ALL}
          onChange={(value) => commit({ budget: value })}
          options={[
            { value: ALL, label: "Any budget" },
            ...budgets.map((bucket, index) => ({
              value: String(index),
              label: bucket.label,
            })),
          ]}
        />

        <FilterSelect
          label="Bedrooms"
          value={values.bhk || ALL}
          onChange={(value) => commit({ bhk: value })}
          options={[
            { value: ALL, label: "Any BHK" },
            ...BHK_OPTIONS.map((bhk) => ({
              value: String(bhk),
              label: bhk >= 4 ? "4 BHK & above" : `${bhk} BHK`,
            })),
          ]}
        />

        <FilterSelect
          label="Property type"
          value={values.type || ALL}
          onChange={(value) => commit({ type: value })}
          options={[
            { value: ALL, label: "All types" },
            ...types.map((type) => ({ value: type, label: type })),
          ]}
        />

        {mode === "rent" && (
          <FilterSelect
            label="Furnishing"
            value={values.furnishing || ALL}
            onChange={(value) => commit({ furnishing: value })}
            options={[
              { value: ALL, label: "Any furnishing" },
              ...FURNISHING_OPTIONS.map((option) => ({
                value: option,
                label: option,
              })),
            ]}
          />
        )}

        <FilterSelect
          label="Sort by"
          value={sort}
          onChange={(value) => commit({ sort: value })}
          options={(Object.keys(sortLabels) as SortKey[]).map((key) => ({
            value: key,
            label: sortLabels[key],
          }))}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p
          aria-live="polite"
          className={cn(
            "text-sm text-muted-foreground transition-opacity",
            isPending && "opacity-50",
          )}
        >
          Showing <span className="font-semibold text-foreground">{resultCount}</span>{" "}
          of {totalCount} {mode === "sale" ? "properties for sale" : "homes for rent"}
        </p>
        {activeCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 w-full">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

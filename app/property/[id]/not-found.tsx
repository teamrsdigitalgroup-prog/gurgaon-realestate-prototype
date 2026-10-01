import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PropertyNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft">
        <Home className="size-6 text-brand" aria-hidden />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-semibold sm:text-3xl">
        This property is no longer listed
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        It may have been sold, rented out or taken off the market. Browse what is
        currently available, or call us and we will suggest something comparable.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/buy"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 bg-brand px-5 text-brand-ink hover:bg-brand-strong",
          )}
        >
          Browse properties for sale
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "h-11 px-5",
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </div>
  );
}

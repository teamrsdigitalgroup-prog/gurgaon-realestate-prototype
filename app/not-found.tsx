import { Compass } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft">
        <Compass className="size-6 text-brand" aria-hidden />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-semibold sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        The page you were looking for does not exist. Start from the home page
        and we will get you to the right property.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-7 h-11 bg-brand px-5 text-brand-ink hover:bg-brand-strong",
        )}
      >
        Go to home page
      </Link>
    </div>
  );
}

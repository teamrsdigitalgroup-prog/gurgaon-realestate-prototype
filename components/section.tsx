import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2.1rem]">
          {title}
        </h2>
        <span
          className={cn(
            "rule-brand mt-4 block h-0.5 w-16 rounded-full",
            align === "center" && "mx-auto",
          )}
        />
        {description && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "soft" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-18 lg:py-24",
        tone === "soft" && "bg-brand-tint",
        tone === "dark" && "bg-neutral-950 text-neutral-100",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

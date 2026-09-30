"use client";

import { Menu, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrokerLink } from "@/components/broker/broker-link";
import { BrokerWordmark } from "@/components/broker/broker-logo";
import { useBroker } from "@/components/broker/broker-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/contact", label: "About" },
];

export function Navbar() {
  const broker = useBroker();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        <BrokerLink
          href="/"
          className="min-w-0 shrink rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <BrokerWordmark broker={broker} />
        </BrokerLink>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <BrokerLink
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-brand"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                  )}
                </BrokerLink>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Button
            asChild
            className="hidden bg-brand text-brand-ink shadow-sm transition hover:bg-brand-strong sm:inline-flex"
          >
            <a href={broker.telUrl}>
              <Phone className="size-4" aria-hidden />
              Contact {broker.name}
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <BrokerWordmark broker={broker} />
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-2 flex flex-col px-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <BrokerLink
                        href={link.href}
                        className="flex items-center justify-between border-b border-border/60 py-3.5 text-base font-medium text-foreground"
                      >
                        {link.label}
                      </BrokerLink>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button
                  asChild
                  className="w-full bg-brand text-brand-ink hover:bg-brand-strong"
                >
                  <a href={broker.telUrl}>
                    <Phone className="size-4" aria-hidden />
                    Call {broker.name}
                  </a>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {broker.phoneDisplay}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

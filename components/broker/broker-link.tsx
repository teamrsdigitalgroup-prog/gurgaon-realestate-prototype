"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useBroker } from "./broker-provider";
import { withBrokerParams } from "@/lib/broker";

/** Internal link that carries the broker identity to the next page. */
export function BrokerLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const broker = useBroker();
  return <Link href={withBrokerParams(href, broker.params)} {...props} />;
}

export function useBrokerHref(href: string): string {
  const broker = useBroker();
  return withBrokerParams(href, broker.params);
}

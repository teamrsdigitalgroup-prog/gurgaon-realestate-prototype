"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { buildBroker, type Broker } from "@/lib/broker";

const STORAGE_KEY = "gurgaon-demo-broker";

type StoredBroker = { name: string; phone?: string; color?: string };

const BrokerContext = createContext<Broker | null>(null);

export function useBroker(): Broker {
  const broker = useContext(BrokerContext);
  if (!broker) {
    throw new Error("useBroker must be used inside <BrokerProvider>");
  }
  return broker;
}

function readStored(): StoredBroker | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredBroker;
    return parsed?.name ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * The broker is resolved on the server from the URL, so the first paint is
 * already personalised. This provider only handles the pieces that need the
 * browser: remembering the identity and re-applying it if a link drops the
 * query string, and exposing the brand colour to portalled UI.
 */
export function BrokerProvider({
  broker,
  children,
}: {
  broker: Broker;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand", broker.color);
    root.style.setProperty("--brand-ink", broker.onColor);
  }, [broker.color, broker.onColor]);

  useEffect(() => {
    if (!broker.isPlaceholder) {
      const payload: StoredBroker = {
        name: broker.name,
        phone: broker.phone,
        color: broker.color,
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // Private browsing modes can refuse writes; personalisation still works
        // for the current page because it came from the URL.
      }
      return;
    }

    const stored = readStored();
    if (!stored) return;

    const restored = buildBroker(stored);
    if (!restored.params) return;

    const merged = new URLSearchParams(window.location.search);
    for (const [key, value] of new URLSearchParams(restored.params)) {
      merged.set(key, value);
    }
    router.replace(`${pathname}?${merged.toString()}`, { scroll: false });
  }, [
    broker.isPlaceholder,
    broker.name,
    broker.phone,
    broker.color,
    pathname,
    router,
  ]);

  return (
    <BrokerContext.Provider value={broker}>{children}</BrokerContext.Provider>
  );
}

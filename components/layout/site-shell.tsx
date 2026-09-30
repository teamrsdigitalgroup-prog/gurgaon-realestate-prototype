import { BrokerProvider } from "@/components/broker/broker-provider";
import { DemoBanner } from "./demo-banner";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import type { Broker } from "@/lib/broker";

/**
 * Every page renders its own shell because only pages can read searchParams.
 * Setting --brand here means the very first server-rendered paint already uses
 * the broker's colour, with no flash of the default palette.
 */
export function SiteShell({
  broker,
  children,
}: {
  broker: Broker;
  children: React.ReactNode;
}) {
  return (
    <BrokerProvider broker={broker}>
      <div
        className="flex min-h-full flex-col bg-background"
        style={
          {
            "--brand": broker.color,
            "--brand-ink": broker.onColor,
          } as React.CSSProperties
        }
      >
        <Navbar />
        <main className="flex-1 pb-24 sm:pb-20">{children}</main>
        <Footer />
        <DemoBanner />
      </div>
    </BrokerProvider>
  );
}

/**
 * Edit this file to rebrand the demo before sending it to a broker.
 * Nothing else in the app hard-codes these values.
 */

import { DEFAULT_CLIENT_NAME } from "@/lib/clients";

/**
 * Your own WhatsApp number, used by the sticky "get your own website" banner.
 * Includes the 91 country code because wa.me links require it.
 */
export const AGENCY_WHATSAPP = "918941962480";

/** Your agency, shown in the demo banner and footer credit. */
export const AGENCY_NAME = "R&S Digital Group";

/**
 * Name, address and phone all come from clients.json: the "default" entry, or
 * whichever one `?c=<client-id>` selects. A `?broker=` or `?phone=` parameter in
 * the URL still overrides whichever client is in play.
 */
export const DEFAULT_BROKER_NAME = DEFAULT_CLIENT_NAME;
export const DEFAULT_BRAND_COLOR = "#0e7c66";

/** Copy for the sticky bottom banner. `{broker}` is replaced at render time. */
export const DEMO_BANNER_TEXT =
  "This is a demo prototype for {broker}. Want your own website like this?";
export const DEMO_BANNER_CTA = "Get in touch";

export const SITE_CITY = "Gurgaon";

export function agencyWhatsAppUrl(brokerName: string) {
  const message = `Hi ${AGENCY_NAME}, I saw the demo website prototype${
    brokerName ? ` for ${brokerName}` : ""
  } and I'd like one for my business.`;
  return `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

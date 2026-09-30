/**
 * Edit this file to rebrand the demo before sending it to a broker.
 * Nothing else in the app hard-codes these values.
 */

/** Your own WhatsApp number, used by the sticky "get your own website" banner. */
export const AGENCY_WHATSAPP = "91XXXXXXXXXX";

/** Your agency, shown in the demo banner and footer credit. */
export const AGENCY_NAME = "R&S Digital Group";

/** Fallback broker identity when the URL has no ?broker= parameter. */
export const DEFAULT_BROKER_NAME = "Your Brand Name";
export const DEFAULT_BROKER_PHONE = "9999999999";
export const DEFAULT_BRAND_COLOR = "#0e7c66";

/** Copy for the sticky bottom banner. `{broker}` is replaced at render time. */
export const DEMO_BANNER_TEXT =
  "This is a demo prototype for {broker}. Want your own website like this?";
export const DEMO_BANNER_CTA = "Get in touch";

export const SITE_CITY = "Gurgaon";
export const SITE_REGION = "Haryana, India";

export function agencyWhatsAppUrl(brokerName: string) {
  const message = `Hi ${AGENCY_NAME}, I saw the demo website prototype${
    brokerName ? ` for ${brokerName}` : ""
  } and I'd like one for my business.`;
  return `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

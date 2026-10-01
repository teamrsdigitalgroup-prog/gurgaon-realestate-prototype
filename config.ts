/**
 * Edit this file to rebrand the demo before sending it to a broker.
 * Nothing else in the app hard-codes these values.
 */

/** Your own WhatsApp number, used by the sticky "get your own website" banner. */
export const AGENCY_WHATSAPP = "91XXXXXXXXXX";

/** Your agency, shown in the demo banner and footer credit. */
export const AGENCY_NAME = "R&S Digital Group";

/**
 * The broker this copy of the demo is built for. A `?broker=` parameter in the
 * URL still overrides all of it, so one deployment can serve several leads.
 */
export const DEFAULT_BROKER_NAME = "Accurate Vision Home";
export const DEFAULT_BROKER_PHONE = "9315530702";
export const DEFAULT_BRAND_COLOR = "#0e7c66";

/** Office address, printed in the footer and on the contact page. */
export const OFFICE_ADDRESS = [
  "Shop No. 109, 2nd Floor",
  "SS Omnia, Sector 86",
  "Gurugram 122012, Haryana",
] as const;

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

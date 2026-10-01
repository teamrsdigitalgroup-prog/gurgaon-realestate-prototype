import {
  DEFAULT_BRAND_COLOR,
  DEFAULT_BROKER_NAME,
  DEFAULT_BROKER_PHONE,
} from "@/config";

export type Broker = {
  /** Display name, e.g. "Sharma Properties". */
  name: string;
  /** True when the URL carried no ?broker=, so copy can stay generic. */
  isPlaceholder: boolean;
  /** "SP" — drawn as the logo mark. */
  initials: string;
  /** 10 digits, no country code. */
  phone: string;
  /** "+91 99999 99999" */
  phoneDisplay: string;
  /** Brand colour as #rrggbb. */
  color: string;
  /** Readable text colour on top of `color`. */
  onColor: string;
  /** Query string that carries this identity to the next page. */
  params: string;
  whatsappUrl: string;
  telUrl: string;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const BROKER_PARAM_KEYS = ["broker", "phone", "color"] as const;

function first(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

/** Collapse whitespace and cap length so a hostile URL cannot break the layout. */
function cleanName(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 48);
}

export function initialsOf(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s&]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function normalizePhone(value: string | undefined): string {
  const digits = (value ?? "").replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return local.length === 10 ? local : DEFAULT_BROKER_PHONE;
}

function normalizeColor(value: string | undefined): string {
  if (!value) return DEFAULT_BRAND_COLOR;
  const hex = value.startsWith("#") ? value.slice(1) : value;
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    const [r, g, b] = hex.split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (/^[0-9a-f]{6}$/i.test(hex)) return `#${hex.toLowerCase()}`;
  return DEFAULT_BRAND_COLOR;
}

/** WCAG relative luminance, used to keep button labels readable on any brand colour. */
export function readableTextOn(hexColor: string): string {
  const hex = hexColor.slice(1);
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance =
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  return luminance > 0.45 ? "#111827" : "#ffffff";
}

export function formatPhone(phone: string): string {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

export function buildBroker(input: {
  name?: string;
  phone?: string;
  color?: string;
}): Broker {
  const providedName = input.name ? cleanName(input.name) : "";
  const isPlaceholder = providedName.length === 0;
  const name = isPlaceholder ? DEFAULT_BROKER_NAME : providedName;
  const phone = normalizePhone(input.phone);
  const color = normalizeColor(input.color);

  const params = new URLSearchParams();
  if (!isPlaceholder) params.set("broker", name);
  if (phone !== DEFAULT_BROKER_PHONE) params.set("phone", phone);
  if (color !== DEFAULT_BRAND_COLOR) params.set("color", color);

  const message = `Hi ${name}, I found your website and I'm interested in a property in Gurgaon.`;

  return {
    name,
    isPlaceholder,
    // A name of pure punctuation yields no initials, so fall back to the default.
    initials: initialsOf(name) || initialsOf(DEFAULT_BROKER_NAME),
    phone,
    phoneDisplay: formatPhone(phone),
    color,
    onColor: readableTextOn(color),
    params: params.toString(),
    whatsappUrl: `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
    telUrl: `tel:+91${phone}`,
  };
}

/** Server-side entry point: every page resolves the broker from its own URL. */
export function resolveBroker(searchParams: RawSearchParams): Broker {
  return buildBroker({
    name: first(searchParams.broker),
    phone: first(searchParams.phone),
    color: first(searchParams.color),
  });
}

/** Append the broker identity to an internal href so navigation stays personalised. */
export function withBrokerParams(href: string, params: string): string {
  if (!params) return href;
  const [path, existing] = href.split("?");
  const merged = new URLSearchParams(existing);
  for (const [key, value] of new URLSearchParams(params)) merged.set(key, value);
  return `${path}?${merged.toString()}`;
}

/** Page titles read "Buy Property in Gurgaon | Sharma Properties". */
export function pageTitle(broker: Broker, section?: string): string {
  return section ? `${section} | ${broker.name}` : broker.name;
}

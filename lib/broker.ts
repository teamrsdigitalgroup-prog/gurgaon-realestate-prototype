import { DEFAULT_BRAND_COLOR, DEFAULT_BROKER_NAME } from "@/config";
import {
  CLIENT_PARAM,
  DEFAULT_CLIENT_ID,
  localPhone,
  resolveClient,
  type Client,
} from "@/lib/clients";

export type Broker = {
  /** Which clients.json entry this page resolved to. */
  client: Client;
  /** Display name, e.g. "Sharma Properties". */
  name: string;
  /** True when the URL carried no ?broker=, so copy can stay generic. */
  isPlaceholder: boolean;
  /** "SP" — drawn as the logo mark. */
  initials: string;
  /** Office address, or undefined when this client has none on file. */
  address?: string;
  /** 10 digits, no country code; undefined when this client has no number. */
  phone?: string;
  /** "+91 99999 99999" */
  phoneDisplay?: string;
  /** Brand colour as #rrggbb. */
  color: string;
  /** Readable text colour on top of `color`. */
  onColor: string;
  /** Query string that carries this identity to the next page. */
  params: string;
  /** Undefined alongside `phone`: callers hide the button instead. */
  whatsappUrl?: string;
  telUrl?: string;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const BROKER_PARAM_KEYS = [
  CLIENT_PARAM,
  "broker",
  "phone",
  "color",
] as const;

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
  /** Client id from `?c=`; unknown ids fall back to the default entry. */
  client?: string;
  name?: string;
  phone?: string;
  color?: string;
}): Broker {
  const client = resolveClient(input.client);
  const providedName = input.name ? cleanName(input.name) : "";
  const isPlaceholder = providedName.length === 0;
  const name = isPlaceholder ? client.name : providedName;
  const overridePhone = localPhone(input.phone);
  const phone = overridePhone ?? client.phone;
  const color = normalizeColor(input.color);

  const params = new URLSearchParams();
  if (client.id !== DEFAULT_CLIENT_ID) params.set(CLIENT_PARAM, client.id);
  if (!isPlaceholder) params.set("broker", name);
  if (overridePhone) params.set("phone", overridePhone);
  if (color !== DEFAULT_BRAND_COLOR) params.set("color", color);

  const message = `Hi ${name}, I found your website and I'm interested in a property in Gurgaon.`;

  return {
    client,
    name,
    isPlaceholder,
    // A name of pure punctuation yields no initials, so fall back to the default.
    initials: initialsOf(name) || initialsOf(DEFAULT_BROKER_NAME),
    address: client.address,
    phone,
    phoneDisplay: phone ? formatPhone(phone) : undefined,
    color,
    onColor: readableTextOn(color),
    params: params.toString(),
    whatsappUrl: phone
      ? `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`
      : undefined,
    telUrl: phone ? `tel:+91${phone}` : undefined,
  };
}

/** Server-side entry point: every page resolves the broker from its own URL. */
export function resolveBroker(searchParams: RawSearchParams): Broker {
  return buildBroker({
    client: first(searchParams[CLIENT_PARAM]),
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

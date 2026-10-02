import clientsJson from "@/clients.json";

/** `?c=rawat-street` picks which client's details the whole site renders. */
export const CLIENT_PARAM = "c";

/** The entry used when the URL has no `?c=`, or names an id we don't know. */
export const DEFAULT_CLIENT_ID = "default";

export type Client = {
  /** The key in clients.json, e.g. "rawat-street". */
  id: string;
  /** Company name shown everywhere on the site. */
  name: string;
  /**
   * Office address, or undefined when clients.json has none for this client.
   * Missing details are hidden rather than filled in from another client, so a
   * half-filled entry never shows a competitor's address or number.
   */
  address?: string;
  /** 10 local digits, no country code; undefined when the entry has none. */
  phone?: string;
};

type ClientEntry = { name?: string; address?: string; phone?: string };

const clients = clientsJson as Record<string, ClientEntry | undefined>;

function text(value: string | undefined): string | undefined {
  const trimmed = value?.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed : undefined;
}

/** clients.json stores "+919792069206"; the UI wants the last 10 digits. */
export function localPhone(value: string | undefined): string | undefined {
  const digits = (value ?? "").replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return local.length === 10 ? local : undefined;
}

export const DEFAULT_CLIENT_NAME =
  text(clients[DEFAULT_CLIENT_ID]?.name) ?? "Property Consultants";

function toClient(id: string, entry: ClientEntry): Client {
  return {
    id,
    name: text(entry.name) ?? DEFAULT_CLIENT_NAME,
    address: text(entry.address),
    phone: localPhone(entry.phone),
  };
}

/**
 * The JSON is imported at build time rather than fetched, so the client's
 * details are already in the first byte of HTML and never flash.
 */
export function resolveClient(id: string | undefined): Client {
  const key = id?.trim();
  const entry = key ? clients[key] : undefined;
  if (!key || !entry || !text(entry.name)) {
    return toClient(DEFAULT_CLIENT_ID, clients[DEFAULT_CLIENT_ID] ?? {});
  }
  return toClient(key, entry);
}

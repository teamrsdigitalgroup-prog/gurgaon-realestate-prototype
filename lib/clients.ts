import clientsJson from "@/clients.json";

/** `?c=rawat-street` picks which client's name the whole site renders. */
export const CLIENT_PARAM = "c";

/** The entry used when the URL has no `?c=`, or names an id we don't know. */
export const DEFAULT_CLIENT_ID = "default";

export type Client = {
  /** The key in clients.json, e.g. "rawat-street". */
  id: string;
  /** Company name shown everywhere on the site. */
  name: string;
};

const clients = clientsJson as Record<string, { name?: string } | undefined>;

export const DEFAULT_CLIENT_NAME =
  clients[DEFAULT_CLIENT_ID]?.name?.trim() || "Property Consultants";

/**
 * The JSON is imported at build time rather than fetched, so the client's name
 * is already in the first byte of HTML and never flashes the default.
 */
export function resolveClient(id: string | undefined): Client {
  const key = id?.trim();
  const name = key ? clients[key]?.name?.trim() : undefined;
  if (!key || !name) {
    return { id: DEFAULT_CLIENT_ID, name: DEFAULT_CLIENT_NAME };
  }
  return { id: key, name };
}

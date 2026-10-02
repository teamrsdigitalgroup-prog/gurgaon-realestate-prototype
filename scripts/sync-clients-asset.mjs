import { copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * clients.json lives at the repo root so it is easy to edit, but Next only
 * serves files from public/. Copying it before dev and build means the deployed
 * Cloudflare Worker also exposes /clients.json, which is the quickest way to
 * confirm a newly added client actually made it into the live bundle.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

await copyFile(join(root, "clients.json"), join(root, "public", "clients.json"));

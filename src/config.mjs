import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const CONFIG_FILE = "qc.config.json";

export const defaults = {
  throwawayDb: {
    schemaCommand: null,
  },
};

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Later wins. An array replaces; an object merges key by key. */
export function merge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) return override ?? base;
  const out = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isPlainObject(value) && isPlainObject(base[key]) ? merge(base[key], value) : value;
  }
  return out;
}

/** Read the caller's throwawayDb settings. Absent is legal. */
export function load(root = process.cwd()) {
  const file = path.join(root, CONFIG_FILE);
  const user = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  return merge(defaults, { throwawayDb: user?.throwawayDb ?? {} });
}

import fs from "node:fs/promises";
import path from "node:path";

const exportDir = path.resolve(
  process.cwd(),
  "use_these_ai/letterboxd_export_oyildiran"
);
const watchedPath = path.join(exportDir, "watched.csv");
const outPath = path.resolve(
  process.cwd(),
  "src/data/letterboxd-countries.json"
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      field += '"';
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && (c === "," || c === "\n" || c === "\r")) {
      if (c === "\r" && next === "\n") continue;
      row.push(field);
      field = "";
      if (c === "\n") {
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      }
      continue;
    }
    field += c;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

function normalizeUri(uri) {
  return (uri ?? "").trim().replace(/\/+$/g, "");
}

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function extractSlugs(html, kind) {
  // kind: "country" or "language"
  // letterboxd links look like /films/country/united-states/ or /films/language/french/
  const rx = new RegExp(`/films/${kind}/([^/]+)/`, "gi");
  const out = [];
  let m;
  while ((m = rx.exec(html))) out.push(m[1]);
  return uniq(out);
}

async function resolveCanonical(url) {
  // boxd.it short links redirect to canonical letterboxd.com/film/...; we want that as cache key.
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; AcademicSiteBot/1.0; +https://omeryildiran.github.io)"
    }
  });
  // fetch() gives us the final URL after redirects in res.url
  return { finalUrl: normalizeUri(res.url), html: await res.text(), ok: res.ok };
}

async function main() {
  const csv = await fs.readFile(watchedPath, "utf-8");
  const rows = parseCsv(csv);
  const header = rows[0] ?? [];
  const uriIdx = header.indexOf("Letterboxd URI");
  if (uriIdx < 0) throw new Error("Letterboxd URI column not found in watched.csv");

  const rawUris = rows
    .slice(1)
    .map((r) => normalizeUri(r[uriIdx] ?? ""))
    .filter(Boolean);
  const uris = uniq(rawUris);

  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(outPath, "utf-8"));
  } catch {
    existing = {};
  }

  const pending = uris.filter((u) => existing[u] == null);
  console.log(
    `Countries cache: existing=${Object.keys(existing).length}, total=${uris.length}, pending=${pending.length}`
  );

  let fetched = 0;
  for (const uri of pending) {
    await sleep(200);
    try {
      const { finalUrl, html, ok } = await resolveCanonical(uri);
      if (!ok) {
        existing[uri] = null;
        continue;
      }

      // If the canonical differs, alias both keys to the same value.
      const countries = extractSlugs(html, "country");
      const languages = extractSlugs(html, "language");
      const value = { countries, languages, canonical: finalUrl };

      existing[uri] = value;
      if (finalUrl && finalUrl !== uri) existing[finalUrl] = value;

      fetched++;
      if (fetched % 25 === 0) {
        await fs.writeFile(outPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");
        console.log(`Saved progress: ${fetched} new entries`);
      }
    } catch {
      existing[uri] = null;
    }
  }

  await fs.writeFile(outPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");
  console.log(`Done. Added ${fetched} new entries.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


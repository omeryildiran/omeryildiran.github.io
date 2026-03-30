import fs from "node:fs/promises";
import path from "node:path";

const exportDir = path.resolve(
  process.cwd(),
  "use_these_ai/letterboxd_export_oyildiran"
);
const diaryPath = path.join(exportDir, "diary.csv");
const outPath = path.resolve(process.cwd(), "src/data/letterboxd-posters.json");

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

function pickOgImage(html) {
  // Try og:image first, then twitter:image.
  const og = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i
  );
  if (og?.[1]) return og[1];
  const tw = html.match(
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i
  );
  return tw?.[1] ?? null;
}

async function main() {
  const csv = await fs.readFile(diaryPath, "utf-8");
  const rows = parseCsv(csv);
  const header = rows[0] ?? [];
  const uriIdx = header.indexOf("Letterboxd URI");
  if (uriIdx < 0) throw new Error("Letterboxd URI column not found in diary.csv");

  const uris = Array.from(
    new Set(
      rows
        .slice(1)
        .map((r) => (r[uriIdx] ?? "").trim())
        .filter(Boolean)
    )
  );

  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(outPath, "utf-8"));
  } catch {
    existing = {};
  }

  let fetched = 0;
  for (const uri of uris) {
    if (existing[uri]) continue;
    // polite rate limit
    await sleep(180);
    try {
      const res = await fetch(uri, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; AcademicSiteBot/1.0; +https://omeryildiran.github.io)"
        }
      });
      if (!res.ok) {
        existing[uri] = null;
        continue;
      }
      const html = await res.text();
      const img = pickOgImage(html);
      existing[uri] = img;
      fetched++;
      if (fetched % 50 === 0) {
        await fs.writeFile(outPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");
        console.log(`Saved progress: ${fetched} new posters`);
      }
    } catch (e) {
      existing[uri] = null;
    }
  }

  await fs.writeFile(outPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");
  console.log(`Done. Added ${fetched} new poster URLs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


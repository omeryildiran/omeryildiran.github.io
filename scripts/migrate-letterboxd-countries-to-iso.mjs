import fs from "node:fs/promises";
import path from "node:path";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json" with { type: "json" };

countries.registerLocale(en);

const inOutPath = path.resolve(
  process.cwd(),
  "src/data/letterboxd-countries.json"
);

const OVERRIDES = {
  "united-states": "US",
  "united-kingdom": "GB",
  "south-korea": "KR",
  "north-korea": "KP",
  "czech-republic": "CZ",
  "russia": "RU",
  "vietnam": "VN",
  "iran": "IR",
  "syria": "SY",
  "bolivia": "BO",
  "venezuela": "VE",
  "taiwan": "TW",
  "palestine": "PS",
  "hong-kong": "HK",
  "ivory-coast": "CI"
};

function titleCaseFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function slugToIso2(slug) {
  if (!slug) return null;
  if (OVERRIDES[slug]) return OVERRIDES[slug];
  const name = titleCaseFromSlug(slug);
  const code = countries.getAlpha2Code(name, "en");
  return code ?? null;
}

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

async function main() {
  const raw = JSON.parse(await fs.readFile(inOutPath, "utf-8"));
  let updated = 0;

  for (const [k, v] of Object.entries(raw)) {
    if (!v || typeof v !== "object") continue;
    if (Array.isArray(v.countryCodes)) continue;
    const slugs = Array.isArray(v.countries) ? v.countries : [];
    const codes = uniq(slugs.map(slugToIso2));
    raw[k] = { ...v, countryCodes: codes };
    updated++;
  }

  await fs.writeFile(inOutPath, JSON.stringify(raw, null, 2) + "\n", "utf-8");
  console.log(`Done. Updated ${updated} entries with ISO codes.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


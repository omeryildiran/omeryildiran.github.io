import { getCollection } from "astro:content";
import { site as siteMeta } from "../site";

export async function GET({ site }) {
  const base = site?.toString() ?? "https://omeryildiran.github.io";
  const notes = (await getCollection("notes"))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 20);

  const items = notes
    .map((n) => {
      const url = new URL(`/notes/${n.slug}/`, base).toString();
      const title = escapeXml(n.data.title);
      const desc = escapeXml(n.data.description ?? "");
      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<pubDate>${n.data.date.toUTCString()}</pubDate>`,
        desc ? `<description>${desc}</description>` : "",
        "</item>"
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0"><channel>` +
    `<title>${escapeXml(siteMeta.name)}</title>` +
    `<link>${base}</link>` +
    `<description>${escapeXml(siteMeta.description)}</description>` +
    items +
    `</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}


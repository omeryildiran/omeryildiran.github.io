## New site (Astro)

This repo now contains a lightweight, easily customizable static site built with **Astro**.

### Why Astro (vs Jekyll)

- **Markdown-first**: pages and posts stay in Markdown.
- **Polished but simple**: component-based layouts without a “heavy app”.
- **Great math support**: KaTeX rendering via Markdown plugins.
- **Static hosting**: `astro build` outputs plain HTML/CSS/JS to `dist/`.
- **Low maintenance**: no runtime server, no database, no framework lock-in.

### Quick start

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

### Content

- Pages: `src/pages/` (Markdown or `.astro`)
- Notes/blog: `src/content/notes/*.md`

### Math

Write math in Markdown:

- Inline: `\(a^2 + b^2 = c^2\)`
- Block:

```text
\[
\hat{x}=\arg\max_x \log p(y \mid x) + \log p(x)
\]
```

### GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on every push to `main`.


# Newsletter print redesign

Date: 2026-09-13. Source: "Substack Newsletter Print Layouts5.pdf" (Claude Design), a two-page print edition of Christin's newsletter.

## Goal

Make christinchong.com look like the print newsletter: cream paper, slab serif type, letterspaced small labels, a tan masthead card, thin rules, and a footer strip. Light theme only.

## Decisions (approved)

- Roboto Slab everywhere (body, headings, labels). Menlo only for code.
- Scope: header, footer, palette, masthead card on notes and pages. Body stays single column.
- Dark mode removed: toggle, script, include, and dark color block deleted.
- Circular stamp seal on the homepage masthead reading TYPED · & · POSTED.

## Palette

| Token | Hex | Use |
|---|---|---|
| paper | #F4EFE4 | page background |
| paper-2 | #F7F1E4 | panels, code |
| ink | #201F1D | text, rules |
| ink-2 | #3B2D20 | secondary text |
| ink-3 | #6B6053 | tertiary text |
| tan | #C8A76E | masthead fill, accents, link underline |
| tan-deep | #8A6A33 | link text (contrast on cream) |
| tan-wash | #EFE3C9 | link hover background |
| rule-soft | #D9CFBA | light rules, borders |

Legacy variable names (`--color-bg`, `--color-link`, etc.) keep working as aliases so Pagefind and the graph styles need no rewrite.

## Type

- Roboto Slab variable font, self-hosted in `assets/fonts/`, Apache 2.0 license file alongside.
- Body 17px / 1.65. Headings weight 500. h1 in masthead 2.25rem.
- Label style: 0.6875rem, weight 500, uppercase, letter-spacing 0.14em. Used for running head, nav, eyebrows, bylines, footer headings and strip.

## Components

- **Running head**: site title left, nav right, all label style. Dropdowns kept. Below it a double rule (2px over 1px).
- **Masthead card** (`_includes/masthead.html`): tan card, inset border. Eyebrow "CHRISTIN CHONG, PHD · date" (notes) or "· christinchong.com" (pages, overridable with `eyebrow` front matter). Title from `masthead_title` or `title`. Optional `subtitle`. Rule. Byline: name, section (nested pages) or NOTE (notes), tags joined with " · ". Homepage adds the seal. Seal hidden under 700px.
- **Body**: single column, max 46rem. Section divider is a 1px ink rule. Blockquote has a tan left rule. Images get a soft border like the PDF figure.
- **Backlinks**: heading styled like the PDF section head ("[2.0] ..." rules above and below), boxes flat with a rule on top.
- **Footer**: three columns headed "[1.0] NOTES", "[2.0] PROJECTS", "[3.0] HIRE ME" with thin column rules on desktop. Socials, Substack embed (tan border), meta, then the bottom strip: rule, "WRITTEN AT HOME, SHARED WITH LOVE" left, "TEXT 252-GUMLEAF · GETGUMLEAF.COM" right.
- **Homepage sections grid**: moved from inline CSS in `index.md` to the stylesheet, restyled as indexed entries with a rule on top.

## Files

- `styles.scss`, `_sass/_style.scss`: rewritten.
- `_includes/nav.html`, `_includes/footer.html`: rewritten. `_includes/masthead.html`: new.
- `_layouts/default.html`, `note.html`, `page.html`: masthead added, theme script removed.
- `_pages/index.md`, `notes.md`, `search.md`, `unlinked/graph.html`: page-level h1 removed (masthead carries it).
- Deleted: `_includes/theme-toggle.html`, `assets/js/theme-toggle.js`.
- `CLAUDE.md`: theme and typography sections updated.

## Verification

`bundle exec jekyll build --trace` succeeds. Homepage, a note, a nested page, and the graph page checked in a browser at desktop and 400px width.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based digital garden with Roam-style bidirectional linking. The visual design is modelled on Christin's print newsletter layout (cream paper, Roboto Slab, letterspaced small labels, a tan masthead card, thin rules, an indexed footer). Light theme only. See `docs/superpowers/specs/2026-09-13-newsletter-print-redesign-design.md`.

**Key Features:**
- Double-bracket Wiki syntax (`[[note title]]`) for linking
- Automatic backlink generation
- Interactive graph visualization (dedicated `/graph` page)
- Topic/tag-based organization
- Dropdown navigation menus (pure CSS, hover-based)
- Hierarchical footer navigation mirroring main nav

## Development Commands

### Local Development
```bash
# Install dependencies (requires Ruby 3.0+)
bundle install

# Run local development server
bundle exec jekyll serve

# Build the site
bundle exec jekyll build --trace
```

The site will be available at `http://localhost:4000` when running locally.

### Deployment
The site is configured for Netlify deployment with the build command `jekyll build --trace` outputting to `_site/` directory (see netlify.toml:1-3).

## Architecture

### Design System
Palette, type scale and components live in `_sass/_style.scss`; font faces in `styles.scss`.

**Palette (CSS custom properties on `:root`):** `--color-paper` #F4EFE4, `--color-ink` #201F1D, `--color-tan` #C8A76E (masthead, accents), `--color-tan-deep` #8A6A33 (links), `--color-rule` / `--color-rule-soft`. Older names (`--color-bg`, `--color-link`, `--color-border`, `--graph-*`) are kept as aliases for Pagefind and the graph. There is no dark mode.

**Type:** Roboto Slab (variable, self-hosted in `assets/fonts/`) for body, headings and labels. Menlo only for code. The `label` mixin (11px, uppercase, 0.14em tracking) is the letterspaced style used for the running head, nav, eyebrows, bylines and footer headings.

**Masthead card:** `_includes/masthead.html`, included by the `note` and `page` layouts. Renders the tan card with eyebrow, title, optional subtitle, rule and byline. Front matter overrides: `masthead_title`, `eyebrow`, `subtitle`, `tags`. The homepage (`id: home`) also shows the circular seal. Because the masthead renders the title, pages should not start with a `# Title` heading.

**Header:** `_includes/nav.html` renders the running head (site title left, nav right) and the double rule.

**Footer:** `_includes/footer.html` renders indexed columns ("[1.0] Notes" ...), socials, Substack embed, meta, and the bottom strip.

### Navigation Structure
Data-driven hierarchical navigation system using `_data/navigation.yml`:

**Categories:** Notes, Projects (with 3 subitems), Hire Me (with 3 subitems), About, Now
**Structure:** Hierarchical with `children` array support for dropdown menus
**Rendering:** `_includes/nav.html` (header with dropdowns), `_includes/footer.html` (expanded hierarchical view)

**Dropdown Implementation:**
- Pure CSS hover-based dropdowns (no JavaScript required)
- Desktop: Hover over "Projects" or "Hire Me" to reveal subitems
- Mobile: Tap to toggle, subitems display inline with left border
- Visual indicator (▾) shows which items have dropdowns
- Dropdown panel uses paper background, ink border and a tan offset shadow
- Smooth transitions and proper z-index layering

**Footer Navigation:**
- Mirrors main navigation structure exactly
- All subitems always visible (no hover/click required)
- Hierarchical indentation for visual clarity
- Main categories in bold, subitems in secondary color

### Core Plugin System
The site relies on custom Jekyll plugins in `_plugins/` that run during the build process:

**bidirectional_links_generator.rb** (most critical plugin):
- Converts `[[note title]]` or `[[filename]]` syntax to HTML anchor tags
- Supports labeled links: `[[note title|custom label]]`
- Generates backlinks by tracking which notes link to each other
- Creates `_includes/notes_graph.json` with graph data (nodes and edges) for visualization
- Marks non-existent links with special styling instead of creating broken links

**Other plugins**:
- `empty_front_matter_note_injector.rb` - Ensures all notes have front matter
- `embed_tweets.rb` - Handles tweet embedding (configurable in _config.yml)
- `open_external_links_in_new_tab.rb` - Opens external links in new tabs
- `markdown-highlighter.rb` - Adds syntax highlighting to markdown code blocks
- `last_modified_at_generator.rb` - Tracks last modification time

### Collections & Content Structure
- `_notes/` - Main collection of notes (output: true, permalink: /:slug)
  - Can include `tags: [tag1, tag2]` in front matter for topic organization
- `_pages/` - Static pages with hierarchical organization:
  - Main: `writing.md`, `about.md`, `now.md`
  - **Projects (with dropdown):**
    - `projects.md` (parent page)
    - `projects/reframe-science.md`
    - `projects/ok-banger-show.md`
    - `projects/debug-your-meditation.md`
  - **Hire Me (with dropdown):**
    - `hire.md` (parent page)
    - `hire/healthcare-consulting.md`
    - `hire/creativity-coaching.md`
    - `hire/meditation-support.md`
  - **Unlinked (legacy/archived pages):**
    - `unlinked/contact.md`, `unlinked/graph.html`, `unlinked/topics.html`
    - `unlinked/offerings/`, `unlinked/speaking/`, `unlinked/about/` (subdirectories)
    - Accessible via direct URL but not in navigation
- Notes can be nested in subdirectories (e.g., `_notes/animals/cats.md`)
- All notes use the `note` layout which includes backlinks (graph moved to dedicated page)
- Pages use the `page` layout

### Layouts
- `default.html` - Base layout: running head (`_includes/nav.html`), main, footer (`_includes/footer.html`)
- `note.html` - Extends default: masthead card, content, backlinks list
- `page.html` - Extends default: masthead card, content

### Graph Visualization
- **Location:** Dedicated `/graph` page (moved from individual notes)
- Rendered using D3.js (v5.16.0) loaded from CDN
- Graph data comes from `notes_graph.json` generated by bidirectional_links_generator.rb
- Interactive features: click to navigate, hover to highlight connections
- Node size based on number of connections (3-12px range)
- Colors come from the `--graph-*` custom properties
- Styled in `_includes/notes_graph.html`

### Topic/Tag System
- **Topic page:** `/topics` displays all tags with note counts
- **Tag cloud:** Visual browse by topic with pill-style tags
- **Tag listing:** Shows all notes under each tag
- **Front matter:** Add `tags: [tag1, tag2]` to notes
- No plugin required - pure Liquid templating

## Configuration Notes

**_config.yml key settings**:
- `use_html_extension: false` - URLs don't end in .html (set to true for hosts like Neocities)
- `open_external_links_in_new_tab: true` - External links open in new tabs
- `embed_tweets: false` - Disabled for privacy
- Custom plugin: Uses forked `jekyll-last-modified-at` with git submodule support

**_data/navigation.yml**:
- **Main navigation** - Hierarchical structure with dropdown support
  - Notes, Projects (3 children), Hire Me (3 children), About, Now
  - Use `children:` array to add dropdown items
  - Each child has `title` and `url` fields
- **Footer navigation** - Mirrors main navigation exactly
  - Same structure as main nav
  - All items displayed expanded (no hover required)
- **Social links** - Twitter, LinkedIn, GitHub with icons
  - Update URLs with actual social media profiles

**Adding dropdown items:**
```yaml
- title: Your Category
  url: /category
  children:
    - title: Subitem One
      url: /category/subitem-one
    - title: Subitem Two
      url: /category/subitem-two
```

**Typography**:
- Font: Roboto Slab variable (loaded via @font-face in `styles.scss` from `assets/fonts/`); Menlo for code
- Base size: 17px desktop, 16px mobile
- Line height: 1.65 (body), 1.2 (headings)

## Important Constraints

**GitHub Pages Limitation**: This template uses custom plugins, so it cannot be deployed directly to GitHub Pages without building locally first. The `bidirectional_links_generator.rb` plugin is essential for generating `notes_graph.json` and GitHub Pages doesn't support custom plugins.

**Link Syntax Processing**: The bidirectional link processing happens in a specific order:
1. `[[note title|custom label]]` with title from note data
2. `[[filename|custom label]]` with filename
3. `[[note title]]` without label using note data title
4. `[[filename]]` without label using filename
5. Any remaining `[[text]]` becomes a styled "invalid link"

This order matters when modifying the link generation logic.

**Search**: Pagefind, built by Netlify after Jekyll (`netlify.toml`). The search UI lives in `_pages/notes.md` and `_pages/search.md`.

## Design Philosophy

The site follows these design principles:

1. **Print-Inspired** - looks like the mailed newsletter: paper, slab serif, rules, labels
2. **Minimal & Typography-Focused** - the type does the work; few boxes, no shadows
3. **Professional Structure** - categorical organization mirrored in header and footer
4. **Accessible** - visible focus states, semantic HTML, keyboard navigation
5. **Content-First** - design serves content, not the other way around

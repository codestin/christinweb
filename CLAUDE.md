# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based digital garden with Roam-style bidirectional linking, featuring a professional design inspired by stephango.com (minimalism) and christinchong.com (navigation structure). It uses Menlo typography, comprehensive dark mode support, and extensive keyboard shortcuts.

**Key Features:**
- Double-bracket Wiki syntax (`[[note title]]`) for linking
- Automatic backlink generation
- Interactive graph visualization (dedicated `/graph` page)
- Full dark/light theme system with keyboard toggle
- Comprehensive keyboard shortcuts (search, navigation, focus mode)
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

### Keyboard Shortcuts (for testing)
- **d** - Toggle dark/light mode
- **?** - Show keyboard shortcuts help
- **/** or **Cmd+K** - Open search/command palette
- **f** - Toggle focus mode
- **g+h** - Go to home
- **g+n** - Go to writing
- **g+g** - Go to graph page
- **g+a** - Go to about
- **Esc** - Close overlays

## Architecture

### Theme System
The site uses CSS custom properties for a complete dark/light theme system:

**Theme Toggle:**
- JavaScript: `assets/js/theme-toggle.js`
- Component: `_includes/theme-toggle.html`
- Storage: localStorage with key `theme-preference`
- System preference detection via `prefers-color-scheme`

**Color Variables:**
- Defined in `_sass/_style.scss` under `:root` (light) and `[data-theme="dark"]` (dark)
- All components use CSS custom properties: `var(--color-bg)`, `var(--color-text)`, etc.
- Graph visualization colors also theme-aware

### Keyboard Shortcuts System
Comprehensive keyboard navigation implemented in `assets/js/keyboard-shortcuts.js`:

**Navigation shortcuts:** g+h (home), g+n (writing), g+g (graph), g+a (about)
**Utility shortcuts:** / (search), d (dark mode), f (focus mode), ? (help)
**Components:** `_includes/shortcuts-help.html`, `_includes/command-palette.html`

### Navigation Structure
Data-driven hierarchical navigation system using `_data/navigation.yml`:

**Categories:** Writing, Projects (with 3 subitems), Hire Me (with 3 subitems), About, Now
**Structure:** Hierarchical with `children` array support for dropdown menus
**Rendering:** `_includes/nav.html` (header with dropdowns), `_includes/footer.html` (expanded hierarchical view)

**Dropdown Implementation:**
- Pure CSS hover-based dropdowns (no JavaScript required)
- Desktop: Hover over "Projects" or "Hire Me" to reveal subitems
- Mobile: Tap to toggle, subitems display inline with left border
- Visual indicator (▾) shows which items have dropdowns
- Dark mode support via CSS custom properties
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
- `default.html` - Base layout with:
  - Navigation (`_includes/nav.html`)
  - Footer (`_includes/footer.html`)
  - Theme toggle, shortcuts help, command palette
  - Link previews (`_includes/link-previews.html`)
  - Theme and keyboard shortcuts JavaScript
- `note.html` - Extends default, adds note-specific features:
  - Last modified timestamp
  - Backlinks sidebar showing notes that mention this note
  - **Graph removed** - now on dedicated `/graph` page
- `page.html` - For static pages

### Graph Visualization
- **Location:** Dedicated `/graph` page (moved from individual notes)
- Rendered using D3.js (v5.16.0) loaded from CDN
- Graph data comes from `notes_graph.json` generated by bidirectional_links_generator.rb
- Interactive features: click to navigate, hover to highlight connections
- Node size based on number of connections (3-12px range)
- **Dark mode support:** Uses CSS custom properties for theming
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
  - Writing, Projects (3 children), Hire Me (3 children), About, Now
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
- Font: Menlo (loaded via @font-face in `styles.scss` from `assets/fonts/`)
- Base size: 1rem (mobile), 1.1rem (desktop)
- Line height: 1.7 (body), 1.3 (headings)

## Important Constraints

**GitHub Pages Limitation**: This template uses custom plugins, so it cannot be deployed directly to GitHub Pages without building locally first. The `bidirectional_links_generator.rb` plugin is essential for generating `notes_graph.json` and GitHub Pages doesn't support custom plugins.

**Link Syntax Processing**: The bidirectional link processing happens in a specific order:
1. `[[note title|custom label]]` with title from note data
2. `[[filename|custom label]]` with filename
3. `[[note title]]` without label using note data title
4. `[[filename]]` without label using filename
5. Any remaining `[[text]]` becomes a styled "invalid link"

This order matters when modifying the link generation logic.

**Search Integration**: The keyboard shortcuts and command palette UI are implemented, but search functionality requires a Jekyll search plugin:
- Recommended: Simple-Jekyll-Search (client-side, no backend needed)
- Alternative: Lunr.js or Algolia
- UI is ready at `_includes/command-palette.html`
- Keyboard shortcuts (/ and Cmd+K) are wired up in `assets/js/keyboard-shortcuts.js`

## Design Philosophy

The site follows these design principles:

1. **Minimal & Typography-Focused** - stephango.com-inspired clean aesthetic
2. **Keyboard-First Navigation** - Extensive shortcuts for power users
3. **Professional Structure** - christinchong.com-style categorical organization
4. **Dark Mode Native** - Full theme support, not an afterthought
5. **Accessible** - Proper focus states, semantic HTML, keyboard navigation
6. **Content-First** - Design serves content, not the other way around

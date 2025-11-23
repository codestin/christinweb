# My Digital Garden

A redesigned digital garden featuring Menlo typography, full dark mode support, and comprehensive keyboard shortcuts.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/codestin/christinweb)

## Features

- ✨ **Menlo typography** - Monospace font throughout
- 🌓 **Full dark/light theme** - Toggle with `d` key or button
- ⌨️ **Keyboard shortcuts** - Press `?` to see all shortcuts
- 🗂️ **Professional navigation** - Clean structure with dropdown menus (Writing, Projects, Hire Me, About, Now)
- 📂 **Dropdown menus** - Hover-based navigation with subitems for Projects and Hire Me
- 🕸️ **Interactive graph** - Dedicated `/graph` page showing note connections
- 🏷️ **Topic/tag system** - Browse notes by topic at `/topics`
- [[Wiki-style linking]] - Connect notes with double brackets
- 🔗 **Automatic backlinks** - See which notes mention current note
- 👀 **Link previews** - Hover over links to preview content

## Keyboard Shortcuts

- `d` - Toggle dark/light mode
- `/` or `Cmd+K` - Search (coming soon)
- `f` - Focus mode
- `g` then `h` - Go home
- `g` then `n` - Go to writing
- `g` then `g` - Go to graph
- `?` - Show all shortcuts
- `Esc` - Close overlays

## Quick Start

```bash
# Install dependencies (requires Ruby 3.0+)
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Deploy to Netlify

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Select this repository
4. Netlify will automatically use the build settings from `netlify.toml`
5. Your site will be live in minutes!

Or deploy manually at: https://app.netlify.com/start

**Build settings (already configured in netlify.toml):**
- Build command: `jekyll build --trace`
- Publish directory: `_site`

## Customization

Update these files with your info:
- `_data/navigation.yml` - Modify navigation structure, add/remove dropdown items, update social media URLs
- `_pages/about.md` - Add your bio
- `_pages/now.md` - What you're currently doing
- `_pages/projects/*` - Fill in your project pages
- `_pages/hire/*` - Describe your services
- Navigation supports nested children for dropdown menus

## Structure

```
├── _pages/
│   ├── writing.md
│   ├── projects/
│   │   ├── projects.md (parent page)
│   │   ├── reframe-science.md
│   │   ├── ok-banger-show.md
│   │   └── debug-your-meditation.md
│   ├── hire/
│   │   ├── hire.md (parent page)
│   │   ├── healthcare-consulting.md
│   │   ├── creativity-coaching.md
│   │   └── meditation-support.md
│   ├── about.md
│   ├── now.md
│   └── unlinked/ (archived/legacy pages accessible via direct URL)
│       ├── contact.md, graph.html, topics.html
│       ├── offerings/, speaking/, about/ subdirectories
│       └── legacy navigation pages
├── _notes/ (your wiki-style notes)
├── _sass/ (styling with dark mode + dropdown menus)
└── assets/js/ (theme toggle)
```

## Adding Notes

Create notes in `_notes/` with front matter:

```markdown
---
title: My Note
tags: [productivity, learning]
---

Content here. Link to other notes with [[note title]].
```

## Tech Stack

- Jekyll 4.4
- JetBrains Mono font
- CSS custom properties for theming
- Vanilla JavaScript (no frameworks)
- D3.js for graph visualization

## Credits

Based on the [digital garden Jekyll template](https://github.com/maximevaillancourt/digital-garden-jekyll-template) by Maxime Vaillancourt.

Redesigned with inspiration from:
- [stephango.com](https://stephango.com/) - Minimalist aesthetics
- [christinchong.com](https://christinchong.com/) - Navigation structure

## License

MIT License - see LICENSE file for details.

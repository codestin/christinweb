# My Digital Garden

A redesigned digital garden featuring JetBrains Mono typography, full dark mode support, and comprehensive keyboard shortcuts.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/codestin/christinweb)

## Features

- ✨ **JetBrains Mono typography** - Monospace font throughout
- 🌓 **Full dark/light theme** - Toggle with `d` key or button
- ⌨️ **Keyboard shortcuts** - Press `?` to see all shortcuts
- 🗂️ **Professional navigation** - 5-category structure (Writing, Offerings, Consulting, Speaking, About)
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
- `_data/navigation.yml` - Change social media URLs
- `_pages/about.md` - Add your bio
- `_pages/now.md` - What you're currently doing
- `_pages/contact.md` - Your email address
- Category pages - Fill in your content

## Structure

```
├── _pages/
│   ├── writing/ (essays, newsletter, notes)
│   ├── offerings/ (book, courses, coaching)
│   ├── speaking/ (companies, podcasts, comedy, media-kit)
│   ├── consulting.md
│   ├── about.md
│   ├── graph.html (interactive visualization)
│   ├── topics.html (tag browser)
│   └── contact.md
├── _notes/ (your wiki-style notes)
├── _sass/ (styling with dark mode)
└── assets/js/ (theme toggle, keyboard shortcuts)
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

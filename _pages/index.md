---
layout: page
title: Home
id: home
permalink: /
---

# Welcome

This is my digital garden - a place where ideas grow and connect.

Unlike a traditional blog, this space is less about finished articles and more about evolving thoughts. Notes link to each other, ideas build on one another, and everything grows over time.

<hr class="section-divider">

## Explore

<div class="home-sections">
  <div class="home-section">
    <h3><a href="/writing">Writing</a></h3>
    <p>Essays, newsletter, and interconnected notes</p>
  </div>

  <div class="home-section">
    <h3><a href="/offerings">Offerings</a></h3>
    <p>Books, courses, and coaching</p>
  </div>

  <div class="home-section">
    <h3><a href="/consulting">Consulting</a></h3>
    <p>Strategic guidance and expert advice</p>
  </div>

  <div class="home-section">
    <h3><a href="/speaking">Speaking</a></h3>
    <p>Keynotes, podcasts, and appearances</p>
  </div>
</div>

<hr class="section-divider">

## Recent Notes

{% assign recent_notes = site.notes | sort: "last_modified_at" | reverse %}
{% for note in recent_notes limit: 8 %}
- **[{{ note.title }}]({{ site.baseurl }}{{ note.url }})** - *{{ note.last_modified_at | date: "%b %-d, %Y" }}*
{% endfor %}

[View all notes](/writing/notes) or explore the [graph](/graph).

<hr class="section-divider">

## Getting Started

- Press `?` to see keyboard shortcuts
- Press `d` to toggle dark mode
- Press `/` to search (coming soon)
- Press `f` for focus mode

Learn more [about this site](/about) or [get in touch](/contact).

<style>
.home-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2em;
  margin: 2em 0;
}

.home-section {
  padding: 1.5em;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.home-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home-section h3 {
  margin-top: 0;
  margin-bottom: 0.5em;
}

.home-section h3 a {
  border-bottom: none;
}

.home-section p {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-text-secondary);
}

[data-theme="dark"] .home-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>

---
layout: page
title: Home
id: home
permalink: /
---

# Hi, I'm Christin. Nice to meet ya! 🤝🏻

I'm a biotech strategy leader, a medical education expert, and a neuroscience PhD.

- I **help biotech companies succeed** through strategic engagements and innovative medical education for healthcare providers and patients.
- My research experience and **publications** spanned cancer imaging, multiple sclerosis, and human genetics underlying sleep and circadian rhythms.

I'm also an Interfaith Buddhist chaplain, a leadership coach, and a creative entrepreneur.

- I provide chaplaincy services in modern, accessible, and creative formats: through **writing**, **courses**, **coaching**, and **stand-up comedy**.
- I'm currently hosting an interfaith spiritual community on a new social platform known as **Farcaster**. You are welcomed to join us!

<hr class="section-divider">

## Explore

<div class="home-sections">
  <div class="home-section">
    <h3><a href="/writing">Writing</a></h3>
    <p>Essays from a neuroscience perspective on spirituality, meditation, and creative practice</p>
  </div>

  <div class="home-section">
    <h3><a href="/offerings">Offerings</a></h3>
    <p>Debug Your Meditation book, Insight Writing Club, and 1:1 coaching</p>
  </div>

  <div class="home-section">
    <h3><a href="/consulting">Consulting</a></h3>
    <p>Grow your business by educating your customers</p>
  </div>

  <div class="home-section">
    <h3><a href="/speaking">Speaking</a></h3>
    <p>Available for companies, podcasts, and open-mic performances</p>
  </div>
</div>

<hr class="section-divider">

## Recent Notes

{% assign recent_notes = site.notes | sort: "date" | reverse %}
{% for note in recent_notes limit: 8 %}
- {{ note.date | date: "%Y-%m-%d" }} — [{{ note.title }}]({{ note.url }})
{% endfor %}

[View all notes](/writing/notes) or explore the [graph](/graph).

<hr class="section-divider">

## Getting Started

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

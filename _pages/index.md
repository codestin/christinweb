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

<hr class="section-divider">

## Explore

<div class="home-sections">
  <div class="home-section">
    <h3><a href="/notes" class="internal-link">Notes</a></h3>
    <p>Thoughts, essays, and reflections on spirituality, meditation, and creative practice</p>
  </div>

  <div class="home-section">
    <h3><a href="/projects" class="internal-link">Projects</a></h3>
    <p>Selected projects, case studies, and creative work</p>
  </div>

  <div class="home-section">
    <h3><a href="/hire" class="internal-link">Hire Me</a></h3>
    <p>Work with me on strategic engagements, education, coaching, and more</p>
  </div>

  <div class="home-section">
    <h3><a href="/about" class="internal-link">About</a></h3>
    <p>Learn more about my background, experience, and interests</p>
  </div>

  <div class="home-section">
    <h3><a href="/now" class="internal-link">Now</a></h3>
    <p>What I'm currently working on and thinking about</p>
  </div>
</div>

<hr class="section-divider">

## Recent Notes

{% assign recent_notes = site.notes | sort: "date" | reverse %}
{% for note in recent_notes limit: 8 %}
- {{ note.date | date: "%Y-%m-%d" }} — [{{ note.title }}]({{ note.url }})
{% endfor %}

[View All Notes](/notes)

<style>
.home-sections {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5em;
  margin: 2em 0;
}

.home-section {
  padding: 1.5em;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.home-section:hover,
.home-section:focus-within {
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

.home-section h3 a:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 4px;
  border-radius: 2px;
}

.home-section p {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-text-secondary);
}

[data-theme="dark"] .home-section:hover,
[data-theme="dark"] .home-section:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Tablet and mobile: stack vertically */
@media (max-width: 1024px) {
  .home-sections {
    grid-template-columns: 1fr;
    gap: 1.5em;
  }
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .home-section {
    transition: none;
  }

  .home-section:hover,
  .home-section:focus-within {
    transform: none;
  }
}
</style>

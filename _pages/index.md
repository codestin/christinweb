---
layout: home
title: Home
id: home
permalink: /
masthead_title: "Hi, I'm Christin. Nice to meet ya!"
tags: [Buddhist Chaplain, Builder, Biotech Marketer]
---

I'm a Buddhist Chaplain, Builder, and Biotech marketer. I bring chaplaincy into everyday life through [writing](/notes), [coaching](/hire/coaching), and creative projects that make room for reflection and practice.

I build things that put these interests into practice: from [Kuma](/kuma/), a gentle meditation timer, to [Debug Your Meditation](/projects/debug-your-meditation), a book about finding more joy in meditation.

My work also reaches into biotech. With a neuroscience PhD and a background in strategy and medical education, I help biotech companies connect with healthcare providers and patients. My research has spanned cancer imaging, multiple sclerosis, and the human genetics of sleep and circadian rhythms.

<div class="hero-actions"><a class="button" href="#projects">Explore my work <span aria-hidden="true">↗</span></a><a class="text-link" href="/hire">Work with me <span aria-hidden="true">→</span></a></div>

<!-- home-intro-end -->

<hr class="section-divider">

## Projects

<div class="project-list">
  <article class="project-entry project-entry--featured">
    <div><p class="eyebrow">Meditation &amp; everyday practice</p><h3><a href="/kuma/">Kuma <span aria-hidden="true">↗</span></a></h3><p>A meditation timer for iPhone, with an Apple Watch companion, gentle bells, a private practice history, and Home Screen widgets.</p><a class="text-link" href="/kuma/">Meet Kuma <span aria-hidden="true">→</span></a></div>
    <a class="project-art" href="/kuma/" aria-label="Meet Kuma"><img src="/assets/kuma/kuma-recessed-arch.png" alt="Kuma resting on a golden cushion" width="1254" height="1254" loading="lazy"></a>
  </article>
  <article class="project-entry project-entry--featured">
    <div><h3><a href="https://getgumleaf.com">GumLeaf <span aria-hidden="true">↗</span></a></h3><p>Text any question, get a real answer back by SMS — even over satellite, off the grid. No app, no account. A service of <strong>Chong Consulting LLC</strong>. <a href="https://getgumleaf.com">getgumleaf.com</a></p></div>
    <a class="gumleaf-art" href="https://getgumleaf.com" aria-label="Visit GumLeaf"><img src="/assets/gumleaf/gumleaf-koala-soft-pouch.webp" alt="GumLeaf koala holding a phone, with speech bubbles saying hello and Here’s your answer" width="1376" height="1152" loading="lazy"></a>
  </article>
  <article class="project-entry"><h3><a href="/projects/ok-banger-show">OK Banger Show <span aria-hidden="true">↗</span></a></h3><p>A live podcast about being a good person IRL, online, and onchain, co-hosted with Cameron Armstrong.</p></article>
  <article class="project-entry"><h3><a href="/projects/reframe-science">Reframe Science <span aria-hidden="true">↗</span></a></h3><p>A curated community for entrepreneurs and builders to study health like a compassionate scientist.</p></article>
  <article class="project-entry"><h3><a href="/projects/debug-your-meditation">Debug Your Meditation <span aria-hidden="true">↗</span></a></h3><p>A book that transforms meditation from a chore to “I want more!”</p></article>
</div>

<hr class="section-divider">

## Explore

<div class="home-sections">
  <div class="home-section">
    <h3><a href="/notes" class="internal-link">Notes</a></h3>
    <p>Thoughts, essays, and reflections on meditation, creative practice, and healthcare</p>
  </div>

  <div class="home-section">
    <h3><a href="/projects" class="internal-link">Projects</a></h3>
    <p>Check out Kuma, GumLeaf, Reframe Science, The OK Banger Show, and Debug Your Meditation</p>
  </div>

  <div class="home-section">
    <h3><a href="/hire" class="internal-link">Hire Me</a></h3>
    <p>Coaching on meditation, creative practice, and sustainable output</p>
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
<ul class="note-list">
{% for note in recent_notes limit: 8 %}
  <li><time datetime="{{ note.date | date: '%Y-%m-%d' }}">{{ note.date | date: "%b %-d, %Y" }}</time><a href="{{ note.url }}">{{ note.title }}</a></li>
{% endfor %}
</ul>

[View All Notes](/notes)


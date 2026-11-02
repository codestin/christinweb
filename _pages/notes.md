---
layout: page
title: Notes
permalink: /notes
---

## Search

<link href="/_pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/_pagefind/pagefind-ui.js"></script>

<div id="notes-search" class="site-search"></div>

<script>
window.addEventListener('DOMContentLoaded', (event) => {
  new PagefindUI({
    element: "#notes-search",
    showSubResults: true,
    excerptLength: 30
  });
});
</script>



{% comment %}
Get the most recent note
{% endcomment %}
{% assign latest_note = site.notes | sort: "date" | reverse | first %}

{% if latest_note %}
## Latest

**{{ latest_note.date | date: "%Y-%m-%d" }}**

### [{{ latest_note.title }}]({{ latest_note.url }})

{% assign words = latest_note.content | number_of_words %}
{% assign reading_time = words | divided_by: 200 %}
{% if reading_time < 1 %}{% assign reading_time = 1 %}{% endif %}

{{ latest_note.content | strip_html | truncatewords: 40 }} [Keep reading →]({{ latest_note.url }})

*{{ reading_time }} min read*
{% endif %}

{% comment %}
Collect all unique tags from notes
{% endcomment %}
{% assign all_tags = "" | split: "" %}
{% for note in site.notes %}
  {% if note.tags %}
    {% for tag in note.tags %}
      {% unless all_tags contains tag %}
        {% assign all_tags = all_tags | push: tag %}
      {% endunless %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign sorted_tags = all_tags | sort_natural %}

{% comment %}
Display topics as minimal text links
{% endcomment %}
{% if sorted_tags.size > 0 %}
## Topics

{% for tag in sorted_tags %}[{{ tag }}](/topics#{{ tag | slugify }}){% unless forloop.last %}, {% endunless %}{% endfor %}
{% endif %}

{% comment %}
Display all notes in flat reverse chronological list
{% endcomment %}
{% assign all_notes = site.notes | sort: "date" | reverse %}

## Notes

<ul class="note-list">
{% for note in all_notes %}
  <li><time datetime="{{ note.date | date: '%Y-%m-%d' }}">{{ note.date | date: "%b %-d, %Y" }}</time><a href="{{ note.url }}">{{ note.title }}</a></li>
{% endfor %}
</ul>

---
layout: page
title: Notes
permalink: /notes
---

# Notes

## Search

<link href="/_pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/_pagefind/pagefind-ui.js"></script>

<div id="search"></div>

<script>
window.addEventListener('DOMContentLoaded', (event) => {
  new PagefindUI({
    element: "#search",
    showSubResults: true,
    excerptLength: 30
  });
});
</script>

<style>
/* Override Pagefind CSS variables to match site theme */
#search {
  --pagefind-ui-primary: var(--color-link);
  --pagefind-ui-text: var(--color-text);
  --pagefind-ui-background: var(--color-bg-secondary);
  --pagefind-ui-border: var(--color-border);
  --pagefind-ui-border-width: 1px;
  --pagefind-ui-border-radius: 4px;
  --pagefind-ui-font: 'Menlo', Monaco, 'Courier New', monospace;
}

/* Style search input to match footer newsletter input */
#search .pagefind-ui__search-input {
  font-family: 'Menlo', Monaco, 'Courier New', monospace !important;
  font-size: 0.65625rem !important; /* Match newsletter input size */
  height: auto !important;
  padding: 0.5em 0.75em !important;
  padding-left: 2.5em !important; /* Space for search icon */
  background: var(--color-bg-secondary) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 4px !important;
  color: var(--color-text) !important;
  transition: background 300ms ease, border-color 300ms ease !important;
}

#search .pagefind-ui__search-input::placeholder {
  color: var(--color-text-secondary) !important;
}

#search .pagefind-ui__search-input:hover {
  border-color: var(--color-link) !important;
}

#search .pagefind-ui__search-input:focus {
  outline: 2px solid var(--color-link-focus-bg) !important;
  outline-offset: 2px !important;
  background: var(--color-link-focus-bg) !important;
  border-color: var(--color-link) !important;
}

/* Style search clear button to match */
#search .pagefind-ui__search-clear {
  background: transparent !important;
  color: var(--color-link) !important;
  padding: 0.5em !important;
  border-radius: 4px !important;
}

#search .pagefind-ui__search-clear:hover {
  background: var(--color-link-hover-bg) !important;
}

#search .pagefind-ui__search-clear:focus {
  outline: 2px solid var(--color-link-focus-bg) !important;
  background: var(--color-link-focus-bg) !important;
}

/* Style result items */
#search .pagefind-ui__result {
  border: 1px solid var(--color-border) !important;
  background: var(--color-bg-secondary) !important;
  border-radius: 4px !important;
  padding: 1em !important;
  margin-bottom: 0.5em !important;
}

#search .pagefind-ui__result-link {
  color: var(--color-link) !important;
  font-weight: 700 !important;
}

#search .pagefind-ui__result-link:hover {
  color: var(--color-link) !important;
  text-decoration: underline !important;
}

#search .pagefind-ui__result-excerpt {
  font-size: 0.65625rem !important;
  color: var(--color-text) !important;
  margin-top: 0.5em !important;
}

/* Style message text */
#search .pagefind-ui__message {
  font-size: 0.65625rem !important;
  color: var(--color-text-secondary) !important;
}

/* Adjust search icon size */
#search .pagefind-ui__search-input::before {
  width: 1.5em !important;
  height: 1.5em !important;
}
</style>

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

{% for note in all_notes %}
- {{ note.date | date: "%Y-%m-%d" }} — [{{ note.title }}]({{ note.url }})
{% endfor %}

---
layout: page
title: Notes
permalink: /writing/notes
---

# Notes

Welcome to my digital garden - a collection of interconnected notes and ideas.

## Recent Notes

{% assign recent_notes = site.notes | sort: 'last_modified_at' | reverse %}
{% for note in recent_notes limit:10 %}
- [{{ note.title }}]({{ site.baseurl }}{{ note.url }}) - *{{ note.last_modified_at | date: "%b %-d, %Y" }}*
{% endfor %}

<hr class="section-divider">

[View the graph](/graph) to see how all notes connect, or browse by [topic](#) (coming soon).

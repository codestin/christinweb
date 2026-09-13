---
layout: page
title: Search
permalink: /search
---

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

---
layout: note
title: Fruition Additional Setup Tips
date: 2023-04-16
tags: [creative, notes, tools]
---

Referring to Fruition setup instructions [here](https://fruitionsite.com/):

## Step 1-4

- Make sure to clear any pre-existing A NAME/C NAME records on Namecheap's basic DNS settings, before switching to Cloudflare servers
- Add [www.domainname.com](http://www.domainname.com/) as an ANAME record pointing to 1.1.1.1 as well.

## Step 3-3

- This might show an error until the next steps of routing the Cloudflare worker is performed

*(I still need to review and potentially submit a Github issue ticket to the [repo](https://github.com/stephenou/fruitionsite/issues) to clarify instructions)*

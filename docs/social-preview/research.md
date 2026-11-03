# Website link preview

Approved static card: `assets/social/christin-chong-v5.jpg` (1200 × 630 JPEG).

The card uses the site's Refuge Slab, cream, olive, and yellow; a close portrait; a large two-line name without a trailing period; Neuroscience PhD; and the exact requested roles: Buddhist Chaplain. Builder. Biotech Marketer. There is no tagline or animation.

## Sources and format

Research checked November 2, 2026:

- [LinkedIn shareability guidance](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin): Open Graph title, description, image, and URL; minimum 1200 × 627; recommended 1.91:1 ratio; maximum 5 MB.
- [Open Graph protocol](https://ogp.me/): image dimensions, MIME type, and alt text provide structured image metadata.
- [Apple rich previews](https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages): previews use metadata in the initial HTML, do not execute JavaScript, and may display images at different sizes. This implementation uses a static image, as requested.

The large name, close portrait, and short role lines were reviewed at phone width. Actual app cropping and truncation can vary. This is a visual-design recommendation; no click-through experiment has been run.

## Implementation

`_includes/head.html` uses explicit page descriptions, then cleaned excerpts, then the site description. It escapes metadata, provides absolute image URLs, includes image dimensions and alt text, and sets the established `summary_large_image` Twitter card convention. Only notes get article metadata. Kuma retains its separate product preview.

Custom page images can supply image_alt, image_width, image_height, and image_type. Unknown custom-image dimensions are not replaced with the default card's dimensions.

`cards.html` is the editable 1200 × 630 source. Serve the repository root locally and open `docs/social-preview/cards.html?card=a` to render it. Export the full card after fonts load. `index.html` displays the approved image and a 350 px mockup. All docs and local output are excluded from Jekyll publication. Earlier exploratory assets remain in local output only.

## Validation

Run `bundle exec jekyll build --trace`, then `bundle exec ruby docs/social-preview/verify.rb`. The verifier checks the homepage, a standard page, a note fallback, Kuma, escaped metadata, external and local image overrides, and excluded mockups.

After deployment, check that the public JPEG and homepage metadata are reachable. Existing shared links may retain platform caches. Refresh with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) if needed. The mockup gallery is illustrative, not a live-platform test.

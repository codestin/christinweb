# Kuma landing page and beta list

The consumer page at `/kuma/` uses `_layouts/kuma.html` and `assets/kuma/kuma.css`. Privacy/support retain the main website layout. Approved Kuma master and actual app screenshots are optimized to WebP; do not replace the art with older designs. Screenshots show development/sample data.

## Beta signup

The form posts directly to `/.netlify/functions/kuma-beta` (no JavaScript required). The Netlify Function validates email, explicit consent, same-origin requests, and a honeypot, then adds the contact to the dedicated Resend Kuma beta segment. It redirects to `/kuma/thanks/` only after Resend succeeds. Provider errors show a retry page; existing global unsubscribes are preserved.

Required Netlify environment variables: `RESEND_API_KEY` (Full Access, required by the Contacts API) and `RESEND_KUMA_SEGMENT_ID` (the dedicated Kuma beta segment). The API key is a secret limited to the production deploy context. The current Netlify plan includes Builds, Functions, and Runtime scopes together; Functions-only scope requires an upgrade. Keep credentials out of source and static output. Deploy after setting them.

Send beta updates through Resend Broadcasts targeted only to this segment. Include `<a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a>` in every broadcast; Resend handles the personalized unsubscribe page and suppresses unsubscribed contacts. Do not use the transactional `/emails` API for list updates. Signup sends the `kuma.beta_signed_up` event to the enabled Resend “Kuma beta signup confirmation” automation, which uses the published “Kuma beta — You’re on the list” template and Resend’s managed unsubscribe URL. Sender: `Kuma <kuma@news.reframescience.org>`; reply-to: `hi@christinchong.com`. It does not add contacts to a newsletter. The string Contact property `kuma_welcome_status` records `queued` after a successful event submission so ordinary repeat signups do not resend the email. Event failures leave it pending and can be retried through the form; a failed status write after a successful event may cause a duplicate on retry. API calls are paced and rate-limit responses retried. Template HTML is retained in `docs/email/kuma-beta-welcome.html`. Do not send account-wide broadcasts to this list.

Migration check on November 1, 2026: the legacy form contained one QA submission and no real subscribers to migrate.

Before the first broadcast, review legacy Netlify Forms `kuma-beta` submissions and import only genuine consenting subscribers into the Kuma segment, honoring earlier removal requests. Never reset existing opt-outs during import. Verification submissions use the reserved example.com domain and a `kuma-qa-` prefix; exclude those from all mailings. Retention/use are described in `/kuma/privacy/#beta-waitlist`.

Run endpoint checks with `node --test tests/kuma-beta.test.mjs` and build the website with `bundle exec jekyll build`.

## Validation — November 1, 2026

Jekyll production build, desktop and 390px mobile browser checks, form required fields and consent, image loading, and local links checked. Kuma app/embedded widgets built and unit suite passed: 168 tests, one skip, zero failures (`/tmp/KumaWebsiteValidation.xcresult`). The authoritative app project was regenerated with XcodeGen. No app features were edited for this website work.

## Social preview and search discovery

The 1200×630 JPEG at `assets/kuma/social-preview-v5.jpg` reuses the unchanged website Kuma artwork, Refuge Slab fonts, cream/charcoal/gold palette, arched hero frame, and homepage headline. No new illustration or decorative motifs were generated. Reproducible renderer: MEDITATIONTIMER/docs/artwork/social-preview/site-aligned/render.swift. Open Graph and Twitter large-image metadata share the same absolute URL, dimensions, and alt text. New filename avoids the previous image cache key; social services may retain old card data until recrawled.

The landing page includes a visible product facts section and JSON-LD in `_includes/kuma-schema.json` describing the app, creator, publisher, preview image, and exact visible FAQs. Keep the schema synchronized with visible content. Beta availability is explicit; no invented ratings, reviews, or download offer are included. The thank-you page is noindex. `kuma-sitemap.xml` includes the three public Kuma pages; robots.txt advertises it and preserves unrestricted crawler access.

These changes improve clarity and discoverability; they do not guarantee citations, AI rankings, or rich results. Guidance: https://developers.google.com/search/docs/appearance/ai-features .

Social sharing copy and artwork omit pricing claims to leave room for future paid features.

## Widget showcase

The dedicated `#widgets` section shows the app’s small/medium Sunshine and Night Gold renders, explains weekly pebbles, the total-aspiration bar, optional streaks, Lock Screen support, and setup. Sources: MEDITATIONTIMER/docs/screenshots/widget-palettes. Desktop and 390px mobile layouts reviewed. App functionality is unchanged.

## Apple Watch and Health showcase

The `#apple-health` section covers independent Watch meditation, haptics, completed-session sync, heart-rate reports, optional Mindful Minutes, walking steps, permissions, and privacy. Claims checked against MEDITATIONTIMER/docs/WATCH.md, docs/HEART-RATE.md, docs/PRIVACY.md, and Sources/RitualView.swift. The report image is a cropped actual UI-test screenshot with synthetic example data, explicitly labeled on the page. Source: /tmp/KumaHealthWebsiteUI.xcresult, testHeartRateReportAndHistory (passed). Kuma and its embedded WidgetKit/Watch targets built as part of that run. Desktop and 390px mobile website previews checked; no overflow or missing report image.

## Watch screenshots

Updated November 1, 2026 to match the implemented paper, charcoal, and sungold Watch design. The gallery shows Welcome, Settle, and Sit using actual 374×446 Apple Watch Series 11 (42mm), watchOS 26.2 simulator captures. New `watch-paper-*.webp` filenames avoid stale image cache entries. CSS frames remain illustrative.

The landing page now bundles the same RefugeSlab400/500/600/700 files as the app, with the font license, rather than approximating them with the older variable font. Captions describe the configurable settling countdown and heart-rate readings below the main timer; no guided-breathing or new health features are implied.

Sources: MEDITATIONTIMER/docs/screenshots/watch-paper/sit-42mm.png and fresh `--watch-preview` / `--watch-settle-preview` captures of the implemented app. The fonts and bear rendering within screenshots are native app output, not generated mockups.

Validation: Jekyll build passed (existing Sass deprecation notices only). Browser checks confirmed all three Watch images load and the desktop gallery has no horizontal overflow.
The 390px mobile layout also passed image-loading and overflow checks.

## Practice-first Watch section — November 1, 2026

Removed the prominent heart-rate chart and dedicated measurement feature from the landing page. Watch messaging now leads with the timer, haptics, and phone-free practice; optional Mindful Minutes remain visible. Heart-rate and step reports are described in a collapsed optional-details disclosure, including that heart rate does not measure meditation quality. The privacy policy and setup instructions retain accurate Health information.

Validation: Jekyll build passed; desktop preview and the optional disclosure were checked, and the 390px mobile layout had no horizontal overflow. Regenerated the Kuma project with XcodeGen; Kuma and embedded extensions built, and all 13 selected widget tests passed (`/tmp/KumaWebsiteGentleHealth.xcresult`). Publication explicitly approved by the user on November 1, 2026.

## iPhone Duo discovery — November 1, 2026

The landing page title, description, product facts, visible Duo section, and FAQs now explain Kuma’s native SwiftUI implementation and fold-aware meditation/reflection support. JSON-LD mirrors those claims and the visible FAQ wording. The existing canonical URL remains `/kuma/`; a second near-duplicate landing page was not added. Social cards inherit the revised title and description.

Claims were checked against MEDITATIONTIMER/Sources/KumaPracticeLayout.swift and duo-notes.md: iOS 18 minimum, iOS 27.1+ expanded-layout guard, compact fallback, simulator validation, physical-device checks pending. Beta remains in preparation. No new artwork, pricing, ratings, or release-date claims.

After publication, submit `https://christinchong.com/kuma/` for reindexing in the verified Google Search Console property and submit `https://christinchong.com/kuma-sitemap.xml` if not already registered. Monitor impressions/clicks for Kuma, iPhone Duo meditation, and native iPhone meditation app; indexing and placement are not guaranteed. Search Console access is not configured in this checkout.

## Duo native screenshot feature — November 1, 2026

Added the Duo native navigation item and feature gallery with optimized WebP screenshots of the native timer and post-session reflection. The gallery replaces the text-only Duo introduction while preserving its discovery metadata, FAQ, and anchor. Copy retains the familiar iPhone experience and identifies the images as simulator previews of a feature in development.

Validation: Jekyll build and all 12 existing beta signup tests passed. Both screenshot assets, alt text, JSON-LD, and navigation anchors were checked. Browser review verified the desktop gallery and a 390px mobile layout without horizontal overflow.

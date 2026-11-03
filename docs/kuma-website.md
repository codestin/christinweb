# Kuma landing page and beta list

The consumer page at `/kuma/` uses `_layouts/kuma.html` and `assets/kuma/kuma.css`. Privacy/support retain the main website layout. Approved Kuma master and actual app screenshots are optimized to WebP; do not replace the art with older designs. Screenshots show development/sample data.

## Beta signup

The form posts directly to `/.netlify/functions/kuma-beta` (no JavaScript required). The Netlify Function validates email, explicit consent, same-origin requests, and a honeypot, then adds the contact to the dedicated Resend Kuma beta segment. It redirects to `/kuma/thanks/` only after Resend succeeds. Provider errors show a retry page; existing global unsubscribes are preserved.

Required Netlify environment variables: `RESEND_API_KEY` (Full Access, required by the Contacts API) and `RESEND_KUMA_SEGMENT_ID` (the dedicated Kuma beta segment). The API key is a secret limited to the production deploy context. The current Netlify plan includes Builds, Functions, and Runtime scopes together; Functions-only scope requires an upgrade. Keep credentials out of source and static output. Deploy after setting them.

Signup sends `kuma.beta_signed_up` to the enabled Resend **Kuma TestFlight instructions — from Christin** automation (`01a1a046-421f-753c-a047-c0a015169652`). It uses the published **Kuma — TestFlight installation instructions** template (`04f4606c-2f67-4837-aef5-84506a35f2ef`). Sender: `Christin at Kuma <christin@kumatimer.com>`; reply-to: `christin@kumatimer.com`. The former waitlist automation is stopped for new runs. kumatimer.com is verified in Resend using Cloudflare DKIM and DNS-only sending CNAMEs. Cloudflare routes `christin@kumatimer.com` to the verified destination `christinchong@gmail.com`. Forwarding was tested with delivery to Gmail. Gmail’s verified Send mail as identity uses `smtp.resend.com:587` with TLS and a dedicated sending-only credential restricted to kumatimer.com. The unused first credential was revoked. Gmail is set to reply from the receiving address; its default new-message address remains Gmail. No credentials are stored in this repository.

The email links to Apple’s TestFlight app and `https://testflight.apple.com/join/4cvCeECw`, then explains Accept → Install. The public invitation was verified available on November 2, 2026. The form, metadata, FAQs, thank-you page, and privacy wording now describe the available beta rather than a waitlist. The thank-you page also supplies the installation link.

The existing `kuma_welcome_status` contact property now records `install-queued-v1`. Earlier `queued` waitlist contacts can explicitly request the new instructions; ordinary repeat submissions do not resend them. Unsubscribed contacts remain suppressed. No existing subscribers are bulk emailed by this change. Event submission followed by a failed status write can still duplicate on retry. Resend acceptance means queued, not guaranteed inbox delivery. The versioned HTML in `docs/email/kuma-beta-welcome.html` retains the message content; Resend owns the live template and unsubscribe URL.

Use Resend Broadcasts only for future beta list updates, scoped to the Kuma segment, with the managed unsubscribe URL. Do not use transactional email for list updates or account-wide broadcasts for Kuma contacts.

Migration check on November 1, 2026: the legacy form contained one QA submission and no real subscribers to migrate.

Before the first broadcast, review legacy Netlify Forms `kuma-beta` submissions and import only genuine consenting subscribers into the Kuma segment, honoring earlier removal requests. Never reset existing opt-outs during import. Verification submissions use the reserved example.com domain and a `kuma-qa-` prefix; exclude those from all mailings. Retention/use are described in `/kuma/privacy/#beta-waitlist`.

Run endpoint checks with `node --test tests/kuma-beta.test.mjs` and build the website with `bundle exec jekyll build`.

## Validation — November 1, 2026

Jekyll production build, desktop and 390px mobile browser checks, form required fields and consent, image loading, and local links checked. Kuma app/embedded widgets built and unit suite passed: 168 tests, one skip, zero failures (`/tmp/KumaWebsiteValidation.xcresult`). The authoritative app project was regenerated with XcodeGen. No app features were edited for this website work.

## Social preview and search discovery

The 1200×630 JPEG at `assets/kuma/social-preview-v6.jpg` reuses the unchanged website Kuma artwork, Refuge Slab fonts, cream/charcoal/gold palette, arched hero frame, and homepage headline. No new illustration or decorative motifs were generated. Reproducible renderer: docs/artwork/render-kuma-social.swift. Open Graph and Twitter large-image metadata share the same absolute URL, dimensions, and alt text. New filename avoids the previous image cache key; social services may retain old card data until recrawled.

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

## Duo tab screenshot correction — November 1, 2026

Replaced the Duo timer image with the fresh app capture after correcting tab widths and the gap between Log and Guide. Both the inline image and full-size link use `duo-timer-tabs-fixed.webp` to avoid cached copies. The source is `MEDITATIONTIMER/docs/screenshots/duo/open-timer.png`; the website export retains its aspect ratio at 1600 × 1126.

## Recessed arch artwork

The homepage and Kuma landing page use `assets/kuma/kuma-recessed-arch.png`. This is the user-approved extended arch composition, made directly from the original Kuma master without regenerating the character. The character and cushion pixels remain unchanged; only the backdrop and contact shadow were composited. Transparent outer margins let the artwork sit naturally on both page backgrounds. Do not add CSS border-radius clipping or a border around this image. The social preview reuses this same asset.

## Static adoption preview — November 2, 2026

Updated the Open Graph and Twitter card to social-preview-v7.jpg (1200 × 630 JPEG), using the current transparent recessed-arch hero with its projecting cushion and shadow. The selected headline is “A quiet timer. A little company.” Landing-page social title and description now explain the free meditation timer and beta waitlist; the SEO title and other pages’ descriptions are retained. Schema image URLs and image alt text match the new asset. No animation metadata is included. The versioned URL allows crawlers to fetch a fresh image; previously cached messages may retain the old card.

The renderer is docs/artwork/render-kuma-social.swift and uses existing bundled fonts and assets/kuma/kuma-recessed-arch.png. The rendered card was visually reviewed. The app and WidgetKit build/unit checks passed earlier in this task (171 tests, one skipped, no failures); this update changes website files only.

### Card typography revision

Version 8 removes “Free to practice. Yours to return to.” and enlarges the product label from 22 to 32 pixels, in two lines: “Meditation timer for / iPhone and iPhone Duo.” The selected headline and updated hero remain. Both social image tags and schema reference the versioned static JPEG. Visually reviewed at full card size.

## Installation email launch — November 2, 2026

All 13 signup endpoint tests pass, including repeat suppression, migration from an old waitlist confirmation, opt-out preservation, and provider failures. Production Jekyll build passes. XcodeGen regenerated the authoritative app project; Kuma and its embedded WidgetKit extensions built, and 171 Kuma unit tests passed (`/tmp/KumaInstallEmailValidated.xcresult`). The Make wrapper's strict warning flags conflict with dependency suppression flags; the successful direct Xcode validation used warning-as-error overrides without changing project settings. Public website and TestFlight invitation checked.

Live form POST returned 303 to `/kuma/thanks/`. Resend confirmed **Delivered** for the owner-only test recipient, sender `Kuma <kuma@kumatimer.com>`, subject “Kuma is ready — here’s how to install it”, and the expected installation template (receipt `01a1a029-8ff8-76de-8d53-37e92b453ec9`). No subscriber broadcast was sent by this setup.

## Branded replies and illustrated email — November 2, 2026

The installation email subject is **Kuma meditation timer is ready — install the beta**, with a heading **Meet Kuma, your meditation timer.**, a 240px rendering of the existing approved Kuma bear artwork, and a plain opening description of the meditation timer. The image uses the existing public PNG and descriptive alt text. TestFlight steps and managed unsubscribe remain. Reply-To is `christin@kumatimer.com`. Older automation versions no longer accept new runs. Gmail verification succeeded, and an actual test sent from `christin@kumatimer.com` arrived in the owner’s Gmail inbox.

Google currently states that third-party Send mail as support ends in January 2027; forwarding remains separate. Plan a supported sending mailbox/client before that cutoff. Reference: https://support.google.com/mail/answer/22370 .

The final illustrated email was verified through the live signup endpoint: Resend receipt `01a1a040-3f1f-732a-9bd4-162177391634` is **Delivered**, with sender `Kuma <kuma@kumatimer.com>`, Reply-To `christin@kumatimer.com`, the meditation-timer subject, and the Kuma bear image. The branded Gmail sending test is also **Delivered** (`01a1a03f-95bf-7b9b-a043-63b903170ca3`).

The installation email From address was corrected to `Christin at Kuma <christin@kumatimer.com>`; Reply-To uses that same address. The thank-you page’s inbox guidance matches.

Sender correction live-tested: receipt `01a1a048-1d8c-7417-b1d9-c03ad24e1818` is Delivered with From `Christin at Kuma <christin@kumatimer.com>` and Reply-To `christin@kumatimer.com`. Jekyll production build passes. App and widget source is unchanged from the successful 171-test validation above.

# Kuma landing page and beta list

The consumer page at `/kuma/` uses `_layouts/kuma.html` and `assets/kuma/kuma.css`. Privacy/support retain the main website layout. Approved Kuma master and actual app screenshots are optimized to WebP; do not replace the art with older designs. Screenshots show development/sample data.

## Beta signup

Netlify Forms form name: `kuma-beta`. The static POST form collects an email and required beta consent, with a honeypot. Netlify form detection must remain enabled (`processing_settings.ignore_html_forms: false`). Successful submission redirects to `/kuma/thanks/`. Native browser validation requires an email and consent; no JavaScript dependency.

Open the christinweb project in Netlify → Forms → kuma-beta to view or export the list. This does not send a welcome message or add anyone to Substack. When the beta is approved, export the opt-in list and send installation instructions using the chosen email provider. Honor removal requests sent to hi@christinchong.com. Retention/use are described in `/kuma/privacy/#beta-waitlist`.

Verification submissions use the reserved example.com domain and a `kuma-qa-` prefix. Exclude those from all mailings.

## Validation — November 1, 2026

Jekyll production build, desktop and 390px mobile browser checks, form required fields and consent, image loading, and local links checked. Kuma app/embedded widgets built and unit suite passed: 168 tests, one skip, zero failures (`/tmp/KumaWebsiteValidation.xcresult`). The authoritative app project was regenerated with XcodeGen. No app features were edited for this website work.

## Social preview and search discovery

The 1200×630 JPEG at `assets/kuma/social-preview-v3.jpg` composes the unchanged approved master with product text. Open Graph and Twitter large-image metadata share the same absolute URL, dimensions, and alt text. New filename avoids the previous image cache key; social services may retain old card data until recrawled.

The landing page includes a visible product facts section and JSON-LD in `_includes/kuma-schema.json` describing the app, creator, publisher, preview image, and exact visible FAQs. Keep the schema synchronized with visible content. Beta availability is explicit; no invented ratings, reviews, or download offer are included. The thank-you page is noindex. `kuma-sitemap.xml` includes the three public Kuma pages; robots.txt advertises it and preserves unrestricted crawler access.

These changes improve clarity and discoverability; they do not guarantee citations, AI rankings, or rich results. Guidance: https://developers.google.com/search/docs/appearance/ai-features .

Social sharing copy and artwork omit pricing claims to leave room for future paid features.

## Widget showcase

The dedicated `#widgets` section shows the app’s small/medium Sunshine and Night Gold renders, explains weekly pebbles, the total-aspiration bar, optional streaks, Lock Screen support, and setup. Sources: MEDITATIONTIMER/docs/screenshots/widget-palettes. Desktop and 390px mobile layouts reviewed. App functionality is unchanged.

## Apple Watch and Health showcase

The `#apple-health` section covers independent Watch meditation, haptics, completed-session sync, heart-rate reports, optional Mindful Minutes, walking steps, permissions, and privacy. Claims checked against MEDITATIONTIMER/docs/WATCH.md, docs/HEART-RATE.md, docs/PRIVACY.md, and Sources/RitualView.swift. The report image is a cropped actual UI-test screenshot with synthetic example data, explicitly labeled on the page. Source: /tmp/KumaHealthWebsiteUI.xcresult, testHeartRateReportAndHistory (passed). Kuma and its embedded WidgetKit/Watch targets built as part of that run. Desktop and 390px mobile website previews checked; no overflow or missing report image.

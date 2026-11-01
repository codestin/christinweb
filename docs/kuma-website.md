# Kuma landing page and beta list

The consumer page at `/kuma/` uses `_layouts/kuma.html` and `assets/kuma/kuma.css`. Privacy/support retain the main website layout. Approved Kuma master and actual app screenshots are optimized to WebP; do not replace the art with older designs. Screenshots show development/sample data.

## Beta signup

Netlify Forms form name: `kuma-beta`. The static POST form collects an email and required beta consent, with a honeypot. Netlify form detection must remain enabled (`processing_settings.ignore_html_forms: false`). Successful submission redirects to `/kuma/thanks/`. Native browser validation requires an email and consent; no JavaScript dependency.

Open the christinweb project in Netlify → Forms → kuma-beta to view or export the list. This does not send a welcome message or add anyone to Substack. When the beta is approved, export the opt-in list and send installation instructions using the chosen email provider. Honor removal requests sent to hi@christinchong.com. Retention/use are described in `/kuma/privacy/#beta-waitlist`.

Verification submissions use the reserved example.com domain and a `kuma-qa-` prefix. Exclude those from all mailings.

## Validation — November 1, 2026

Jekyll production build, desktop and 390px mobile browser checks, form required fields and consent, image loading, and local links checked. Kuma app/embedded widgets built and unit suite passed: 168 tests, one skip, zero failures (`/tmp/KumaWebsiteValidation.xcresult`). The authoritative app project was regenerated with XcodeGen. No app features were edited for this website work.

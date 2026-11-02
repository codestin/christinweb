const headers = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' };
const success = () => new Response(null, { status: 303, headers: { Location: '/kuma/thanks/', 'Cache-Control': 'no-store' } });
function error(status, message, diagnostic) {
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Kuma beta signup</title><main><h1>We couldn’t save your place</h1><p>${message}</p><p><a href="/kuma/#beta">Return to the signup form</a></p></main></html>`, { status, headers: { ...headers, ...(diagnostic ? { "X-Kuma-Signup-Status": diagnostic } : {}) } });
}

export default async function handler(request) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return error(403, 'Please submit the form from the Kuma website.');
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return error(415, 'Please use the signup form.');
  const body = await request.text();
  if (body.length > 4096) return error(413, 'Please use a valid email address.');
  const form = new URLSearchParams(body);
  if (form.get('bot-field')) return success();
  const email = (form.get('email') || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || form.get('beta-consent') !== 'yes') {
    return error(400, 'Enter a valid email address and check the box to agree to Kuma beta updates.');
  }
  const key = process.env.RESEND_API_KEY;
  const segment = process.env.RESEND_KUMA_SEGMENT_ID;
  if (!key || !segment) return error(503, 'Signup is temporarily unavailable. Please try again later.');
  const api = (path, method = 'GET', data) => fetch(`https://api.resend.com${path}`, {
    method, headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data), signal: AbortSignal.timeout(8000),
  });
  try {
    const contactPath = `/contacts/${encodeURIComponent(email)}`;
    const existing = await api(contactPath);
    if (existing.ok) {
      const contact = await existing.json();
      // A public form must never undo an existing account-wide unsubscribe.
      if (contact.unsubscribed) return error(409, 'This address has opted out of our emails. To rejoin, use the preferences link in a previous email or contact hi@christinchong.com.');
      const added = await api(`${contactPath}/segments/${encodeURIComponent(segment)}`, 'POST');
      if (!added.ok) throw new Error(`segment-${added.status}`);
    } else if (existing.status === 404) {
      // Omit unsubscribed so a concurrent signup cannot reset an opt-out.
      const created = await api('/contacts', 'POST', { email, segments: [{ id: segment }] });
      if (!created.ok) throw new Error(`create-${created.status}`);
    } else {
      throw new Error(`lookup-${existing.status}`);
    }
    return success();
  } catch (failure) {
    // Do not log email addresses, credentials, or provider response bodies.
    const diagnostic = /^(lookup|create|segment)-[0-9]{3}$/.test(failure.message) ? failure.message : 'network';
    return error(503, 'We couldn’t save your signup right now. Please try again in a moment.', diagnostic);
  }
}

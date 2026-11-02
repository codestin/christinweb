import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../netlify/functions/kuma-beta.mjs';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; delete process.env.RESEND_API_KEY; delete process.env.RESEND_KUMA_SEGMENT_ID; });
const request = (fields = {}, origin = 'https://christinchong.com') => new Request('https://christinchong.com/.netlify/functions/kuma-beta', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ email: 'kuma-qa-test@example.com', 'beta-consent': 'yes', ...fields }),
});
function mock(responses) {
  process.env.RESEND_API_KEY = 'test-key'; process.env.RESEND_KUMA_SEGMENT_ID = 'beta-segment';
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, ...options }); const [status, data] = responses.shift(); return new Response(JSON.stringify(data), { status }); };
  return calls;
}
test('new consenting contact is added only to Kuma and redirects after success', async () => {
  const calls = mock([[404, {}], [200, { id: 'contact' }]]);
  const response = await handler(request());
  assert.equal(response.status, 303); assert.equal(response.headers.get('location'), '/kuma/thanks/');
  assert.deepEqual(JSON.parse(calls[1].body), {email: 'kuma-qa-test@example.com', segments: [{id: 'beta-segment'}]});
});
test('existing contact joins segment without resetting preferences', async () => {
  const calls = mock([[200, { unsubscribed: false }], [200, {}]]);
  assert.equal((await handler(request())).status, 303);
  assert.match(calls[1].url, /\/segments\/beta-segment$/); assert.equal(calls[1].method, 'POST');
});
test('global unsubscribe is preserved', async () => {
  const calls = mock([[200, { unsubscribed: true }]]);
  assert.equal((await handler(request())).status, 409); assert.equal(calls.length, 1);
});
test('invalid email, missing consent and cross-origin requests never reach Resend', async () => {
  const calls = mock([]);
  assert.equal((await handler(request({email: 'not-an-email'}))).status, 400);
  assert.equal((await handler(request({'beta-consent': ''}))).status, 400);
  assert.equal((await handler(request({}, 'https://other.example'))).status, 403);
  assert.equal(calls.length, 0);
});
test('honeypot produces no contact', async () => {
  const calls = mock([]); assert.equal((await handler(request({'bot-field': 'spam'}))).status, 303); assert.equal(calls.length, 0);
});
test('missing configuration fails without false success', async () => {
  assert.equal((await handler(request())).status, 503);
});
test('Resend create, lookup and segment failures all offer retry', async () => {
  for (const responses of [[[429, {}]], [[404, {}], [500, {}]], [[200, {unsubscribed: false}], [500, {}]]]) {
    mock(responses); assert.equal((await handler(request())).status, 503);
  }
});
test('network failure does not expose credentials or contact information', async () => {
  mock([]); globalThis.fetch = async () => {throw new Error('test-key');};
  const response = await handler(request()); assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /test-key|kuma-qa-test/);
});
test('method and content type are validated', async () => {
  assert.equal((await handler(new Request('https://christinchong.com/api'))).status, 405);
  assert.equal((await handler(new Request('https://christinchong.com/api', {method:'POST', body:'{}'}))).status, 415);
});

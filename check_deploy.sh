#!/bin/bash
# Check Netlify deployment status and verify site content

set -e

SITE_URL="https://christinweb.netlify.app"
EXPECTED_NOTE="A Season of Change, A Season of Gratitude"

echo "=================================================="
echo "Netlify Deploy Status Check"
echo "=================================================="
echo ""

# Get latest deploy info from Netlify CLI
echo "📋 Latest Netlify Deploy:"
netlify api listSiteDeploys --data '{"site_id": "a78cfc20-7848-4ac5-aefb-ee76d63371b9"}' 2>/dev/null | \
  python3 -c "import sys, json; deploys = json.load(sys.stdin); latest = deploys[0] if deploys else None; print(f\"  Status: {latest['state']}\n  Time: {latest['created_at']}\n  Commit: {latest['commit_ref'][:7]}\n  URL: {latest['deploy_ssl_url']}\") if latest else print('  No deploys found')"

echo ""
echo "🔍 Checking deployed site content..."
echo ""

# Check what's actually deployed
FIRST_NOTE=$(curl -s "$SITE_URL" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2} — [^<]+' | head -1)

echo "  First note on homepage: $FIRST_NOTE"
echo ""

# Verify expected content
if echo "$FIRST_NOTE" | grep -q "$EXPECTED_NOTE"; then
  echo "✅ PASS: Deployed site showing correct content"
  echo "   Expected: Contains '$EXPECTED_NOTE'"
  echo "   Actual: $FIRST_NOTE"
else
  echo "⚠️  WARNING: Deployed content may be stale"
  echo "   Expected: Should contain '$EXPECTED_NOTE'"
  echo "   Actual: $FIRST_NOTE"
  echo ""
  echo "   💡 Try: netlify deploy --prod --build"
  echo "   💡 Or: Clear cache in Netlify dashboard"
fi

echo ""
echo "=================================================="

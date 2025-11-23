#!/bin/bash
# Quick verification after git push
# Run this after pushing to GitHub to verify Netlify deployment

echo "⏳ Waiting 60 seconds for Netlify to build..."
echo "   (Press Ctrl+C if you want to check manually later)"
echo ""

sleep 60

echo "🔍 Checking deployment status..."
echo ""

./check_deploy.sh

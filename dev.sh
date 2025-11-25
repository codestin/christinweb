#!/bin/bash

echo "🛑 Stopping Jekyll servers..."
pkill -f "jekyll serve"
sleep 2

echo "🏗️  Building Jekyll site..."
bundle exec jekyll build

echo "🔍 Building search index..."
npx pagefind --site _site

echo "🚀 Starting Jekyll server..."
bundle exec jekyll serve

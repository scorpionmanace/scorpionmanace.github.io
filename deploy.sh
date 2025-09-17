#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# Create .nojekyll to disable Jekyll processing
echo "" > .nojekyll

# Create 404.html that serves the main app (for client-side routing)
cp index.html 404.html

# Note: GitHub Pages doesn't support custom headers via _headers file
# MIME types should be handled by GitHub Pages based on file extensions

# Clean up any existing git repository
rm -rf .git

# Initialize fresh git repository
git init
git remote add origin git@github.com:scorpionmanace.github.io.git

git add -A
git commit -m 'deploy'

# For user/organization GitHub Pages (like scorpionmanace.github.io)
git push -f git@github.com:scorpionmanace/scorpionmanace.github.io.git main:main

# Alternative: push to gh-pages branch if that's how you have it configured
# git push -f git@github.com:scorpionmanace/scorpionmanace.github.io.git main:gh-pages

cd -

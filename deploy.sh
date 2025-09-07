#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# Create .nojekyll to disable Jekyll processing
echo "" > .nojekyll

# Create _headers file to force correct MIME types for GitHub Pages
cat > _headers << 'EOF'
/assets/*.js
  Content-Type: application/javascript

/assets/*.css
  Content-Type: text/css

/assets/*.wasm
  Content-Type: application/wasm

/assets/*.woff
  Content-Type: font/woff

/assets/*.woff2
  Content-Type: font/woff2
EOF

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

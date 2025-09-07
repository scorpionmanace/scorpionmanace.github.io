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

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:scorpionmanace.github.io.git main:code-master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:scorpionmanace.github.io.git master:gh-pages

cd -

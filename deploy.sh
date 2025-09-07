#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin git@github.com:scorpionmanace/scorpionmanace.github.io.git
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:scorpionmanace/scorpionmanace.github.io.git main:code-master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:scorpionmanace/scorpionmanace.github.io.git master:gh-pages

cd -

#!/usr/bin/env bash
./node_modules/.bin/watchify --debug -v -t babelify -o build/js/background-bundle.js src/js/background.js &
./node_modules/.bin/watchify --debug -v -t babelify -o build/js/page-bundle.js src/js/page.js

for job in `jobs -p`
do
  wait $job
done

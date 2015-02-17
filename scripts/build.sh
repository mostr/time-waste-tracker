#!/usr/bin/env bash
./node_modules/.bin/browserify -v -t babelify -o build/js/background-bundle.js src/js/background.js &
./node_modules/.bin/browserify -v -t babelify -o build/js/page-bundle.js src/js/page.js
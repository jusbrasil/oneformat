#!/bin/bash

if [[ ! -d node_modules ]]; then
  npm install
fi

case $1 in
  unit)
    ./node_modules/.bin/mocha --recursive tests
    ;;
  xunit)
    ./node_modules/.bin/mocha --recursive -R xunit tests
    ;;
esac

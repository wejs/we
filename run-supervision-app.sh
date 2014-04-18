#! /bin/bash

# Script to run app.js with supervision and ignore folders
supervisor -i .tmp/,.git/,node_modules/,views/,assets/ app.js
#supervisor -i .tmp/,.git/,node_modules/,views/ -- --debug=5555 app.js

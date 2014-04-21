# Cakefile

{exec} = require "child_process"

option '', '--grep [string]', 'only run tests matching <pattern>'

REPORTER = "spec"

task "test", "run all tests", (options)->
  grep

  grep = (' --grep ' + options.grep + ' ')  if options.grep

  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --reporter #{REPORTER}
    --require tests/testHelper.js
    --colors
    "+grep+"
    --ui bdd
    tests/index.js
  ", (err, output) ->
    console.error err if err
    console.log output


task "test_bail", "bail after first test failure", (options)->
  grep

  grep = ('--grep ' + options.grep)  if options.grep

  exec "NODE_ENV=test
    ./node_modules/.bin/mocha
    --reporter #{REPORTER}
    --require tests/testHelper.js tests/index.js
    --colors
    --growl
    "+grep+"
    --ui bdd
  ", (err, output) ->
    console.error err if err
    console.log output

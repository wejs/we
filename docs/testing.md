# How to Test

#### With 'npm test':

```sh
npm test
```

#### Run selected tests with mocha --grep

```sh
mocha test/bootstrap.js test/**/*.test.js -g '/auth/1/change-password'
```
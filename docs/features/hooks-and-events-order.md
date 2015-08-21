#Hooks and events order

> A list of hooks and events ordered by execution

## On We.js bootstrap

this hooks and events run in we.js load ( bootstrap ) and startServer


##### EVENT we:after:load:plugins
```js
we.events.on('we:after:load:plugins', function (we) {
  // your code here ...
});
```

##### HOOK we:check:requirements
```js
we.hooks.on('we:check:requirements', function (we, done) {
  // your code here ...
  done();
});
```

##### HOOK we:models:before:instance
```js
we.hooks.on('we:models:before:instance', function(we, done) {
  // your code here ...
  done();
});
```

##### HOOK we:models:set:joins
```js
we.hooks.on('we:models:set:joins', function(we, done) {
  // your code here ...
  done();
});
```

##### EVENT we:after:load:controllers
```js
we.events.on('we:after:load:controllers', function(we) {
  // your code here ...
});
```

##### EVENT we:after:load:express
```js
we.events.on('we:after:load:express', function(we) {
  // your code here ...
});
```

##### EVENT we:after:load:passport
```js
we.events.on('we:after:load:passport', function(we) {
  // your code here ...
});
```

##### EVENT we:after:init:i18n
```js
we.events.on('we:after:init:i18n', function(we) {
  // your code here ...
});
```

##### HOOK we:create:default:folders
```js
we.hooks.on('we:create:default:folders', function(we, done) {
  // your code here ...
  done();
});
```

##### HOOK we:before:routes:bind
```js
we.hooks.on('we:before:routes:bind', function(we, done) {
  // your code here ...
  done();
});
```

##### HOOK we:after:routes:bind
```js
we.hooks.on('we:after:routes:bind', function(we, done) {
  // your code here ...
  done();
});
```

##### EVENT we:bootstrap:done
```js
we.events.on('we:bootstrap:done', function(we) {
  // your code here ...
});
```

##### HOOK we:server:before:start
```js
we.hooks.on('we:server:before:start', function(we, done) {
  // your code here ...
  done();
});
```

##### HOOK we:server:after:start
```js
we.hooks.on('we:server:after:start', function(we, done) {
  // your code here ...
  done();
});
```


## On resquest process

this hooks and events run in request and response process


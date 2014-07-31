#We.js
#### A system for create Social Networks written with javascript - [Sails.js](http://sailsjs.org) Powered!.

**Status** - :construction: In development, dont use it for production :bangbang:

**Have a question, found an error or wants to help?**

> * Open a [issue](https://github.com/wejs/we/issues)
> * Submit a pull request
> * **Test** the live example in http://wejs.org/
> * Give a **star** in Github: https://github.com/wejs/we
> * **Hack it!** and give feedback, we fix and then we.js becomes more secure ;)
> * Or spread to the world!

***If want see or test a We.js live example access: http://wejs.org/*** :eyes:


## FEATURES

* User account - In work - good part ready
* Roles and Permissions - TODO
* Mail system - In work - good part ready
* Friend notifications live update - TODO
* Notifications - TODO
* Groups - In work
* Messenger - In work - working but need more work
* Wysiwyg editor - working - for simple edits
* Notifications - In work
* Images - TODO
* Vídeos - TODO
* Galleries - TODO
* Task mangement - TODO
* Events - TODO
* Posts - TODO
* Activity - TODO
* :white_check_mark: Theme system - [Done!](https://github.com/wejs/we-theme-engine)

## Installation

Before install and start:
* MongoDB http://www.mongodb.org/
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* Bower http://bower.io/
* graphicsmagick http://www.graphicsmagick.org/

Then in terminal tip:

```sh
$ git clone https://github.com/wejs/we.git we
$ cd we
$ npm install && bower install
```
## How to configure

We.js is a sails.js project then see [sails site](http://sailsjs.org/) for file configs

#####Examples:

* Email config: https://github.com/wejs/we/blob/master/config/email.js
* Theme config: https://github.com/wejs/wejs-theme-default/blob/master/index.js

TODO add others configs here ...

## How to Test

#### With 'npm test':
Inside project folder tip:
```sh
$ npm test
```

#### With cake / coffescript in terminal:
Run all tests:
```sh
$ cake 'NotificationService' test
```

Grep tests to run ( mocha grep ):
```sh
$ cake --grep 'NotificationService' test
```

## Build with:
* Sails.js - http://sailsjs.org
* Node.js - http://nodejs.org/
* require.js - http://requirejs.org/
* Ember.js - http://emberjs.com/
* [Love](http://www.lovecalculator.com/)

## Links

> * Team: https://github.com/orgs/wejs/people
> * Contributors: https://github.com/wejs/we/graphs/contributors

## Copyright and license

Copyright 2013-2014 Alberto Souza <alberto.souza.dev@gmail.com> and [contributors](https://github.com/wejs/we/graphs/contributors) , under [the MIT license](LICENSE).

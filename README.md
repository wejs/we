#We.js

#### A npm module for create Social Networks written with javascript - [Sails.js](http://sailsjs.org) Powered!.

**We.js includes theme system, all server side features api, grunt configs and sails.js default configs**

========

> **We.js project example and skeleton:** <br>
> Link: https://github.com/wejs/we-example

---------------

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

* User account - In work on- good part ready
* Roles and Permissions - TODO
* Mail system - In work - good part ready
* Pubsub feature - TODO
* Notifications - TODO
* Groups - In work
* Messenger - In work - Working but needs more love
* :white_check_mark: Wysiwyg editor - With server side sanitization feature - [Done!](https://github.com/wejs/we-example)
* Notifications - In work
* Images - Upload and resize done needs page for manage images
* Attach files on posts - TODO
* Vídeos - TODO
* Galleries - TODO
* Task mangement - TODO
* Events - TODO
* Posts / share content - In work: login and see in: wejs.org
* Activity - TODO
* Authentication - In work with Oauth in project - [In work here](https://github.com/wejs/we-accounts-rest-server)
* :white_check_mark: Subproject suport - [Done!](https://github.com/wejs/we-example)
* :white_check_mark: Theme system - [Done!](https://github.com/wejs/we-theme-engine)

## Installation

Before install and start:
* MongoDB http://www.mongodb.org/ ( optional, we.js has sails-mongo, sails-mysql and a default sails-disk database options )
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* Bower http://bower.io/
* graphicsmagick http://www.graphicsmagick.org/ ( used for image resize )

Then in terminal tip:

```sh
// clone the skeleton
$ git clone https://github.com/wejs/we-example.git we-project
// enter in folder
$ cd we-project
// install depencencies
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

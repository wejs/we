# We.js ;) *beta*

> For about and infos see: http://wejs.org/

Status:  **in development**

##ROADMAP for 0.2.x

- Create one site for the project with we.js site generator DONE - :white_check_mark: http://wejs.org
- Client side automatic model generation based in sails models - DONE - :white_check_mark:
- Yeoman generator for blog - DONE - :white_check_mark:
- Yeoman generator for social network
- Change this project to be a cli - DONE - :white_check_mark:

##About

We.js features:

 - [plugins](https://github.com/wejs?query=plugin)
 - [themes](https://github.com/wejs?query=theme)
 - Generators ( with Yeoman ) | https://github.com/wejs/generator-wejs
 - Administrative interface
 - Build in and extendable grunt tasks
 - Model, permissions and public config sync between cliend and server
   - Define one model in sails and it auto generate the Ember.js model
   - Make variables avaible in client with sails.config.clientside.publicVars
   - Configs set in /admin#/permissions is valid to client with can helper and server with we.acl.can function

#How to install?

1 - install dependencies:

* Mysql http://www.mysql.com/ ( for data storage )
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* graphicsmagick http://www.graphicsmagick.org/ ( for image resize )
* Bower http://bower.io/ ( Opcional )

2 - Install and get started:

> Check we.js site: http://wejs.org/


---------------


**Have a question, found an error or wants to help?**

> * Open a [issue](https://github.com/wejs/we/issues)
> * Submit a pull request to one subproject: https://github.com/wejs/
> * **Generate and test** one we.js project
> * **Hack it!** and give feedback, we fix and then we.js becomes more secure ;)
> * Or spread to the world!

***If want see or test a We.js live example access: http://wejs.org/*** :eyes:


## Avaible plugins

Check: https://github.com/wejs?query=plugin

## How to Run

In terminal tip:

```sh
node .
```

## How to Test

#### With 'npm test':

```sh
npm test
```

#### Run selected tests with mocha --grep

```sh
mocha test/bootstrap.js test/**/*.test.js -g '/auth/1/change-password'
```

## Build with:
* Node.js - http://nodejs.org/
* Mysql
* Ember.js - http://emberjs.com/
* [Love](http://www.lovecalculator.com/)

## Links

> * Team: https://github.com/orgs/wejs/people
> * Contributors: https://github.com/wejs/we/graphs/contributors
> * Sails.js  http://sailsjs.org - some code logic get from sails.js

## Copyright and license

Copyright 2013-2014 Alberto Souza <alberto.souza.dev@gmail.com> and [contributors](https://github.com/wejs/we/graphs/contributors) , under [the MIT license](LICENSE).

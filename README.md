# We.js ;)

[![Join the chat at https://gitter.im/wejs/we](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/wejs/we?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

We.js is a extensible node.js MVC framework

For information and documentation see: http://wejs.org

**This repository (wejs/we) have the We.js CLI code**

Status:  **maintained**

[**Changelog**](https://github.com/wejs/we-core/blob/master/CHANGELOG.md)

## Examples:

- We.js + Vue.js: https://github.com/albertosouza/twitter-prizewinner
- We.js with views and heroku configuration example: https://github.com/wejs-examples/blog-heroku
- Events portal example: https://github.com/wejs-examples/events.wejs.org

## How to install?

Link: https://wejs.org/docs/we/getstarted.installation

## Test one simple blog project with heroku deploy:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/wejs-examples/blog-heroku/tree/master)

## Roadmap:
- Push we-core, we and generator-wejs to 100% code coverage
- Create new examples for:
  - Angular.js + We.js
  - Ember.js + We.js
  - React + We.js
  - Vue.js + We.js (improve)
- Improve the documentation
- Improve plugins:
  - we-plugin-file
  - we-plugin-passport-jwt
- Research and develop the We.js CMF with one client side framework. ref https://github.com/wejs/we/issues/158
- Create new examples of deploy in many hosting providers
- Improve we-core, we and generator-wejs
- Build one online course about We.js with text, images and gifs.

## Contributing

**Have a question, found an error or wants to help?**

> * Open a [issue](https://github.com/wejs/we/issues)
> * Submit a pull request to one subproject: https://github.com/wejs/
> * **Generate and test** one we.js project
> * **Hack it!** and give feedback, we fix and then we.js becomes more secure ;)
> * Or spread to the world!

> And see the [CONTRIBUTING.md](CONTRIBUTING.md) file

***If want see or test a We.js live example access: http://wejs.org/ *** :eyes:

## Get suport and help

- Google groups and email newsletter: https://groups.google.com/forum/#!forum/we-js
- We.js twitter: https://twitter.com/we_js
- Gitter chat: https://gitter.im/wejs/we
- Github repo: https://github.com/wejs/we

## Donate and help

Link: https://wejs.org/suport

## How to Test

#### With 'npm test':

```sh
npm test
```

#### Run selected tests with mocha --grep

```sh
mocha test/bootstrap.js test/\*\*/\*.test.js -g '/auth/1/change-password'
```

## How to test we.js cli?

Example:
```sh
DATABASE_NAME='we_test' DATABASE_USERNAME='root' DATABASE_PASSWORD='project' npm test
```


## Build with:
* Node.js - http://nodejs.org/
* Express.js
* Sequelize
* [Love](http://www.lovecalculator.com/)

## Security Vulnerabilities

If you discover a security vulnerability within We.js, please send an e-mail to Alberto Souza at contact@wejs.org. All security vulnerabilities will be promptly addressed.

## Links

> * Team: https://github.com/orgs/wejs/people
> * Contributors: https://github.com/wejs/we/graphs/contributors
> * We.js site: http://wejs.org
> * Sails.js http://sailsjs.org - thanks for sails.js team and contributors how make a lot of open source code how help to learn and build the old we.js v0.2.x (v0.3.x+ dont use sails.js but have some related logic)

## Thanks

And thanks to colaborators and node.js community by creating open source modules where everyone can read, learn and reuse.

## License

[the MIT license](LICENSE.md).


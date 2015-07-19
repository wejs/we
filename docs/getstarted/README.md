#Installation

###Install dependencies:

* Mysql http://www.mysql.com/ (default database)
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* graphicsmagick http://www.graphicsmagick.org/ (check in your package manager)
* Bower http://bower.io/ (optional)

###Install we.js CLI and yeoman generator:

```
npm install we yo generator-wejs -g
```

###Generate one project with yeoman:

```sh
yo wejs:app
```

###Enter in your project folder

###Install npm dependencies:

```sh
npm run deps
```

###Run install script:

```sh
we install -ru
```

###Configure your database:

Edit ```config/local.js``` file and change database configs to your database.

###Start the project with:

```sh
npm run dev
```


#Others links:

How to install we.js in ubuntu 15.04: https://gist.github.com/albertosouza/8af1c779253fce5c3988


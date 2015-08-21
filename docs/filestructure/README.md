#File structure

## Project ( app ) file structure
```
server/ #( project server sider folder )
- controllers/
- models/
- emails/
- forms/
- helpers/
- templates/
- widgets/
bin/
- [project script files for run in terminal]
config/ #( we.js project config folder )
- local.js ( local config file )
- [others config files]
- - locales/ #( node i18n locales files used in client and server )
- - - [locale].json
files/
- public/ #( public default production assets folder )
test/ #( tests folder with mocha )
- integration/
- - api/ #( serverside api tests )
- - - [mocha test files]
- bootstrap.js
- mocha.opts
bower.json (optional)
package.json
app.js
plugin.js (optional)
```

## Plugin file structure
```
lib/ ( npm module folder )
- index.js ( initial file how load in with require )
server/ ( we.js server files )
- controllers/
- models/
- emails/
- forms/
- helpers/
- templates/
- widgets/
files/
- public/ #( public default production assets folder )
README.md
package.json
plugin.js ( you plugin file )
```

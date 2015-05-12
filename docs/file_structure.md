#File structure

## App file structure
```
server/ #( project api folder )
- controllers/
- models/
- responses/
- services/
bin/
- [project script files for run in terminal]
client/
- app/
- - emberApp.js ( run before load project resouces and set window.App object )
- - afterEmberFilesLoaded.js ( run after load project resouces use to configure something )
- appAdmin
- - emberApp.js
- - afterEmberFilesLoaded.js
config/ #( we.js project config folder )
- local.js ( local config file )
- [others config files]
- - locales/ #( node i18n locales files used in client and server )
- - - [locale].json
files/
- public/ #( public default production assets folder )
tasks/ #( grunt tasks )
- config
- - [project custom tasks or core config change]
- register
- - [project custom tasks or core tasks change]
test/ #( tests folder with mocha )
- integration/
- - api/ #( serverside api tests )
- - - [mocha test files]
- bootstrap.js
- mocha.opts
bower.json ( opcional )
package.json
app.js
```

## Plugin file structure
```
client/ ( ember.js files )
- app/ ( [host]/públic/plugin/[plugin-name]/app/.. )
- - beforeAll/ (libs how run before all .js files )
- - - [file].js
- - libs/
- - mixins/
- - helpers/
- - adapters/
- - components/
- - controllers/
- - models/
- - routes/
- - templates/
- - - components/
- - - [feature]/
- - - [template].hbs
- appAdmin/ ( [host]/públic/plugin/[plugin-name]/appAdmin/.. )
- shared/ ( same structure as app but is load in app and appAdmin clientside projects )
lib/ ( npm module folder )
- index.js ( initial file how load in with require )
server/ ( we.js server files )
- controllers
- - [controller].js
- models/
- - [model].js
README.md
package.json
plugin.js ( you plugin file )
```

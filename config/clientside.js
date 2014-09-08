/**
 * Client side configs
 * This configs controlls we.js features and configurations
 *
 * @author Alberto Souza <contato@albertosouza.net>
 * @license [url] MIT
 */

module.exports.clientside = {
  // Plugin load types define load execution order
  plugins: {
    loadTypes: [
      'Core' ,
      'Plugin',
      'Extension'
    ]
  },
  // enable or disable we.js client side plugins here
  pluginsDefaultEnabled: [
    'weHTTPjQuery',
    'weSocketIO',
    'weI18njs',
    'weMessenger',
    // we.js plugin logger
    //'i18njs-log-untranslated-texts',
    'weEmberPlugin'
  ],
  // we.js logs
  log: {
    events: false,
    hooks: false
  },
  // adds one diferent version strig in every request
  forceBrowserCacheRefresh: false,
  // live reload configs
  // enable live reload flag
  // this only works with dev enviroment
  enableLiveReload: true,
  liveReloadUrl: 'http://localhost:12345/livereload.js',
  // this vars is send and avaible in api to all users
  publicVars: {}
};
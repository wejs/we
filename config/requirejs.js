module.exports.requirejs = {
  paths: {
    domReady: 'js/libs/requirejs/domReady',
    io: 'js/libs/socket.io',
    'sails.io': 'js/sails.io',
    app: 'js/app',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
    jquery: 'bower_components/jquery/dist/jquery',
    //'we-messenger': 'messenger/messenger',
    moment: 'bower_components/moment/moment',
    'moment-pt-br': 'bower_components/moment/lang/pt-br',
    async: 'bower_components/async/lib/async',
    handlebars: 'bower_components/handlebars/handlebars',
    // ember
    ember: 'bower_components/ember/ember',
    'ember-data': 'bower_components/ember-data/ember-data',
    'ember-data-sails-adapter': 'bower_components/ember-data-sails-adapter/ember-data-sails-adapter',
    'ember-i18n': 'bower_components/ember-i18n/lib/i18n',
    'ember-auth': 'bower_components/ember-auth/dist/ember-auth',

    // bootstrap for ember
    'bs-core': 'bower_components/ember-addons.bs_for_ember/dist/js/bs-core.max',
    //'bs-modal': 'bower_components/ember-addons.bs_for_ember/dist/js/bs-modal.max',
    'bs-modal': 'js/libs/bs-modal',
    'bs-button': 'bower_components/ember-addons.bs_for_ember/dist/js/bs-button.max',

    'showdown': 'bower_components/showdown/src/showdown',

    // precompiled ember templates
    emberTemplates: 'tpls.hbs',

    // wejs files
    we: 'bower_components/we/dist/we.onlywe',
    weEmberPlugin: 'js/ember/weEmberPlugin',
    emberApp: 'js/ember/emberApp',

    emberControllers: 'js/ember/emberControllers',
    emberViews: 'js/ember/emberViews'

  },
  shim: {
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    app: {
      deps: [
        'io',
        'sails.io'
      ]
    },
    'sails.io': {
      deps: [
        'io'
      ]
    },
    ember: {
      deps: [
        'handlebars',
        'jquery'
      ],
      exports: "Ember"
    },

    'ember-data': {
      deps: [
        'ember'
      ]
    },

    'ember-data-sails-adapter': {
      deps: [
        'ember',
        'ember-data'
      ],
    },
    emberTemplates: {
      deps: [
        'ember',
        'handlebars',
      ]
    },
    'bs-button': {
      deps: [
        'ember',
        'handlebars',
        'bootstrap',
        'bs-core'
      ]
    },
    'bs-core': {
      deps: [
        'ember',
        'handlebars',
        'bootstrap'
      ]
    }
  },
  //baseUrl: '/',
  urlArgs: 'v=0.0.53',
  deps: [
    'we'
  ]
};
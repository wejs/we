require.config({
  paths: {
    domReady: '/js/libs/requirejs/domReady',
    io: '/js/socket.io',
    'sails.io': '/js/sails.io',
    app: '/js/app',
    modules: 'modules',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../bower_components/jquery/dist/jquery',
    'ng-table': '../bower_components/ng-table/ng-table',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'we-messenger': 'messenger/messenger',
    moment: '../bower_components/moment/moment',
    'moment-pt-br': '../bower_components/moment/lang/pt-br',
    'angular-moment': '../bower_components/angular-moment/angular-moment',
    'ng-file-upload-shim': '../bower_components/ng-file-upload/angular-file-upload-shim',
    'ng-file-upload': '../bower_components/ng-file-upload/angular-file-upload',
    'wejs.config': 'wejs.config',
    we: '../bower_components/we/dist/we.onlywe',
    async: '../js/libs/async',
    'angular-formly': '../bower_components/angular-formly/dist/formly.min'
  },
  shim: {
    'angular-resource': {
      deps: [
        'angular'
      ]
    },
    'angular-cookies': {
      deps: [
        'angular'
      ]
    },
    'angular-bootstrap': {
      deps: [
        'angular',
        'bootstrap'
      ]
    },
    'angular-moment': {
      deps: [
        'angular',
        'moment',
        'moment-pt-br'
      ]
    },
    angular: {
      exports: 'angular',
      deps: [
        'ng-file-upload-shim'
        //'wejs.config'
      ]
    },
    'angular-ui-router': {
      deps: [
        'angular'
      ]
    },
    'angular-formly': {
      deps: [
        'angular'
      ]
    },
    'ng-table': {
      deps: [
        'angular'
      ]
    },
    'angular-route': {
      deps: [
        'angular'
      ]
    },
    'ng-file-upload': {
      deps: [
        'angular'
      ]
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    we: {
      deps: [
        'io',
        'sails.io',
        'jquery',
        'async'
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
    }
  },
  baseUrl: '/angularjs',
  urlArgs: 'v=0.0.52',
  deps: [
    'async',
    'we',
    'application'
  ]
});

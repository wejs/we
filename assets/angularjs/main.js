require.config({
  paths: {
    domReady: '/js/libs/requirejs/domReady',
    io: '/js/socket.io',
    'sails.io': '/js/sails.io',
    app: '/js/app',
    modules: 'modules',
    '$socket': 'site/services/socket',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../bower_components/jquery/dist/jquery',
    'ng-table': '../bower_components/ng-table/ng-table',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'we-messenger': '../bower_components/we-messenger/messenger',
    moment: '../bower_components/moment/moment',
    'angular-moment': '../bower_components/angular-moment/angular-moment',
    plugins: '../bower_components/tupi/dist/js/plugins.min',
    tupi: '../bower_components/tupi/dist/js/tupi.min',
    'ng-file-upload-shim': '../bower_components/ng-file-upload/angular-file-upload-shim',
    'ng-file-upload': '../bower_components/ng-file-upload/angular-file-upload'
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
        'moment'
      ]
    },
    angular: {
      exports: 'angular',
      deps: [
        'ng-file-upload-shim'
      ]
    },
    'angular-ui-router': {
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
  deps: [
    'application'
  ]
});

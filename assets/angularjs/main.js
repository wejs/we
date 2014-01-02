require.config({
  paths: {
    domReady: '/js/libs/requirejs/domReady',
    io: '/js/socket.io',
    'sails.io': '/js/sails.io',
    app: '/js/app',
    modules: 'modules',
    '$socket': 'site/services/socket',
    'we-components': '../bower_components/we-components/dist/*',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'jquery.postmessage-transport': '../bower_components/blueimp-file-upload/js/cors/jquery.postmessage-transport',
    'jquery.xdr-transport': '../bower_components/blueimp-file-upload/js/cors/jquery.xdr-transport',
    'jquery.ui.widget': '../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload': '../bower_components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload-process': '../bower_components/blueimp-file-upload/js/jquery.fileupload-process',
    'jquery.fileupload-validate': '../bower_components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-image': '../bower_components/blueimp-file-upload/js/jquery.fileupload-image',
    'jquery.fileupload-audio': '../bower_components/blueimp-file-upload/js/jquery.fileupload-audio',
    'jquery.fileupload-video': '../bower_components/blueimp-file-upload/js/jquery.fileupload-video',
    'jquery.fileupload-ui': '../bower_components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.fileupload-jquery-ui': '../bower_components/blueimp-file-upload/js/jquery.fileupload-jquery-ui',
    'jquery.fileupload-angular': '../bower_components/blueimp-file-upload/js/jquery.fileupload-angular',
    'jquery.iframe-transport': '../bower_components/blueimp-file-upload/js/jquery.iframe-transport',
    'canvas-to-blob': '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',
    'load-image': '../bower_components/blueimp-load-image/js/load-image',
    'load-image-ios': '../bower_components/blueimp-load-image/js/load-image-ios',
    'load-image-orientation': '../bower_components/blueimp-load-image/js/load-image-orientation',
    'load-image-meta': '../bower_components/blueimp-load-image/js/load-image-meta',
    'load-image-exif': '../bower_components/blueimp-load-image/js/load-image-exif',
    'load-image-exif-map': '../bower_components/blueimp-load-image/js/load-image-exif-map',
    'blueimp-tmpl': '../bower_components/blueimp-tmpl/js/tmpl',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../bower_components/jquery/jquery',
    'ng-table': '../bower_components/ng-table/ng-table',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
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
    angular: {
      exports: 'angular'
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
    imagesloaded: {
      deps: [
        'jquery'
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
    './starter'
  ]
});

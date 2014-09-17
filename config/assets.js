/**
 * Assets configs
 */

module.exports.assets = {

  css: [
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/summernote/dist/summernote.css',
    'bower_components/select2/select2.css',
    'bower_components/codemirror/lib/codemirror.css',
    'bower_components/Jcrop/css/jquery.Jcrop.css',
    'bower_components/lightbox/css/lightbox.css'
  ],


  js: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery.cookie/jquery.cookie.js',
    'bower_components/async/lib/async.js',
    'bower_components/lightbox/js/lightbox.js',

    'js/libs/**/*.js',

    'bower_components/codemirror/lib/codemirror.js',
    'bower_components/summernote/dist/summernote.js',
    'bower_components/select2/select2.js',
    'bower_components/Jcrop/js/jquery.Jcrop.js',

    'bower_components/we/dist/we.js',

    'bower_components/handlebars/handlebars.js',
    'bower_components/ember/ember.js',
    'bower_components/ember-data/ember-data.js',
    'bower_components/ember-data-sails-adapter/ember-data-sails-adapter.js',
    'bower_components/ember-breadcrumbs/dist/ember-breadcrumbs.js',
    'bower_components/ember-uploader/dist/ember-uploader.js',

    'bower_components/moment/min/moment-with-langs.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/nprogress/nprogress.js',

    'bower_components/*/ember/*/libs/**/*.js',
    'bower_components/ember-i18n/lib/i18n.js',

    'bower_components/*/ember/emberApp.js',
    'bower_components/*/ember/*/mixins/**/*.js',
    'bower_components/*/ember/*/helpers/**/*.js',
    'bower_components/*/ember/*/adapters/**/*.js',
    'bower_components/*/ember/*/routes/**/*.js',
    'bower_components/*/ember/*/controllers/**/*.js',
    'bower_components/*/ember/*/models/**/*.js',
    'bower_components/*/ember/*/views/**/*.js',
    'bower_components/*/ember/*/components/**/*.js',
    'bower_components/*/ember/afterEmberFilesLoaded.js'
  ],

  bowerComponentsFoldersToCopy: [
    'bower_components/font-awesome/fonts/**',
    'bower_components/bootstrap/dist/fonts/**/*',
    'bower_components/select2/*.png',
    'bower_components/select2/*.gif',
    'bower_components/lightbox/img/**/*'
  ]

};

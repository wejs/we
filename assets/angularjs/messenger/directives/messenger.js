/*
 * WE messenger directive
 *
 * Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define([
      'jquery',
      'angular',
      'messenger/messenger'
    ], factory);
  } else {
    factory();
  }
}(function() {

  angular.module('application.directives')
    .directive('weMessenger', [
    '$compile','$http', '$templateCache',
    function($compile, $http, $templateCache) {

      var getTemplate = function() {
        var templateLoader;
        // TODO move this template url to angular submodule config
        var baseUrl = '/angularjs/messenger/views/';
        var template = 'contact-list.html';

        var templateUrl = baseUrl + template;
        templateLoader = $http.get(templateUrl, {cache: $templateCache});

        return templateLoader;

      };

      var linker = function(scope, element, attrs) {

          var loader = getTemplate();

          var promise = loader.success(function(html) {
              element.html(html);
          }).then(function (response) {
              element.replaceWith($compile(element.html())(scope));
          });
      };

      return {
        restrict:"EA",
        link: linker
      };
    }
  ]);
}));
/*
 * WE messenger
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
      'angular-resource',
      'user/user',
    ], factory);
  } else {
    factory();
  }
}(function () {
  'use strict';

  // TODO chage define template url in config var
  var templateUrl = '/angularjs/messenger/views/';

  // --- MODULE ---
  angular.module('we-messenger', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ]).
  config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    }
  ]);

  // --- DIRECTIVES ---
  angular.module("we-messenger")
  .directive('weMessenger', [
    '$compile','$http', '$templateCache',
    function($compile, $http, $templateCache) {

      var templateFileUrl = templateUrl + 'contact-list.html';

      return {
        templateUrl: templateFileUrl,
        restrict:"EA"
      };
    }
  ]);

  /**
   * Messenger box contact directive
   * run for every contact in mesenger box
   */
  angular.module("we-messenger")
  .directive('messengerContactMessage', [ '$timeout',
    function() {
      return {
        restrict:"A",
        link: function(scope, element, attrs){
          if (scope.$last) {
            // TODO search for a better form to scroll to bottom function
            setTimeout(function () {
              var box = jQuery(element).parent();
              var scrollToThis = box.innerHeight() * 10;
              box.scrollTop( scrollToThis );
            }, 20);
          }
        }
      };
    }
  ]);

  // --- CONTROLERS ---
  angular.module("we-messenger")
  .controller("MessengerCtrl", [
    "$scope",
    "$location",
    "AUTH_EVENTS",
     function($scope, $location, AUTH_EVENTS) {
      var init;
      var startMessenger;
      var moduleUrl = '/angularjs/messenger';

      $scope.templates = {};
      $scope.rooms = {};

      $scope.messengerEnabled = false;

      $scope.publicRoom = we.messenger.publicRoom;

      $scope.contactList = {};
      $scope.contactList.show = false;

      $scope.user = we.authenticatedUser;
      $scope.contacts = we.messenger.contacts;
      $scope.openContact = we.messenger.openContact;

      var $socket = we.messenger.socket;



      init = function() {

        $scope.templates.messengerBox = {
          name: 'messenger-box.html',
          url: templateUrl + '/messenger-box.html'
        };
        $scope.templates.messengerBoxPublic = {
          name: 'messenger-box-public.html',
          url: templateUrl + '/messenger-box-public.html'
        };

        if($scope.user.id){
          $scope.startMessenger();
        }
      };

      /**
       * Get messenger data and start
       *
       */
      $scope.startMessenger = function (){
        we.messenger.startMessenger(function(error, response){
          if(error){

          }else{
            $scope.messengerEnabled = true;
            $scope.contactList.get();
          }

        });
      };

      $scope.contactList.get = function (){
        we.messenger.getContactList(function(error, data){
          if(error){

          }else{
            if(!$scope.$$phase) {
              $scope.$apply();
            }
          }
        });
      };

      $scope.contactList.open = function (){
        $scope.contactList.show = true;
      };

      $scope.contactList.close = function (){
        $scope.contactList.show = false;
      };

      // room functions

      /**
       * Subscriibe to one room for receive new messages
       */
      $scope.rooms.create = function(id) {

      };

      /**
       * Subscriibe to one room for receive new messages
       */
      $scope.rooms.subscribe = function(id) {

      };


      /**
       * Unsubscriibe from one room
       */
      $scope.rooms.unsubscribe = function(id) {

      };

      /**
       * Start talk,
       * runs after a user click in one contact or room in contact list
       *
       * @param  {string} contactId  contact or room id
       * @param  {string} type       room or contact flat type
       */
      $scope.startTalk = function (id, type){

        if(!type) type = 'contact';

        switch(type) {
        case 'public':
          // get new messages in this room
          if(!$scope.publicRoom.messengerBox.show){
            we.messenger.getMessagesPublic(function(error, messages){
              if(error){

              }else{
                if(messages){
                  messages.reverse();

                  var messagesLastIndex = messages.length;
                  messagesLastIndex--;
                  $scope.publicRoom.messages = messages;

                  if(!$scope.$$phase) {
                    $scope.$apply();
                  }

                }
              }

            });
          }

          $scope.publicRoom.messengerBox.show = true;
          $scope.publicRoom.messengerBox.opened = true;
        break;
        case 'room':
          console.info('TODO messenger rooms');

        break;
        default:

          if(!$scope.contacts[id].messengerBox.show){

            we.messenger.getMessagesWithUser(id, function(error, messages){
              if(error){

              }else{

                if(messages){
                  $scope.contacts[id].messages = messages;
                }

                $scope.contacts[id].messengerBox.show = true;
                $scope.contacts[id].messengerBox.opened = true;
                if(!$scope.$$phase) {
                  $scope.$apply();
                }
              }

            });
          }
        }

      };

      $scope.messengerBoxClose = function(contactId) {
        $scope.contacts[contactId].messengerBox.show = false;
      };

      $scope.messengerBoxToggle = function(contactId) {
        if($scope.contacts[contactId].messengerBox.opened){
          $scope.contacts[contactId].messengerBox.opened = false;
        }else{
          $scope.contacts[contactId].messengerBox.opened = true;
        }
      };

      $scope.messengerPublicBoxClose = function(contactId) {
        $scope.publicRoom.messengerBox.show = false;
      };

      $scope.messengerPublicBoxToggle = function(contactId) {
        if($scope.publicRoom.messengerBox.opened){
          $scope.publicRoom.messengerBox.opened = false;
        }else{
          $scope.publicRoom.messengerBox.opened = true;
        }
      };

      /**
       * Alert new message received
       * @param  {string} contactId
       */
      $scope.messengerAlertNewMessageReceived = function (contactId){
        console.log('messengerAlertNewMessageReceived',$scope);

        if(contactId != 'public'){
          $scope.startTalk(contactId);
        }
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      };

      $scope.emitIsWriting = function (contactId){
        we.messenger.emitIsWriting(contactId);
      };

      $scope.send = function (newMessage, toId, event){
        event.preventDefault();
        event.stopPropagation();

        if(toId){
           we.messenger.sendMessage(newMessage, toId, function(error, message){
            // after send the message
            if(!$scope.$$phase) {
              $scope.$apply();
            }

            setTimeout(function changeMessageStatus() {
              message.status = 'salved';
              if(!$scope.$$phase) {
                $scope.$apply();
              }
            }, 2000);

          });
        } else {
          we.messenger.sendPublicMessage(newMessage, function(error, response){
            // after send the public message
            if(!$scope.$$phase) {
              $scope.$apply();
            }
          });
        }

      };

      //--- Socket IO ---//


      we.hooks.on('we-messenger-user-writing-start', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });

      we.hooks.on('we-messenger-user-writing-end', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });



      we.hooks.on('we-messenger-message-received', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });


      we.hooks.on('we-messenger-public-message-received', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });


      we.hooks.on('we-messenger-contact-connected', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });

      we.hooks.on('we-messenger-contact-diconnected', function(){
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });

      return init();
    }
  ]);

}));
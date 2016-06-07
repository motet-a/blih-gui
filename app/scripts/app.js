/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:13:52+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-07T18:06:56+02:00
* @License: MIT
*/

(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
      'ngRoute',
      'ngStorage',
      'ui.bootstrap'
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: _templateBase + '/auth/auth.html' ,
          controller: 'authController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/main', {
          templateUrl: _templateBase + '/blih/main.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/ssh', {
          templateUrl: _templateBase + '/blih/ssh.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/setting', {
          templateUrl: _templateBase + '/blih/setting.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/source', {
          templateUrl: _templateBase + '/blih/source.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/about', {
          templateUrl: _templateBase + '/blih/about.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.otherwise({ redirectTo: '/' });
    }]);
})();

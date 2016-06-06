/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:13:52+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T22:05:37+02:00
* @License: MIT
*/

(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
      'ngRoute'
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: _templateBase + '/blih/auth.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.when('/main', {
          templateUrl: _templateBase + '/blih/main.html' ,
          controller: 'blihController',
          controllerAs: '_ctrl'
      });
      $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();

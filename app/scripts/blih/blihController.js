/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:43:49+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T22:11:57+02:00
* @License: MIT
*/

(function () {
    'use strict';
    angular.module('app')
        .controller('blihController', ['blihService', '$scope', '$location', '$localStorage', BlihController]);

    function BlihController(blih, $scope, $location, $localStorage)
    {
      $localStorage.$default({
        repositories: []
      });
      $scope.repositories = $localStorage.repositories;

      $scope.disconnect = function () {
          $location.path('/auth');
      };

      $scope.refresh = function () {
        blih.getRepositories().then(function (data) {
          // success
          console.log('success');
          for (var key in data.repositories)
            $localStorage.repositories.push({name: key});
        },function (data) {
          // error
          console.log('error');
          console.log(data)
        });
      }
    }
}) ();

/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:43:49+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   initerworker
* @Last modified time: 2016-06-11T23:06:46+02:00
* @License: MIT
*/

(function () {
    'use strict';
    angular.module('app')
        .controller('blihController', ['blihService', '$scope', '$location', '$localStorage', BlihController]);

    function BlihController(blih, $scope, $location, $localStorage)
    {
      console.log($localStorage.blihData.userData);
      $scope.userData = $localStorage.blihData.userData;
      $scope.repositories = $localStorage.blihData.repositories;
      $scope.getRepostories = function () {
        blih.getAllRepositoriesData().then(function () {
          $scope.repositories = $localStorage.blihData.repositories;
        }, function () {

        });
      };

      if ($scope.repositories.length == 0)
        $scope.getRepostories();
    }
}) ();

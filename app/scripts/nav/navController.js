/**
* @Author: Bonetti Walter <initerworker>
* @Date:   2016-06-10T23:30:13+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   initerworker
* @Last modified time: 2016-06-11T00:27:05+02:00
* @License: MIT
*/



(function () {
    'use strict';
    angular.module('app')
        .controller('navController', ['blihService', '$scope', '$location', '$localStorage', NavController]);

    function NavController(blih, $scope, $location, $localStorage)
    {
      $scope.userData = $localStorage.blihData.userData;

      $scope.logout = function () {
        blih.disconnect();
        $location.path('/');
      };

    }
}) ();

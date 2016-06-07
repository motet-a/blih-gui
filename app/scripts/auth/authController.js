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
        .controller('authController', ['blihService', '$scope', '$location', '$localStorage', AuthController]);

    function AuthController(blih, $scope, $location, $localStorage)
    {
        $localStorage.userData = {};
        $scope.user = {};
        $scope.alerts = [];

        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };

        $scope.connection = function(user) {
            user.login = user.login;
            user.token = blih.generateToken(user.password);
            user.status = 0;
            
            blih.connect(user).then(function (data) {
              $location.path('/main');
            },
            function (data) {
              $scope.alerts.push({style: 'danger', msg: data});
            });
        };
    }
}) ();

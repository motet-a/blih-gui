/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:43:49+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   initerworker
* @Last modified time: 2016-06-11T00:20:50+02:00
* @License: MIT
*/

(function () {
    'use strict';
    angular.module('app')
        .controller('authController', ['blihService', '$scope', '$location', '$localStorage', AuthController]);

    function AuthController(blih, $scope, $location, $localStorage)
    {
        if ($localStorage.blihData.userData.status == 1)
          $location.path('/main');

        $scope.user = {};
        $scope.alerts = [];

        this.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };

        this.connection = function(user) {
            user.login = user.login;
            user.token = blih.generateToken(user.password);
            user.status = 0;

            blih.connect(user).then(function (data) {
              $localStorage.blihData.userData.status = 1;
              $location.path('/main');
            },
            function (data) {
              $scope.alerts.push({style: 'danger', msg: data});
            });
        };


    }
}) ();

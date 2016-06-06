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
    var blihApi = require('blih-api');
    var Blih;

    angular.module('app')
        .controller('blihController', ['$scope', '$location', blihController]);

    function blihController($scope, $location)
    {
        $scope.user = {
            login: '',
            password: ''
        }

        $scope.invalid = {
          message: '',
          error: false
        };

        // TODO: rewrite a serviceBlih
        $scope.repositories = [];
        $scope.connection = function (user) {
          Blih = new blihApi(user.login, user.password);
          Blih.getRepositories(function (data) {
            if (data.error !== undefined)
              {
                $scope.invalid.message = data.error;
                $scope.invalid.error = true;
                return ;
              }
            $location.path( "/main" );
            return ;
          });
        };
    }
}) ();

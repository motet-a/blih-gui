/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T19:43:49+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-07T18:33:00+02:00
* @License: MIT
*/

(function () {
    'use strict';
    angular.module('app')
        .controller('blihController', ['blihService', '$scope', '$location', '$localStorage', BlihController]);

    function BlihController(blih, $scope, $location, $localStorage)
    {
      $scope.repositories = $localStorage.repositories;

      this.disconnect = function () {
          $localStorage.repositories = [];
          console.log($localStorage.repositories);
          $location.path('/auth');
      };

      this.refresh = function () {
        console.log('refresh function');
        blih.getRepositories().then(function (data) {
          // success
          localStorage.repositories = [];
          console.log('success');
          for (var key in data.repositories)
            $localStorage.repositories.push({name: key, info: {}});
        },function (data) {
          // error
          console.log('error');
          console.log(data)
        });
        this.repositoriesInfo();
      }

      this.repositoryInfo = function (repository) {
        blih.getInfoRepository(repository).then(function (data) {
          repository.info = data.message;
        },
        function (error) {
          console.log(error);
        });
      };

      this.repositoriesInfo = function () {
        for (var elm in $localStorage.repositories)
        {
          this.repositoryInfo($localStorage.repositories[elm]);
        }
      }

      if ($localStorage.repositories.length == 0)
      {
        console.log('First loader');
        this.refresh();
      }
    }
}) ();

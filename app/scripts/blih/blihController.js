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
          $localStorage.userData = {};
          $location.path('/auth');
      };

      var that = this;
      this.refresh = function () {
        console.log('refresh function');
        $localStorage.repositories = [];
        console.log($localStorage.repositories);
        blih.getRepositories().then(function (data) {
          for (var key in data.repositories)
            {
              $localStorage.repositories.push({name: key, type: "git", info: {}, acl: {}});
            }
        },function (data) {
          console.error('error when update repositories');
        }).then(function () {
          that.repositoriesInfo();
          that.repositoriesAcl();
        },
        function (error) {
          console.error('error when update');
        }).then(function () {
          $scope.repositories = $localStorage.repositories;
        }, function () {

        });
      }

      this.clearRepositories = function () {
        $localStorage.repositories = [];
        $scope.repositories = $localStorage.repositories;
      }

      this.repositoryInfo = function (repository) {
        return blih.getInfoRepository(repository).then(function (data) {
          repository.info = data.message;
        },
        function (error) {
          console.log(error);
        });
      };

      this.repositoryAcl = function (repository) {
        return blih.getAclRepository(repository).then(function (data) {
          console.log(data);
          repository.acl = data;
        }, function () {
          console.error('error when getAcl rights');
        })
      };

      this.repositoriesInfo = function () {
        for (var elm in $localStorage.repositories)
        {
          this.repositoryInfo($localStorage.repositories[elm]).then(function () {
            // succes
          },function () {
            // error
          });
        }
      };

      this.repositoriesAcl = function () {
        for (var elm in $localStorage.repositories)
        {
          this.repositoryAcl($localStorage.repositories[elm]).then(function () {
            // success
          },function () {
            // error
          });
        }
      }

      if ($localStorage.repositories.length == 0)
      {
        console.log('First loader');
        this.refresh();
      }
    }
}) ();

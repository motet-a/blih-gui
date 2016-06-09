/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-07T16:20:57+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-07T17:56:32+02:00
* @License: MIT
*/

(function () {
  angular.module('app')
        .service('blihService', ['$localStorage', '$q', BlihService]);
  var blihApi = require('blih-api');
  var Blih = new blihApi();

  function BlihService($localStorage, $q) {
    return {
      connect: connect,
      generateToken: generateToken,
      getRepositories: getRepositories,
      getSshKey: getSshKey,
      createSshKey: createSshKey,
      deleteSshKey: deleteSshKey,
      getAclRepository: getAclRepository,
      getInfoRepository: getInfoRepository,
      createRepository: createRepository,
      setAclRepository: setAclRepository,
      deleteRepository: deleteRepository
    };

    function connect(userData) {
        var deffered = $q.defer();
        Blih.getRepositories(userData, function (data) {
          if (data.error)
            deffered.reject(data.error);
          else {
            $localStorage.userData = userData;
          }
          deffered.resolve(data);
        });
        return deffered.promise;
    };

    function generateToken(password)
    {
      console.log('Generate token with:' + password);
      console.log('Ouput token:' + Blih.generateToken(password));
      return (Blih.generateToken(password));
    }

    function getRepositories() {
      var deffered = $q.defer();
      if ($localStorage.userData.login === undefined)
        return null;
      Blih.getRepositories($localStorage.userData, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function getSshKey() {
      var deffered = $q.defer();
      Blih.getSshKey(function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    }

    function getInfoRepository(repository) {
      var deffered = $q.defer();
      Blih.getRepositoriesInfo($localStorage.userData, repository.name, function (data) {
          if (data.error !== undefined)
            deffered.reject(data.error);
          deffered.resolve(data);
      });
      return deffered.promise;
    };

    function createRepository(repository) {
      var deffered = $q.defer();
      if (repository.type === undefined
      || repository.name === undefined)
      {
        deffered.reject("Error: on undefined value.");
        return deffered.promise;
      }
      Blih.createRepository($localStorage.userData, repository.name, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      })
      return deffered.promise;
    };

    function getAclRepository(repository) {
      var deffered = $q.defer();
      Blih.getAcl($localStorage.userData, repository.name, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      })
      return deffered.promise;
    };

    function setAclRepository(repository) {
      // Add for one
      // Add acl with bool change
    };

    function deleteRepository(repository) {
      console.log('call delete repository: ' + repository.name);
    };

    /* TODO: use spec format */
    function deleteSshKey(sshKey) {
      console.log('call delete ssh: ');
      console.log(sshKey);
    };

    function createSshKey(sshKey) {
      console.log(sshKey);
    };
  };
}) ();

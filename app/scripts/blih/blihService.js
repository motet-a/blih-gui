/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-07T16:20:57+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   initerworker
* @Last modified time: 2016-06-11T23:08:15+02:00
* @License: MIT
*/

(function () {
  angular.module('app')
        .service('blihService', ['$localStorage', '$q', BlihService]);
  var blihApi = require('blih-api');
  var Blih = new blihApi();

  function BlihService($localStorage, $q) {

    $localStorage.$default({
      blihData: {
        repositories: [],
        sshkey: [],
        userData: {
          login: '',
          password: '',
          token: '',
          status: 0
        }
      }
    });

    return {
      connect: connect,
      disconnect: disconnect,
      generateToken: generateToken,
      getRepositories: getRepositories,
      getSshKey: getSshKey,
      createSshKey: createSshKey,
      deleteSshKey: deleteSshKey,
      getAclRepository: getAclRepository,
      getInfoRepository: getInfoRepository,
      createRepository: createRepository,
      setAclRepository: setAclRepository,
      deleteRepository: deleteRepository,
      getAllRepositoriesData: getAllRepositoriesData
    };

    function disconnect() {
      $localStorage.blihData = {
        repositories: [],
        sshkey: [],
        userData: {
          login: '',
          password: '',
          token: '',
          status: 0
        }
      };
    }

    function connect(userData) {
        var deffered = $q.defer();
        Blih.getRepositories(userData, function (data) {
          if (data.error)
            deffered.reject(data.error);
          else {
            $localStorage.blihData.userData = userData;
          }
          deffered.resolve(data);
        });
        return deffered.promise;
    };

    function generateToken(password)
    {
      return (Blih.generateToken(password));
    }

    function getRepositories() {
      var deffered = $q.defer();
      if ($localStorage.blihData.userData.login === undefined)
        return null;
      Blih.getRepositories($localStorage.blihData.userData, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function getSshKey() {
      var deffered = $q.defer();
      Blih.getSshKey($localStorage.blihData.userData, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    }

    function getInfoRepository(repository) {
      var deffered = $q.defer();
      Blih.getRepositoriesInfo($localStorage.blihData.userData, repository.name, function (data) {
          if (data.error !== undefined)
            deffered.reject(data.error);
          deffered.resolve(data);
      });
      return deffered.promise;
    };

    function createRepository(repository) {
      var deffered = $q.defer();
      Blih.createRepository($localStorage.blihData.userData, repository.name, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function getAclRepository(repository) {
      var deffered = $q.defer();
      Blih.getAcl($localStorage.blihData.userData, repository.name, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function setAclRepository(repository, username, rights) {
      var deffered = $q.defer();
      Blih.setAcl($localStorage.blihData.userData, repository.name, username, rights, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function deleteRepository(repository) {
      var deffered = $q.defer();
      Blih.deleteRepository($localStorage.blihData.userData, repository.name, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function deleteSshKey(sshKey) {
      var deffered = $q.defer();
      Blih.deleteSshKey($localStorage.blihData.userData, sshkey.id, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function createSshKey(sshkey_str) {
      var deffered = $q.defer();
      Blih.deleteSshKey($localStorage.blihData.userData, sshkey_str, function (data) {
        if (data.error)
          deffered.reject(data.error);
        deffered.resolve(data);
      });
      return deffered.promise;
    };

    function getAllInfo(repository)
    {
      return getInfoRepository(repository).then(function (data) {
        repository.info = data.message;
      }, function (error) {
        console.error('message: ' + error);
      });
    }

    function getAllAcl(repository)
    {
      return getAclRepository(repository).then(function (data) {
        repository.acl= data;
      }, function (error) {
        console.error('message: ' + error);
      });
    }

    function getAllRepositoriesData() {
      return this.getRepositories()
      .then(function (data) {
        // Success
        $localStorage.blihData.repositories = [];
        for (var key in data.repositories)
          {
            $localStorage.blihData.repositories
            .push({name: key, type: "git", info: {}, acl: {}});
          }
      },
      function (error) {
        console.log("error : " + error);
      })
      .then(function () {
          // succes
          for (var idx in $localStorage.blihData.repositories)
          {
            // Get the info of all repositories
            getAllInfo($localStorage.blihData.repositories[idx])
            // Get the Acl Rights of all repositories
            getAllAcl($localStorage.blihData.repositories[idx]);
          }
      },
      function (error) {
        console.error('message: ' + error);
      });
    }
  };
}) ();

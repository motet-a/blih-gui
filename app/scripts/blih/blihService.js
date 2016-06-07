/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-07T16:20:57+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-07T16:40:15+02:00
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
      {
        console.log('error: data is empty');
        console.log($localStorage);
        return null;
      }
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

    };

    function createRepository(repository) {

    };

    function setAclRepository(repository) {

    };

    function deleteRepository(repository) {

    };
  };
}) ();

(function() {
    'use strict';

    angular
        .module('sbApp')
        .service('fileListService', fileListService);

    /** @ngInject */
    function fileListService($http, $q) {

        this.getListOfFiles = getListOfFiles;

        function getListOfFiles() {
            var deferred = $q.defer();
            $http({
                url: 'http://jsonstub.com/sbapp/files',
                method: 'GET',
                dataType: 'json',
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                    'JsonStub-User-Key': '196a9c46-1682-40bd-994b-b9f417caa5fc',
                    'JsonStub-Project-Key': 'e0cb1a9a-aa98-4d0c-a17d-a38eb0f7509f'
                }
            }).then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject;
                });

            return deferred.promise;
        }
    }

})();

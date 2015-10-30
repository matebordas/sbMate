(function() {
    'use strict';

    angular
        .module('sbApp')
        .directive('fileTable', fileTable);

    /** @ngInject */
    function fileTable() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/fileTable/fileTable.html',
         /*   scope: {
                creationDate: '='
            },*/
            controller: fileTableController,
            controllerAs: 'vm',
            bindToController: true,
            link: fileTableLink
        };

        return directive;

        /** @ngInject */
        function fileTableController($q, DTOptionsBuilder, DTColumnBuilder) {
            var vm = this;

            var getTableData = function() {
                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;
            };

            var data = [
                {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                }, {
                    "date":"2012-10-13",
                    "size":52802455,
                    "type":"txt",
                    "filename":"labore minim.ppt"
                },
                {
                    "date": "2012-12-16",
                    "size": 87726956,
                    "type": "ppt",
                    "filename": "esse cupidatat.xls"
                }];

            vm.dtOptions = DTOptionsBuilder
                //.fromSource(          )
                .fromFnPromise(getTableData())
                .withFixedHeader({
                    bottom: true
                })
                .withOption('bFilter', false)
                .withOption('bLengthChange', false)
                .withDisplayLength(20)
                .withBootstrap();

            vm.dtColumns = [
                DTColumnBuilder.newColumn('date').withTitle('date'),
                DTColumnBuilder.newColumn('size').withTitle('size'),
                DTColumnBuilder.newColumn('type').withTitle('type'),
                DTColumnBuilder.newColumn('filename').withTitle('filename')
            ];
        }

        function fileTableLink(scope, el, attr, vm) {

        }
    }

})();

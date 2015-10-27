(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, webDevTec, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;

   /* vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1445898612341;
    vm.showToastr = showToastr;*/

      var getTableData = function() {
          var deferred = $q.defer();
          deferred.resolve([
              {
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
              }]);
          return deferred.promise;
      };


      vm.dtOptions = DTOptionsBuilder
          //.fromSource(          )
          .fromFnPromise(getTableData())
          // Add Bootstrap compatibility
         .withBootstrap();

      vm.dtColumns = [
          DTColumnBuilder.newColumn('date').withTitle('date'),
          DTColumnBuilder.newColumn('size').withTitle('size'),
          DTColumnBuilder.newColumn('type').withTitle('type'),
          DTColumnBuilder.newColumn('filename').withTitle('filename')
      ];

   /* activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }*/
  }
})();

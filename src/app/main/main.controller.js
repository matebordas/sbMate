(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(fileListService) {
    var vm = this;



    /*  var getTableData = function() {
          var deferred = $q.defer();
          deferred.resolve(data);
         return deferred.promise;
      };*/

      vm.fileList = [
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
                  "type":"pdf",
                  "filename":"labore minim.ppt"
              }, {
                  "date":"2012-10-13",
                  "size":52802455,
                  "type":"pdf",
                  "filename":"labore minim.ppt"
              }, {
                  "date":"2012-10-13",
                  "size":52802455,
                  "type":"pdf",
                  "filename":"labore minim.ppt"
              },
          {
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },{
              "date":"2012-10-13",
              "size":52802455,
              "type":"pdf",
              "filename":"labore minim.ppt"
          },
          {
              "date": "2012-12-16",
              "size": 87726956,
              "type": "ppt",
              "filename": "esse cupidatat.xls"
          }];

      vm.filteredFiles = [];
      vm.allFiles = [];

      vm.table = {
          allFiles: [],
          filteredFiles: [],
          currentPage : null,
          pagesArray : null
      };

   /*   vm.chnageTablePage = function(pageNumber) {
          tableService.chnageTablePage(vm.table, pageNumber);
      };

      vm.getIndexOfFile = function(arrayList, itemToFind) {
          return tableService.getIndexOfUser(arrayList, itemToFind);
      };*/


      fileListService.getListOfFiles().then(function (data) {
         // tableService.updateTableWithNewDataSet(vm.table, data);
          console.log(data.length);
          console.log(data[0]);
      }, function (reason) {
          $log.error('Failed: ' + reason);
      });

    }
})();

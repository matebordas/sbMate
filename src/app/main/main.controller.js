(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(fileListService, tableService, $timeout) {
      var vm = this;

      vm.table = {
          allFiles: [],
          filteredFiles: [],
          currentPage : null,
          pagesArray : null,
          visiblePagesArray: null,
          sortedBy: null,
          sortOrder: null
      };

      vm.chnageTablePage = function(pageNumber) {
          tableService.chnageTablePage(vm.table, pageNumber);
      };

      vm.getIndexOfItem = function(arrayList, itemToFind) {
          return tableService.getIndexOfItem(arrayList, itemToFind);
      };

      vm.floatTheadOptions = {
          top: 0,
          position: 'absolute'
      };

      vm.sortBy = function(attribute) {
          tableService.sortFilesBy(vm.table, attribute)
      };

      fileListService.getListOfFiles().then(function (data) {
          $timeout(tableService.updateTableWithNewDataSet(vm.table, data), 0);  //Put this in the event queue with timeout
          console.log(data.length);
      }, function (reason) {
          $log.error('Failed: ' + reason);
      });
    }
})();

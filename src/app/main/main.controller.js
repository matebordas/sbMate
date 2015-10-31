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
          sortOrder: null,
          groupedBy: null
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

      vm.groupByAttribute = function(attribute) {
          vm.table.groupedBy = attribute;

          if(attribute !== '') {
              tableService.groupByAttribute(vm.table, attribute);
          } else {
              vm.table.groupedBy = null;
              updateTableWithNewDataSet();
          }
      };

      vm.getGroupByText = function() {
          switch(vm.table.groupedBy) {
              case "filename":
                  return "File Name";
                  break;
              case "type":
                  return "Type";
                  break;
              case "date":
                  return "Date";
                  break;
              case "size":
                  return "Size";
                  break
              default:
                  return "No Grouping";
          }
      };

      updateTableWithNewDataSet();

      function updateTableWithNewDataSet() {
          fileListService.getListOfFiles().then(function (data) {
              $timeout(tableService.updateTableWithNewDataSet(vm.table, data, false), 0);  //Put this in the event queue with timeout
              console.log(data.length);
          }, function (reason) {
              $log.error('Failed: ' + reason);
          });
      }
    }
})();

(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, fileListService, tableService, $timeout) {
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
              case "type":
                  return "Type";
              case "date":
                  return "Date";
              case "size":
                  return "Size";
              default:
                  return "No Grouping";
          }
      };

      vm.toggleFileSelect = function(file) {
          file.selected = file.selected ? false : true;
      };

      updateTableWithNewDataSet();

      function updateTableWithNewDataSet() {
          fileListService.getListOfFiles().then(function (data) {
              $timeout(tableService.updateTableWithNewDataSet(vm.table, data, false), 0);  //Put this in the event queue with timeout
              $log.log(data.length);
          }, function (reason) {
              $log.error('Failed: ' + reason);
          });
      }
    }
})();

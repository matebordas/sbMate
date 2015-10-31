(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, fileListService, tableService, $timeout) {
      var vm = this;
      var initialFileIndex = null;

      vm.modalFile = {};

      vm.table = {
          initialFilesList: [],
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
          if(attribute !== '') {
              /*We need to reset the table data before grouping*/
              tableService.updateTableWithNewDataSet(vm.table, vm.table.initialFilesList, false)

              vm.table.groupedBy = attribute;
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

      /*
      * This is a very ugly solution for saving/discarding changes,
      * But I really don't have time for a nicer one
      * */
      vm.selectFile = function(file) {
          /*Clone the object*/
          vm.selectedFile = angular.fromJson(angular.toJson(file));
          initialFileIndex = vm.getIndexOfItem(vm.table.allFiles, file);
      };

      vm.saveChanges = function() {
          vm.table.filteredFiles[initialFileIndex] = vm.selectedFile;
          vm.table.allFiles[initialFileIndex] = vm.selectedFile;
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

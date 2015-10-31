/**
 * Created by mabo on 10/21/2015.
 */
(function() {
    'use strict';

    angular
        .module('sbApp')
        .service('tableService', tableService);

    /** @ngInject */
    function tableService() {
        var stepSize = 20;

        this.getNumberOfPages = getNumberOfPages;
        this.filterDataByPage = filterDataByPage;
        this.getIndexOfItem = getIndexOfItem;
        this.chnageTablePage = chnageTablePage;
        this.updateTableWithNewDataSet = updateTableWithNewDataSet;

        function getNumberOfPages(dataSet) {
            var pagesNumber = parseInt(dataSet.length / stepSize);
            if((dataSet.length % stepSize) > 0) {
                pagesNumber++;
            }
            return pagesNumber;
        }

        function filterDataByPage(pageNumber, dataToFilter) {
                var startIndex = (pageNumber - 1) * stepSize;
                var endIndex = (pageNumber * stepSize);

                return dataToFilter.slice(startIndex, endIndex);
        }

        function getIndexOfItem(arrayList, itemToFind) {
            for(var i = 0; i < arrayList.length; i++) {
                var item = arrayList[i];

                /*
                 * different instances of an object are never equal
                 * so we compare all their properties like this
                 */
                if(angular.toJson(item) === angular.toJson(itemToFind)){
                    return i;
                }
            }
            return -1;
        }

        function chnageTablePage(table, pageNumber) {
            if(pageNumber !== null && pageNumber > 0 && pageNumber <= table.pagesArray.length) {
                table.currentPage = pageNumber;
                table.filteredFiles = filterDataByPage(pageNumber, table.allFiles);
            }
        }

        function updateTableWithNewDataSet(table, newDataSet) {
            table.allFiles = newDataSet

            var numberOfPages = getNumberOfPages(table.allFiles);
            table.pagesArray = new Array(numberOfPages);

            if (table.allFiles.length > 0) {
                if(table.currentPage === null) {
                    chnageTablePage(table, 1);
                } else {
                   /* If the last page was longer than the new pagesArray, set it to the pagesArray length*/
                    var newPage = table.currentPage > table.pagesArray.length ? table.pagesArray.length : table.currentPage;
                    chnageTablePage(table, newPage);
                }

               /*If we got an empty array then reset the values*/
            } else {
                table.currentPage = null;
                table.filteredFiles = [];
            }

            sortFilesBy(table, "filename");
        }

        function sortFilesBy(table, attribute) {
            switch(attribute) {
                case "filename":
                        sortByAttribute(table, "filename");
                    break;
                case "type":
                        sortByAttribute(table, "type");
                    break;
                case "date":
                        sortByAttribute(table, "date");
                    break;
                case "size":
                        sortByAttribute(table, "size");
                    break;
            }
            chnageTablePage(table, 1);
        }


        function sortByAttribute(table, attribute) {
            if(table.sortedBy !== attribute) {

                table.sortedBy = attribute;
                table.sortOrder = "asc"
                ascSortList(table.allFiles, attribute);

            } else if(table.sortedBy === attribute) {

                if (table.sortOrder === "asc") {
                    table.sortOrder = "desc";
                    descSortList(table.allFiles, attribute);
                } else {
                    table.sortOrder = "asc";
                    ascSortList(table.allFiles, attribute);
                }
            }
        }

        function ascSortList(list, attribute) {
            list.sort(function(a, b) {
                if (a[attribute].toLowerCase() < b[attribute].toLowerCase()) {
                    return -1;
                }
                if (a[attribute].toLowerCase() > b[attribute].toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        }


        function descSortList(list, attribute) {
            list.sort(function(a, b) {
                if (b[attribute].toLowerCase() < a[attribute].toLowerCase()) {
                    return -1;
                }
                if (b[attribute].toLowerCase() > a[attribute].toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        }
    }

})();

/**
 * Created by mabo on 10/21/2015.
 */
(function() {
    'use strict';

    angular
        .module('sbApp')
        .service('tableService', tableService);

    /** @ngInject */
    function tableService(arrayUtil) {
        var stepSize = 20;

        this.getNumberOfPages = getNumberOfPages;
        this.filterDataByPage = filterDataByPage;
        this.getIndexOfItem = getIndexOfItem;
        this.chnageTablePage = chnageTablePage;
        this.updateTableWithNewDataSet = updateTableWithNewDataSet;
        this.sortFilesBy = sortFilesBy;
        this.groupByAttribute = groupByAttribute;

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

            table.visiblePagesArray = [];
            var startIndex = 0;

            if((pageNumber + 4) <= table.pagesArray.length) {
                startIndex = pageNumber > 1 ? pageNumber -1 : 1;
            } else {
                startIndex = table.pagesArray.length - 4;
            }

            for (var i = startIndex; i <= (startIndex + 4); i++) {
                table.visiblePagesArray.push(i);
            }
        }


        function updateTableWithNewDataSet(table, newDataSet, isGrouped, skipSort) {
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

            if(!isGrouped && !skipSort) {
                sortFilesBy(table, "filename");
                table.initialFilesList = table.allFiles;
            }
        }

        function sortFilesBy(table, attribute) {
            if(table.sortedBy !== attribute) {

                table.sortedBy = attribute;
                table.sortOrder = "asc";
                arrayUtil.ascSortList(table.allFiles, attribute);

            } else if(table.sortedBy === attribute) { //If already sorted by this attribute, then revert the list

                if (table.sortOrder === "asc") {
                    table.sortOrder = "desc";
                    arrayUtil.descSortList(table.allFiles, attribute);
                } else {
                    table.sortOrder = "asc";
                    arrayUtil.ascSortList(table.allFiles, attribute);
                }
            }

            chnageTablePage(table, 1);
        }

        function groupByAttribute(table, attribute) {
            var goupedFileList = [];
            var allAttributesList = [];

            angular.forEach(table.allFiles, function(file) {
                this.push(file[attribute]);
            }, allAttributesList);

            var attributeGroupList = arrayUtil.filterUniqueItems(allAttributesList);

            angular.forEach(attributeGroupList, function(attributeGroup) {
                   var filesUnderGroup = table.allFiles.filter(function(file) {
                        return file[attribute] === attributeGroup;
                    });

                var groupObject = {};
                groupObject[attribute] = attributeGroup;
                groupObject['isGroup'] = true;

                goupedFileList.push(groupObject);

                goupedFileList = goupedFileList.concat(filesUnderGroup);
            });

            updateTableWithNewDataSet(table, goupedFileList, true);
        }
    }

})();

!function(){"use strict";angular.module("sbApp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ngRoute","ui.bootstrap","toastr","floatThead"])}(),function(){"use strict";function e(){function e(e,t){e.sort(function(e,a){return isNaN(e[t])&&isNaN(a[t])?e[t].toLowerCase()<a[t].toLowerCase()?-1:e[t].toLowerCase()>a[t].toLowerCase()?1:0:e[t]-a[t]})}function t(e,t){e.sort(function(e,a){return isNaN(e[t])&&isNaN(a[t])?a[t].toLowerCase()<e[t].toLowerCase()?-1:a[t].toLowerCase()>e[t].toLowerCase()?1:0:a[t]-e[t]})}function a(e){var t={"boolean":{},number:{},string:{}},a=[];return e.filter(function(e){var l=typeof e;return l in t?t[l].hasOwnProperty(e)?!1:t[l][e]=!0:a.indexOf(e)>=0?!1:a.push(e)})}this.ascSortList=e,this.descSortList=t,this.filterUniqueItems=a}angular.module("sbApp").service("arrayUtil",e)}(),function(){"use strict";function e(e){function t(e){var t=parseInt(e.length/o);return e.length%o>0&&t++,t}function a(e,t){var a=(e-1)*o,l=e*o;return t.slice(a,l)}function l(e,t){for(var a=0;a<e.length;a++){var l=e[a];if(angular.toJson(l)===angular.toJson(t))return a}return-1}function i(e,t){null!==t&&t>0&&t<=e.pagesArray.length&&(e.currentPage=t,e.filteredFiles=a(t,e.allFiles)),e.visiblePagesArray=[];var l=0;l=t+4<=e.pagesArray.length?t>1?t-1:1:e.pagesArray.length-4;for(var i=l;l+4>=i;i++)e.visiblePagesArray.push(i)}function n(e,a,l,n){e.allFiles=a;var s=t(e.allFiles);if(e.pagesArray=new Array(s),e.allFiles.length>0)if(null===e.currentPage)i(e,1);else{var o=e.currentPage>e.pagesArray.length?e.pagesArray.length:e.currentPage;i(e,o)}else e.currentPage=null,e.filteredFiles=[];l||n||(r(e,"filename"),e.initialFilesList=e.allFiles)}function r(t,a){t.sortedBy!==a?(t.sortedBy=a,t.sortOrder="asc",e.ascSortList(t.allFiles,a)):t.sortedBy===a&&("asc"===t.sortOrder?(t.sortOrder="desc",e.descSortList(t.allFiles,a)):(t.sortOrder="asc",e.ascSortList(t.allFiles,a))),i(t,1)}function s(t,a){var l=[],i=[];angular.forEach(t.allFiles,function(e){this.push(e[a])},i);var r=e.filterUniqueItems(i);angular.forEach(r,function(e){var i=t.allFiles.filter(function(t){return t[a]===e}),n={};n[a]=e,n.isGroup=!0,l.push(n),l=l.concat(i)}),n(t,l,!0)}var o=20;this.getNumberOfPages=t,this.filterDataByPage=a,this.getIndexOfItem=l,this.chnageTablePage=i,this.updateTableWithNewDataSet=n,this.sortFilesBy=r,this.groupByAttribute=s}angular.module("sbApp").service("tableService",e),e.$inject=["arrayUtil"]}(),function(){"use strict";function e(e,t){function a(){var a=t.defer();return e({url:"http://jsonstub.com/sbapp/files",method:"GET",dataType:"json",data:"",headers:{"Content-Type":"application/json","JsonStub-User-Key":"196a9c46-1682-40bd-994b-b9f417caa5fc","JsonStub-Project-Key":"e0cb1a9a-aa98-4d0c-a17d-a38eb0f7509f"}}).then(function(e){a.resolve(e.data)},function(e){a.reject(e)}),a.promise}this.getListOfFiles=a}angular.module("sbApp").service("fileListService",e),e.$inject=["$http","$q"]}(),function(){"use strict";function e(e,t,a,l){function i(){t.getListOfFiles().then(function(t){l(a.updateTableWithNewDataSet(n.table,t,!1),0),e.log(t.length)},function(t){e.error("Failed: "+t)})}var n=this,r=null;n.modalFile={},n.table={initialFilesList:[],allFiles:[],filteredFiles:[],currentPage:null,pagesArray:null,visiblePagesArray:null,sortedBy:null,sortOrder:null,groupedBy:null},n.chnageTablePage=function(e){a.chnageTablePage(n.table,e)},n.getIndexOfItem=function(e,t){return a.getIndexOfItem(e,t)},n.floatTheadOptions={top:0,position:"absolute"},n.sortBy=function(e){a.sortFilesBy(n.table,e)},n.groupByAttribute=function(e){""!==e?(a.updateTableWithNewDataSet(n.table,n.table.initialFilesList,!1),n.table.groupedBy=e,a.groupByAttribute(n.table,e)):(n.table.groupedBy=null,i())},n.getGroupByText=function(){switch(n.table.groupedBy){case"filename":return"File Name";case"type":return"Type";case"date":return"Date";case"size":return"Size";default:return"No Grouping"}},n.toggleFileSelect=function(e){e.selected=e.selected?!1:!0},n.selectFile=function(e){n.selectedFile=angular.fromJson(angular.toJson(e)),r=n.getIndexOfItem(n.table.allFiles,e)},n.saveChanges=function(){n.table.filteredFiles[r]=n.selectedFile,n.table.allFiles[r]=n.selectedFile},n.deleteFile=function(){n.table.filteredFiles.splice(r,1),n.table.allFiles.splice(r,1),a.updateTableWithNewDataSet(n.table,n.table.allFiles,!1,!0)},i()}angular.module("sbApp").controller("MainController",e),e.$inject=["$log","fileListService","tableService","$timeout"]}(),function(){"use strict";function e(e){e.debug("runBlock end")}angular.module("sbApp").run(e),e.$inject=["$log"]}(),function(){"use strict";function e(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"mainCtrl"}).otherwise({redirectTo:"/"})}angular.module("sbApp").config(e),e.$inject=["$routeProvider"]}(),function(){"use strict";angular.module("sbApp")}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}angular.module("sbApp").config(e),e.$inject=["$logProvider","toastrConfig"]}(),angular.module("sbApp").run(["$templateCache",function(e){e.put("app/main/main.html",'<header id="mainHeader"><h1>File List App</h1></header><div class="container"><div class="jumbotron" ng-show="mainCtrl.table.filteredFiles.length === 0"><h1>Loading data...</h1></div><header id="tableHeader" ng-hide="mainCtrl.table.filteredFiles.length === 0"><span class="currentPage">Page {{mainCtrl.table.currentPage}} out of {{mainCtrl.table.pagesArray.length}}</span><div class="dropdown dropdownDiv"><strong>Group by:</strong> <button class="btn btn-default dropdown-toggle" id="groupDropDown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{mainCtrl.getGroupByText()}} <span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="groupDropDown"><li><a class="noGrouping" ng-click="mainCtrl.groupByAttribute(\'\')" href="#/">No Grouping</a></li><li><a href="#/" ng-click="mainCtrl.groupByAttribute(\'filename\')">File Name</a></li><li><a href="#/" ng-click="mainCtrl.groupByAttribute(\'type\')">Type</a></li><li><a href="#/" ng-click="mainCtrl.groupByAttribute(\'date\')">Date</a></li><li><a href="#/" ng-click="mainCtrl.groupByAttribute(\'size\')">Size</a></li></ul></div></header><table id="fileTable" ng-hide="mainCtrl.table.filteredFiles.length === 0" float-thead="mainCtrl.floatTheadOptions" class="table table-striped table-bordered"><thead class="fixedHeader"><tr><th>Select</th><th>File Name <a href="#/" ng-click="mainCtrl.sortBy(\'filename\')" ng-show="mainCtrl.table.groupedBy === null"><span title="Sort" ng-class="{ \'glyphicon glyphicon-sort glyphicon-align-left\': mainCtrl.table.sortedBy !== \'filename\', \'glyphicon glyphicon-sort-by-attributes glyphicon-align-left\': mainCtrl.table.sortedBy === \'filename\' && mainCtrl.table.sortOrder === \'asc\', \'glyphicon glyphicon-sort-by-attributes-alt glyphicon-align-left\': mainCtrl.table.sortedBy === \'filename\' && mainCtrl.table.sortOrder === \'desc\' }" aria-hidden="true"></span></a></th><th>Type <a href="#/" ng-click="mainCtrl.sortBy(\'type\')" ng-show="mainCtrl.table.groupedBy === null"><span title="Sort" ng-class="{ \'glyphicon glyphicon-sort glyphicon-align-left\': mainCtrl.table.sortedBy !== \'type\', \'glyphicon glyphicon-sort-by-attributes glyphicon-align-left\': mainCtrl.table.sortedBy === \'type\' && mainCtrl.table.sortOrder === \'asc\', \'glyphicon glyphicon-sort-by-attributes-alt glyphicon-align-left\': mainCtrl.table.sortedBy === \'type\' && mainCtrl.table.sortOrder === \'desc\' }" aria-hidden="true"></span></a></th><th>Date <a href="#/" ng-click="mainCtrl.sortBy(\'date\')" ng-show="mainCtrl.table.groupedBy === null"><span title="Sort" ng-class="{ \'glyphicon glyphicon-sort glyphicon-align-left\': mainCtrl.table.sortedBy !== \'date\', \'glyphicon glyphicon-sort-by-attributes glyphicon-align-left\': mainCtrl.table.sortedBy === \'date\' && mainCtrl.table.sortOrder === \'asc\', \'glyphicon glyphicon-sort-by-attributes-alt glyphicon-align-left\': mainCtrl.table.sortedBy === \'date\' && mainCtrl.table.sortOrder === \'desc\' }" aria-hidden="true"></span></a></th><th>Size <a href="#/" ng-click="mainCtrl.sortBy(\'size\')" ng-show="mainCtrl.table.groupedBy === null"><span title="Sort" ng-class="{ \'glyphicon glyphicon-sort glyphicon-align-left\': mainCtrl.table.sortedBy !== \'size\', \'glyphicon glyphicon-sort-by-attributes glyphicon-align-left\': mainCtrl.table.sortedBy === \'size\' && mainCtrl.table.sortOrder === \'asc\', \'glyphicon glyphicon-sort-by-attributes-alt glyphicon-align-left\': mainCtrl.table.sortedBy === \'size\' && mainCtrl.table.sortOrder === \'desc\' }" aria-hidden="true"></span></a></th><th>Actions</th></tr></thead><tbody><tr ng-repeat="file in mainCtrl.table.filteredFiles track by $index" ng-class="{\'selectedRow\' : file.selected}"><td ng-show="file.isGroup" class="groupTd" colspan="6"><strong>{{file[mainCtrl.table.groupedBy]}}</strong></td><td ng-show="!file.isGroup"><input type="checkbox" ng-checked="file.selected" ng-click="mainCtrl.toggleFileSelect(file)"></td><td ng-show="!file.isGroup">{{file.filename}}</td><td ng-show="!file.isGroup">{{file.type}}</td><td ng-show="!file.isGroup">{{file.date}}</td><td ng-show="!file.isGroup">{{file.size}}</td><td ng-show="!file.isGroup"><a href="#/" title="Edit" class="actionButton glyphicon glyphicon-edit" data-toggle="modal" data-target="#editModal" ng-click="mainCtrl.selectFile(file)" aria-hidden="true"></a> <a href="#/" title="Delete" class="actionButton glyphicon glyphicon-remove" data-toggle="modal" data-target="#deleteModal" ng-click="mainCtrl.selectFile(file)" aria-hidden="true"></a> <a href="#/" title="Display MetaData" class="actionButton glyphicon glyphicon-info-sign" ng-show="file.metadata" data-toggle="modal" data-target="#metaModal" ng-click="mainCtrl.selectFile(file)" aria-hidden="true"></a></td></tr></tbody></table><nav id="tableNav" ng-hide="mainCtrl.table.filteredFiles.length === 0"><p class="currentPage">Page {{mainCtrl.table.currentPage}} out of {{mainCtrl.table.pagesArray.length}}</p><ul class="pagination"><li><a href="#/" aria-label="Previous" ng-class="{\'disabledLink\' : mainCtrl.table.currentPage === 1}" ng-click="mainCtrl.chnageTablePage(mainCtrl.table.currentPage - 1)"><span aria-hidden="true">&laquo;</span></a></li><li ng-show="mainCtrl.table.currentPage > 2"><a href="#/" ng-click="mainCtrl.chnageTablePage(1)">1</a></li><li ng-show="mainCtrl.table.currentPage > 2"><a class="disabledItem">...</a></li><li ng-repeat="page in mainCtrl.table.visiblePagesArray track by $index"><a href="#/" ng-class="{\'selectedLink\' : mainCtrl.table.currentPage === page}" ng-click="mainCtrl.chnageTablePage(page)">{{page}}</a></li><li ng-show="mainCtrl.table.currentPage < mainCtrl.table.pagesArray.length - 4"><a class="disabledItem">...</a></li><li ng-show="mainCtrl.table.currentPage < mainCtrl.table.pagesArray.length - 4"><a href="#/" ng-click="mainCtrl.chnageTablePage(mainCtrl.table.pagesArray.length)">{{mainCtrl.table.pagesArray.length}}</a></li><li><a href="#/" aria-label="Next" ng-class="{\'disabledLink\' : mainCtrl.table.currentPage === mainCtrl.table.pagesArray.length}" ng-click="mainCtrl.chnageTablePage(mainCtrl.table.currentPage + 1)"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></div><div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Edit File</h4></div><div class="modal-body"><form><div class="form-group"><label for="fileNameInput">File Name</label> <input type="text" class="form-control" id="fileNameInput" placeholder="File Name" ng-model="mainCtrl.selectedFile.filename"></div><div class="form-group"><label for="typeInput">Type</label> <input type="text" class="form-control" id="typeInput" placeholder="Type" ng-model="mainCtrl.selectedFile.type"></div><div class="form-group"><label for="dateInput">Date</label> <input type="text" class="form-control" id="dateInput" placeholder="Date" ng-model="mainCtrl.selectedFile.date"></div><div class="form-group"><label for="sizeInput">Size</label> <input type="number" class="form-control" id="sizeInput" placeholder="Size" ng-model="mainCtrl.selectedFile.size"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> <button type="button" data-dismiss="modal" class="btn btn-primary" ng-click="mainCtrl.saveChanges()">Save changes</button></div></div></div></div><div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="deleteModalHead">Delete File</h4></div><div class="modal-body">Are you sure you want to delete this file?</div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">No</button> <button type="button" data-dismiss="modal" class="btn btn-success" ng-click="mainCtrl.deleteFile()">Yes</button></div></div></div></div><div class="modal fade" id="metaModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="metaModalHead">Meta-data</h4></div><div class="modal-body"><p><label>Title:</label> {{mainCtrl.selectedFile.metadata.title}}</p><p><label>Artist:</label> {{mainCtrl.selectedFile.metadata.artist}}</p><p><label>Album:</label> {{mainCtrl.selectedFile.metadata.album}}</p><p><label>Year:</label> {{mainCtrl.selectedFile.metadata.year}}</p><p><label>Genre:</label> {{mainCtrl.selectedFile.metadata.genre}}</p></div><div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-primary">Ok</button></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-4bc6fb208c.js.map

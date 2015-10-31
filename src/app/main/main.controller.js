(function() {
  'use strict';

  angular
    .module('sbApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, $scope, webDevTec, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;

   /* vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1445898612341;
    vm.showToastr = showToastr;*/

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
              "date": "2012-12-16",
              "size": 87726956,
              "type": "ppt",
              "filename": "esse cupidatat.xls"
          }];


      var tableApi = null;

      vm.dtOptions = DTOptionsBuilder
          //.fromSource(          )
          .fromFnPromise(getTableData())
          .withFixedHeader({
              bottom: true
          })
          .withOption('bFilter', false)
          .withOption('order', [[ 0, 'asc' ]])
          .withOption('bLengthChange', false)
          .withOption("fnDrawCallback",
                function ( settings ) {
                    tableApi = this.api();
                    var rows = tableApi.rows( {page:'current'} ).nodes();
                    var last = null;

                    tableApi.column(2, {page:'current'} ).data().each( function ( group, i ) {
                      if ( last !== group ) {
                          $(rows).eq( i ).before(
                              '<tr class="group trGroup"><td id="tdGroup" colspan="4">'+group+'</td></tr>'
                          );
                          last = group;
                      }
                    });
                })
          .withDisplayLength(20)
          .withBootstrap();

      var table = $('#fileListTable');
      console.log(table);

    /*  vm.dtOptions = {
          data: data,
          bFilter: false,
          bLengthChange: false,
          iDisplayLength: 20,
          fixedHeader: true
      };*/

     /* vm.dtOptions = DTOptionsBuilder
          .withBootstrap();*/

      vm.dtColumns = [
          DTColumnBuilder.newColumn('date').withTitle('date'),
          DTColumnBuilder.newColumn('size').withTitle('size'),
          DTColumnBuilder.newColumn('type').withTitle('type'),
          DTColumnBuilder.newColumn('filename').withTitle('filename')
      ];

     vm.groupByFirstColumn = function() {
         $('.trGroup').remove();
         vm.dtOptions.fnDrawCallback = function ( settings ) {
                 var rows = tableApi.rows( {page:'current'} ).nodes();
                 var last = null;

                 tableApi.column(0, {page:'current'} ).data().each( function ( group, i ) {
                     if ( last !== group ) {
                         $(rows).eq( i ).before(
                             '<tr class="group trGroup"><td id="tdGroup" colspan="4">'+group+'</td></tr>'
                         );
                         last = group;
                     }
                 });
             };

         vm.dtOptions.fnDrawCallback();
      };

    }
})();

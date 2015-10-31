(function() {
    'use strict';

    angular
        .module('sbApp')
        .service('arrayUtil', arrayUtil);

    /** @ngInject */
    function arrayUtil() {

        this.ascSortList = ascSortList;
        this.descSortList = descSortList;

        function ascSortList(list, attribute) {
            list.sort(function(a, b) {
                if(isNaN(a[attribute]) && isNaN(b[attribute])) {
                    if (a[attribute].toLowerCase() < b[attribute].toLowerCase()) {
                        return -1;
                    }
                    if (a[attribute].toLowerCase() > b[attribute].toLowerCase()) {
                        return 1;
                    }
                    return 0;
                } else {
                    return a[attribute] - b[attribute];
                }
            });
        }

        function descSortList(list, attribute) {
            list.sort(function(a, b) {
                if(isNaN(a[attribute]) && isNaN(b[attribute])) {
                    if (b[attribute].toLowerCase() < a[attribute].toLowerCase()) {
                        return -1;
                    }
                    if (b[attribute].toLowerCase() > a[attribute].toLowerCase()) {
                        return 1;
                    }
                    return 0;
                } else {
                    return b[attribute] - a[attribute];
                }
            });
        }
    }

})();

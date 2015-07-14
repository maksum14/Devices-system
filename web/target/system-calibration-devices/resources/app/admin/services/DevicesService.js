 angular
    .module('adminModule')
    .factory('DevicesService', function ($http) {
        return {
        		getPage: function (pageNumber, itemsPerPage, search) {
                var url = '/admin/devices/' + pageNumber + '/' + itemsPerPage;
                if (search != null && search != undefined && search != "")
                    url += '/' + search;

                return $http.get(url)
                    .then(function (result) {
                        return result.data;
                    });
            }
        }
    });
angular
    .module('adminModule')
    .factory('DeviceService', function ($http) {
        return {
            isDeviceidAvailable: function (id) {
                var url = '/admin/devices/available/' + id;
                return $http.get(url)
                    .then(function(result) {
                        return result.data;
                    });
            }
            /*getPage: function (pageNumber, itemsPerPage, search) {
                var url = '/admin/device/' + pageNumber + '/' + itemsPerPage;
                if (search != null && search != undefined && search != "")
                    url += '/' + search;

                return $http.get(url)
                    .then(function (result) {
                        return result.data;
                    });
            }*/
        }
    });
angular
    .module('verificatorModule')
    .factory('UserService', function ($http) {
        return {
            isUsernameAvailable: function (username) {
                return getData('verificator/admin/users/available/' + username);
            },
            saveUser: function (userData) {
                return saveData('verificator/admin/users/add', userData);
            },
            isAdmin: function (){
            	return getData('verificator/admin/users/verificator');
            } 
        };

        function getData(url) {
            return $http.get(url)
                .success(function (result) {
                    return result;
                });
        }

        function saveData(url, data) {
            return $http.post(url, data)
                .success(function (response) {
                    return response;
                });
        }
    });

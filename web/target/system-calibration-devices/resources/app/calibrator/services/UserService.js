angular
    .module('calibratorModule')
    .factory('UserService', function ($http) {
        return {
            isUsernameAvailable: function (username) {
                return getData('calibrator/admin/users/available/' + username);
            },
            saveUser: function (userData) {
                return saveData('calibrator/admin/users/add', userData);

            },
            isAdmin: function (){
            	return getData('calibrator/admin/users/verificator');
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

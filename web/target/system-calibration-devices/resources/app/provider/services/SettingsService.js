angular
    .module('providerModule')
    .factory('SettingsService', function ($http) {
        return {
            changePassword: function (oldPass, newPass) {
                var url = '/provider/settings/password';
                var passwords = {
                    oldPassword: oldPass,
                    newPassword: newPass
                };
                return $http.put(url, passwords)
                    .then(function (result) {
                        return result.status;
                    });
            },
            changeField: function (newField, fieldType) {
                var url = '/provider/settings/fields';
                var dto = {
                    field: newField,
                    type: fieldType
                };
                return $http.put(url, dto)
                    .then(function (result) {
                        return result.status;
                    });
            },
            getFields: function () {
                var url = '/provider/settings/fields';
                return $http.get(url)
                    .then(function (result) {
                        return result.status == 200 ? result.data : null;
                    });
            }
        }
    });
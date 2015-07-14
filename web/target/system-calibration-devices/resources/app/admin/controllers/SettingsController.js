angular
    .module('adminModule')
    .controller('SettingsController', ['$scope', 'SettingsService', function ($scope, settingsService) {

        $scope.onChangePassSubmit = function () {
            settingsService
                .changePassword($scope.oldPassword, $scope.newPassword)
                .then(function (status) {
                    onPasswordChanged(status);
                });
        };

        $scope.onNewPasswordChanged = function () {
            if ($scope.password.message) {
                validatePasswords();
            }
        };

        $scope.onNewPasswordReChanged = function () {
            validatePasswords();
        };

        function validatePasswords() {
            $scope.password = {
                isChanged: false,
                message: null
            };
            if ($scope.oldPassword == $scope.newPassword) {
                $scope.password.message = 'Новий пароль має відрізнятись від старого';
            } else if ($scope.newPassword.length <= 4) {
                $scope.password.message = 'Пароль повинен містити більше 4 символів';
            } else if ($scope.newPassword != $scope.newPasswordRe) {
                $scope.password.message = 'Новий пароль повинен співпадати';
            }
        }

        function onPasswordChanged(status) {
            if (status == 200) {
                $scope.password = {
                    isChanged: true,
                    message: 'Пароль успішно змінено!'
                };
            } else if (status == 409) {
                $scope.password = {
                    isChanged: false,
                    message: 'Старий пароль неправильний!'
                };
            }
        }
    }]);
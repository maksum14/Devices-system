angular
    .module('verificatorModule')
    .controller('SendingModalController', ['$scope', '$log', '$modalInstance', 'response',
        function ($scope, $log, $modalInstance, response) {

            $scope.providers = response.data;

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };
            $scope.submit = function (provider) {
                $scope.$broadcast('show-errors-check-validity');

                if ($scope.providerSelectionForm.$valid) {
                    $modalInstance.close(provider);
                }
            }
        }]);
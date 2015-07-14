angular
    .module('calibratorModule')
    .controller('SendingModalController', ['$scope', '$log', '$modalInstance', 'response', '$rootScope',
        function ($scope, $log, $modalInstance, response, $rootScope) {

            $scope.verificators = response.data;

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };
            $scope.submit = function (verificator) {
                $scope.$broadcast('show-errors-check-validity');
               
                if ($scope.verificatorSelectionForm.$valid) {
                    $modalInstance.close(verificator);
                }
            }
        }]);
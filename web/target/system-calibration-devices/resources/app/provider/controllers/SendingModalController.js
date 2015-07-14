angular
    .module('providerModule')

    .controller('SendingModalController', ['$scope', '$log', '$modalInstance', 'response', '$rootScope',
        function ($scope, $log, $modalInstance, response, $rootScope) {

            $scope.calibrators = response.data;
            $scope.formData={};

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };
            $scope.submit = function () {
                $scope.$broadcast('show-errors-check-validity');


                if ($scope.calibratorSelectionForm.$valid){
                    $modalInstance.close($scope.formData);

                }
            }
        }]);



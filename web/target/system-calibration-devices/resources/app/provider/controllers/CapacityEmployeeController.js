/**
 * Created by MAX on 12.07.2015.
 */
angular
    .module('providerModule')

    .controller('CapacityEmployeeController', ['$scope', '$log', '$modalInstance', 'capacity',
        function ($scope, $log, $modalInstance, capacity) {

            $scope.verifications = capacity.data.content;

                $scope.employee = $scope.verifications[0].providerEmployee;

            $log.info($scope.verifications);

            $scope.close = function () {
                $modalInstance.close();
            };


        }]);




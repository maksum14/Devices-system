angular
    .module('welcomeModule')
    .controller('DetailsController', ['$scope', '$modalInstance', '$log', 'response',
        function ($scope, $modalInstance, $log, response) {

            $scope.verificationData = response.data;

            $log.info($scope.verificationData);

            $scope.close = function () {
                $modalInstance.close();
            };
        }]);

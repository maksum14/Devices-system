angular
    .module('providerModule')
    .controller('ArchivalVerificationsController', ['$scope', '$modal', '$log', 'VerificationService',

        function ($scope, $modal, $log, verificationService) {

            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.pageData = [];

            $scope.onTableHandling = function () {
                updatePage();
            };


            updatePage();

            function updatePage() {
                verificationService
                    .getArchivalVerifications($scope.currentPage, $scope.itemsPerPage)
                    .success(function (verifications) {
                        $scope.pageData = verifications.content;
                        $scope.totalItems = verifications.totalItems;
                    });
            }

            $scope.openDetails = function ($index) {
                $modal.open({
                    animation: true,
                    templateUrl: 'resources/app/provider/views/modals/archival-verification-details.html',
                    controller: 'DetailsModalController',
                    size: 'lg',
                    resolve: {
                        response: function () {
                            return verificationService.getArchivalVerificationDetails(
                                $scope.pageData[$index].id)
                                .success(function (verification) {
                                    return verification;
                                });
                        }
                    }
                });
            };
        }]);

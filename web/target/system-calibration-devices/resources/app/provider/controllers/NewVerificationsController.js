angular
    .module('providerModule')
    .controller('NewVerificationsController', ['$scope', '$log',
        '$modal', 'VerificationService', '$rootScope', 'ngTableParams', '$filter', '$timeout',
        function ($scope, $log, $modal, verificationService,
                  $rootScope, ngTableParams, $filter, $timeout) {

            $scope.search = {
                idText: null,
                formattedDate: null,
                lastNameText: null,
                streetText: null
            }

            $scope.clearAll = function () {
                $scope.search.idText = null;
                $scope.search.formattedDate = null;
                $scope.dt = null;
                $scope.search.lastNameText = null;
                $scope.search.streetText = null;
                $scope.tableParams.reload();
            }

            $scope.clearId = function () {
                $scope.search.idText = null;
                $scope.tableParams.reload();
            }
            $scope.clearLastName = function () {
                $scope.search.lastNameText = null;
                $scope.tableParams.reload();
            }
            $scope.clearStreet = function () {
                $scope.search.streetText = null;
                $scope.tableParams.reload();
            }

            $scope.checkForEmpty = function () {
                if ($scope.search.idText != null && $scope.search.idText == "") {
                    $scope.search.idText = null;
                }
                if(  $scope.search.streetText!=null &&   $scope.search.streetText==""){
                    $scope.search.streetText=null;
                }
                if ( $scope.search.lastNameText!=null &&  $scope.search.lastNameText ==""){
                    $scope.search.lastNameText=null;
                }
            }

            var promiseSearchTimeOut;
            $scope.doSearch = function () {
                promiseTimeOut = $timeout(function () {
                    $scope.checkForEmpty();
                    $scope.tableParams.reload();
                }, 1200);
            }

            $scope.$on('refresh-table', function () {
                $scope.clearAll();
            });


            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                getData: function ($defer, params) {

                    verificationService.getNewVerifications(params.page(), params.count(), $scope.search.formattedDate, $scope.search.idText,
                        $scope.search.lastNameText, $scope.search.streetText)
                        .success(function (result) {
                            $defer.resolve(result.content);
                            params.total(result.totalItems);
                        }, function (result) {
                            $log.debug('error fetching data:', result);
                        });
                }
            });


            $scope.markAsRead = function (id) {
                var dataToSend = {
                    verificationId: id,
                    readStatus: 'READ'
                };

                verificationService.markVerificationAsRead(dataToSend).success(function () {
                    $rootScope.$broadcast('verification-was-read');
                    $scope.tableParams.reload();
                });
            };


            /**
             * open modal
             */
            $scope.openDetails = function (verifId, verifDate, verifReadStatus) {

                $modal.open({
                    animation: true,
                    templateUrl: '/resources/app/provider/views/modals/new-verification-details.html',
                    controller: 'DetailsModalController',
                    size: 'lg',
                    resolve: {
                        response: function () {
                            return verificationService.getNewVerificationDetails(verifId)
                                .success(function (verification) {
                                    verification.id = verifId;
                                    verification.initialDate = verifDate;
                                    if (verifReadStatus == 'UNREAD') {
                                        $scope.markAsRead(verifId);
                                    }
                                    return verification;
                                });
                        }
                    }
                });
            };

            $scope.removeProviderEmployee = function (verifId) {
                var dataToSend = {
                    idVerification: verifId
                };
                $log.info(dataToSend);
                verificationService.cleanProviderEmployeeField(dataToSend)
                    .success(function () {
                        $scope.tableParams.reload();
                    });
            };


            $scope.addProviderEmployee = function (verifId, providerEmployee) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/resources/app/provider/views/modals/adding-providerEmployee.html',
                    controller: 'ProviderEmployeeController',
                    size: 'md',
                    windowClass: "providerEmployee",
                    resolve: {
                        providerEmploy: function () {
                            return verificationService.getProviders()
                                .success(function (providers) {
                                    return providers;
                                }
                            );
                        }
                    }
                })
                /**
                 * executes when modal closing
                 */
                modalInstance.result.then(function (formData) {
                    idVerification = 0;
                    var dataToSend = {
                        idVerification: verifId,
                        employeeProvider: formData.provider
                    };

                    $log.info(dataToSend);
                    verificationService
                        .sendEmployeeProvider(dataToSend)
                        .success(function () {
                            $scope.tableParams.reload();
                        });
                });
            };

            $scope.idsOfVerifications = [];
            $scope.checkedItems = [];
            $scope.allIsEmpty = true;


            /**
             * push verification id to array
             */
            $scope.resolveVerificationId = function (id) {
                var index = $scope.idsOfVerifications.indexOf(id);
                if (index === -1) {
                    $scope.idsOfVerifications.push(id);
                    index = $scope.idsOfVerifications.indexOf(id);
                }

                if (!$scope.checkedItems[index]) {
                    $scope.idsOfVerifications.splice(index, 1, id);
                    $scope.checkedItems.splice(index, 1, true);
                } else {
                    $scope.idsOfVerifications.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                }
                checkForEmpty();
            };

            /**
             * open modal
             */
            $scope.openSendingModal = function () {
                if (!$scope.allIsEmpty) {
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: '/resources/app/provider/views/modals/verification-sending.html',
                        controller: 'SendingModalController',
                        size: 'md',
                        resolve: {
                            response: function () {
                                return verificationService.getCalibrators()
                                    .success(function (calibrators) {
                                        return calibrators;
                                    }
                                );
                            }
                        }
                    });

                    /**
                     * executes when modal closing
                     */
                    modalInstance.result.then(function (formData) {

                        var dataToSend = {
                            idsOfVerifications: $scope.idsOfVerifications,
                            calibrator: formData.calibrator
                        };

                        $log.info(dataToSend);

                        verificationService
                            .sendVerificationsToCalibrator(dataToSend)
                            .success(function () {
                                $scope.tableParams.reload();
                                $rootScope.$broadcast('verification-sent-to-calibrator');
                            });
                        $scope.idsOfVerifications = [];
                        $scope.checkedItems = [];

                    });
                } else {
                    $scope.isClicked = true;
                }
            };

            /**
             * check if idsOfVerifications array is empty
             */
            var checkForEmpty = function () {
                $scope.allIsEmpty = $scope.idsOfVerifications.length === 0;
            };


            /**
             *  Date picker and formatter setup
             *
             */
            $scope.openState = {};
            $scope.openState.isOpen = false;

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openState.isOpen = true;
            };


            $scope.dateOptions = {
                formatYear: 'yyyy',
                startingDay: 1,
                showWeeks: 'false'
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];

            $scope.changeDateToSend = function (val) {

                if (angular.isUndefined(val)) {
                    $scope.search.formattedDate = null;
                    $scope.tableParams.reload();
                } else {
                    var datefilter = $filter('date');
                    $scope.search.formattedDate = datefilter(val, 'dd-MM-yyyy');
                    $scope.tableParams.reload();
                }
            }

        }]);


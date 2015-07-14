/**
 * Created by MAX on 25.06.2015.
 */
angular
    .module('providerModule')
    .controller('UsersController', ['$scope', 'UserService', '$modal','$log', 'ngTableParams', '$timeout', '$filter',
        function ($scope, userService,$modal,$log, ngTableParams, $timeout, $filter) {

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 5
            }, {
                total: 0,
                getData: function ($defer, params) {
                    userService.getPage(params.page(), params.count(), params.filter())
                        .success(function (result) {
                            $defer.resolve(result.content);
                            params.total(result.totalItems);
                        }, function (result) {
                            $log.debug('error fetching data:', result);
                        });
                }
            });

            $scope.isFilter = function () {
                var obj = $scope.tableParams.filter();
                for (var i in obj) {
                    if (obj.hasOwnProperty(i) && obj[i]) {
                        return true;
                    }
                }
                return false;
            };

            $scope.showCapacity = function (username,countOfWork) {

                $modal.open({
                    animation: true,
                    templateUrl: '/resources/app/provider/views/employee/capacity-providerEmployee.html',
                    controller: 'CapacityEmployeeController',
                    size: 'lg',
                    resolve: {

                        capacity: function () {
                            return userService.getCapacityOfWork(username)
                                .success(function (verifications) {
                                    return verifications;
                                });
                        }
                    }
                });
            }

                $scope.onTableHandling = function () {

                    userService.isAdmin()
                        .success(function (response) {
                            if (response === 'PROVIDER_ADMIN') {
                                $scope.verificator = true;
                            } else {
                                $scope.accessLable = true;
                            }
                        });
                };
                $scope.onTableHandling();


        }]);


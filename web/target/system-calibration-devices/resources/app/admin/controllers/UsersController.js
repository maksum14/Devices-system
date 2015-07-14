angular
    .module('adminModule')
    .controller('UsersController', ['$scope', 'UsersService',
        function ($scope, usersService) {
            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.pageContent = [];

            $scope.onTableHandling = function () {
                usersService
                    .getPage($scope.currentPage, $scope.itemsPerPage, $scope.searchData)
                    .then(function (data) {
                        $scope.pageContent = data.content;
                        $scope.totalItems = data.totalItems;
                    });
            };
            $scope.onTableHandling();
        }
    ]);
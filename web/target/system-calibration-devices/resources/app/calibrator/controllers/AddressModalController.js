angular
    .module('calibratorModule')
    .controller('AddressModalController', ['$scope', '$log', '$modalInstance', 'address', 'AddressService',
        function ($scope, $log, $modalInstance, address, addressService) {
            $log.info(address);

            $scope.addressData = {};

            $scope.regions = [];
            addressService.findAllRegions()
                .success(function (regions) {
                    $scope.regions = regions;
                });
            /**
             * Receives all possible districts.
             * On-select handler in region input form element.
             */
            $scope.receiveDistricts = function (selectedRegion) {
                $scope.districts = [];
                addressService.findDistrictsByRegionId(selectedRegion.id)
                    .success(function (districts) {
                        $scope.districts = districts;
                    });
                if (!address) {
                    $scope.addressData.selectedDistrict = "";
                    $scope.addressData.selectedLocality = "";
                    $scope.addressData.selectedStreet = "";
                }
            };
            /**
             * Receives all possible localities.
             * On-select handler in district input form element.
             */
            $scope.receiveLocalitiesAndCalibrators = function (selectedDistrict) {
                $scope.localities = [];
                addressService.findLocalitiesByDistrictId(selectedDistrict.id)
                    .success(function (localities) {
                        $scope.localities = localities;
                    });
                if (!address) {
                    $scope.addressData.selectedLocality = "";
                    $scope.addressData.selectedStreet = "";
                }
            };
            /**
             * Receives all possible streets.
             * On-select handler in locality input form element
             */
            $scope.receiveStreets = function (selectedLocality) {
                $scope.streets = [];
                addressService.findStreetsByLocalityId(selectedLocality.id)
                    .success(function (streets) {
                        $scope.streets = streets;
                    });
                if (!address) {
                    $scope.addressData.selectedStreet = "";
                }
            };
            /**
             * Receives all possible buildings.
             * On-select handler in street input form element.
             */
            $scope.receiveBuildings = function (selectedStreet) {
                $scope.buildings = [];
                addressService.findBuildingsByStreetId(selectedStreet.id)
                    .success(function (buildings) {
                        $scope.buildings = buildings;
                    });
            };

            //for cases when user reopen modal
            if (address) {
                $scope.addressData = address;
                $scope.receiveDistricts(address.selectedRegion);
                $scope.receiveLocalitiesAndCalibrators(address.selectedDistrict);
                $scope.receiveStreets(address.selectedLocality);
                $scope.receiveBuildings(address.selectedStreet);
                address = null;
            }

            $scope.cancel = function () {
                $modalInstance.close();
            };
            $scope.submitAddress = function () {
                $scope.$broadcast('show-errors-check-validity');

                if ($scope.addressForm.$valid) {
                    $modalInstance.close($scope.addressData);
                }
            }
        }]);

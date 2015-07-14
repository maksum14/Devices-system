angular
		.module('adminModule')
		.controller(
				'OrganizationAddModalController',
				[
						'$rootScope',
						'$scope',
						'$modalInstance',
						'AddressService',
						'OrganizationService',
						'UserService',
						function($rootScope, $scope, $modalInstance,
								addressService, organizationService,
								userService) {

							$scope.typeData = [ {
								type : 'PROVIDER',
								name : 'Постачальник послуг'
							}, {
								type : 'CALIBRATOR',
								name : 'Повірочна організація'
							}, {
								type : 'STATE_VERIFICATION',
								name : 'Державний повірник'
							} ];
							$scope.regions = null;
							$scope.districts = [];
							$scope.localities = [];
							$scope.streets = [];
							$scope.buildings = [];

							/**
							 * Resets organization form
							 */
							$scope.resetOrganizationForm = function() {
								$scope.$broadcast('show-errors-reset');
								$scope.usernameValidation = null;
								$scope.organizationFormData = null;
							};

							/**
							 * Calls resetOrganizationForm after the view loaded
							 */
							$scope.resetOrganizationForm();
							

							/**
							 * Validates username
							 */
							$scope.checkUsername = function() {
								var username = $scope.organizationFormData.username;
								if (username == null) {
								} else if (/^[a-z0-9_-]{3,16}$/.test(username)) {
									isUsernameAvailable(username)
								} else {
									validateUsername(false,
											'К-сть символів не повинна бути меншою за 3\n і більшою за 16 ');
								}
							};

							/**
							 * Custom username field validation. Shows error
							 * message in view if username isn't validated.
							 * 
							 * @param isValid
							 * @param message
							 */
							function validateUsername(isValid, message) {
								$scope.usernameValidation = {
									isValid : isValid,
									css : isValid ? 'has-success' : 'has-error',
									message : isValid ? undefined : message
								}
							}

							/**
							 * Checks whereas given username is available to use
							 * for new user
							 * 
							 * @param username
							 */
							function isUsernameAvailable(username) {
								userService.isUsernameAvailable(username).then(
										function(data) {
											validateUsername(data,
													'Такий логін вже існує');
										})
							}

							/**
							 * Finds all regions
							 */
							function initFormData() {
								if (!$scope.regions) {
									addressService.findAllRegions().then(
											function(data) {
												$scope.regions = data;
											});
								}
							}

							initFormData();

							/**
							 * Finds districts in a given region.
							 * 
							 * @param regionId
							 *            to identify region
							 */
							$scope.onRegionSelected = function(regionId) {
								addressService
										.findDistrictsByRegionId(regionId)
										.then(function(data) {
											$scope.districts = data;
										});
							};

							/**
							 * Finds localities in a given district.
							 * 
							 * @param districtId
							 *            to identify district
							 */
							$scope.onDistrictSelected = function(districtId) {
								addressService.findLocalitiesByDistrictId(
										districtId).then(function(data) {
									$scope.localities = data;
								});
							};

							/**
							 * Finds streets in a given locality.
							 * 
							 * @param localityId
							 *            to identify locality
							 */
							$scope.onLocalitySelected = function(localityId) {
								addressService.findStreetsByLocalityId(
										localityId).then(function(data) {
									$scope.streets = data;
								});
							};

							/**
							 * Finds buildings in a given street.
							 * 
							 * @param streetId
							 *            to identify street
							 */
							$scope.onStreetSelected = function(streetId) {
								addressService
										.findBuildingsByStreetId(streetId)
										.then(function(data) {
											$scope.buildings = data;
										});
							};

							/**
							 * Convert address data to string
							 */
							function addressFormToOrganizationForm() {
								$scope.organizationFormData.region = $scope.organizationFormData.region.designation;
								$scope.organizationFormData.district = $scope.organizationFormData.district.designation;
								$scope.organizationFormData.locality = $scope.organizationFormData.locality.designation;
								$scope.organizationFormData.street = $scope.organizationFormData.street.designation;
								$scope.organizationFormData.building = $scope.organizationFormData.building.designation;
								$scope.organizationFormData.flat = $scope.organizationFormData.flat;
							}

							/**
							 * Validates organization form before saving
							 */
							$scope.onOrganizationFormSubmit = function() {
								$scope.$broadcast('show-errors-check-validity');
								// TODO: add password match checking
								if ($scope.organizationForm.$valid
										&& $scope.usernameValidation.isValid) {
									addressFormToOrganizationForm();
									saveOrganization();
								}
							};

							/**
							 * Saves new organization from the form in database.
							 * If everything is ok then resets the organization
							 * form and updates table with organizations.
							 */
							function saveOrganization() {
								organizationService.saveOrganization(
										$scope.organizationFormData).then(
										function(data) {
											if (data == 201) {
												$scope.closeModal();
												$scope.resetOrganizationForm();
												$rootScope.onTableHandling();
											}
										});
							}

							/**
							 * Closes the modal window for adding new
							 * organization.
							 */
							$rootScope.closeModal = function() {
								$modalInstance.close();
							};

						} ]);
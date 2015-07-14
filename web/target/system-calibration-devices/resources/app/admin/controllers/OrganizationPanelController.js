angular
		.module('adminModule')
		.controller(
				'OrganizationPanelController',
				[
						'$rootScope',
						'$scope',
						'$modal',
						'OrganizationService',
						function($rootScope, $scope, $modal,
								organizationService) {

							$scope.totalItems = 0;
							$scope.currentPage = 1;
							$scope.itemsPerPage = 5;
							$scope.pageContent = [];

							/**
							 * Updates the table with organization.
							 */
							$rootScope.onTableHandling = function() {
								organizationService
										.getPage($scope.currentPage,
												$scope.itemsPerPage,
												$scope.searchData)
										.then(
												function(data) {
													$scope.pageContent = data.content;
													$scope.totalItems = data.totalItems;
												});
							};
							$rootScope.onTableHandling();

							/**
							 * Opens modal window for adding new organization.
							 */
							$scope.openAddOrganizationModal = function() {
								var addOrganizationModal = $modal
										.open({
											animation : true,
											controller : 'OrganizationAddModalController',
											templateUrl : '/resources/app/admin/views/organization-add-modal.html',
										});
							};

							/**
							 * Opens modal window for editing organization.
							 */
							$scope.openEditOrganizationModal = function(
									organizationId) {
								$rootScope.organizationId = organizationId;
								organizationService.getOrganizationWithId(
										$rootScope.organizationId).then(
										function(data) {
											$rootScope.organization = data;
										});
								var organizationDTOModal = $modal
										.open({
											animation : true,
											controller : 'OrganizationEditModalController',
											templateUrl : '/resources/app/admin/views/organization-edit-modal.html',
										});
							};

						} ]);
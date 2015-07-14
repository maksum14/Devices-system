angular
		.module('welcomeModule')
		.controller(
				'ApplicationStatusController',
				[
						'$scope',
						'$http',
						'$translate',
						'$state',
						'$log',
						'$modal',
						'$stateParams',
						'DataReceivingService',

						function($scope, $http, $translate, $state, $log,$modal,
								$stateParams, dataReceivingService) {

							$scope.isShownForm = true;

							$log.info($stateParams);

							$scope.code = $stateParams.clientCode;

							 $scope.findCode = function() {
								dataReceivingService.getVerificationStatusById(
										$scope.code).success(
										function(status) {
											$log.debug(status);
											$scope.status = resolveStatus(
													status, $translate.use());
											
										});

								$scope.isShownForm = false;
							};
							$scope.findVerification = function() {
								dataReceivingService.getVerificationById(
										$scope.code).success(
										function(verification) {
											$log.debug('verif from func :' + verification);
											$scope.verification = verification;
											
											 if (verification.status == undefined){
								              
								            
								                	$scope.checkStyle = 'row col-md-10 alert alert-danger alert-dismissible centered';
								           
								                }else $scope.checkStyle='row col-md-10 alert alert-success alert-dismissible centered';
										});

								$scope.isShownForm = false;
							};
							$scope.getClientForm=function(){
								$scope.findCode();
								$scope.findVerification();
							}

							$scope.closeAlert = function() {
								$state.go($state.current, {}, {
									reload : true
								});
							}

							$scope.openDetails = function() {
								$modal
										.open({
											animation : true,
											templateUrl : '/resources/app/welcome/views/modals/archival-verification-details.html',
											controller : 'DetailsController',
											size : 'lg',
											resolve : {
												response : function() {
													return dataReceivingService
															.getArchivalVerificationDetails(
																	$scope.code)
															.success(
																	function(
																			verification) {
																		return verification;
																	});
												}
											}
										});
							};
						} ]);

var resolveStatus = function(status, lang) {
	var translations = getTranslations(lang);
	switch (status) {
	case 'NOT_FOUND':
		return translations.notFound;
	case 'SENT':
		return translations.sent;
	case 'RECEIVED':
		return translations.received;
	case 'IN_PROGRESS':
		return translations.inProgress;
	case 'COMPLETED':
		return translations.completed;
	}
};

var getTranslations = function(lang) {
	var translations;
	if (lang === 'ukr') {
		translations = {
			notFound : 'Заявки з таким кодом не знайдено.',
			sent : 'Ваша заявка відправлена.',
			received : "Ваша заявка отримана. Ми зв'яжемось з вами найближчим часом.",
			inProgress : 'Ваша заявка в процесі обробки.',
			completed : 'Ваша заявка успішно виконана.'
		}
	} else if (lang === 'eng') {
		translations = {
			notFound : 'Application not found.',
			sent : 'Application is sent.',
			received : "We have received your application and will contact you soon.",
			inProgress : 'Application in progress.',
			completed : 'Application completed.'
		}
	} else {
		console.error(lang);
	}
	return translations;
};

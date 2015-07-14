angular
    .module('verificatorModule')
    .controller('NotificationsController', ['$scope', '$log', 'VerificationService', '$interval', '$state', '$rootScope', '$timeout',
        function ($scope, $log, verificationService, $interval, $state,  $rootScope, $timeout) {
    	
	    	var promiseInterval;
	    	var promiseTimeOut;
	    	$scope.countOfUnreadVerifications = 0;
	    	
	    	$scope.reloadVerifications = function() {
	    		$rootScope.$broadcast('refresh-table');
	    	}
			
	    	$scope.startPolling = function(){
					$scope.stopPolling();
					if(angular.isDefined(promiseInterval)) return;
					promiseInterval = $interval(function () {
						verificationService.getCountOfNewVerifications().success(function (count) {
				       		$scope.countOfUnreadVerifications = count;
							})
					}, 5000); 
			}

	    	$scope.stopPolling = function() {
	    			$interval.cancel(promiseInterval);
	    	};
	    	
	    	$scope.startPolling();
	    	
			$rootScope.$on('verification-sent-to-calibrator', function(){
					$log.info("gotcha... verif sent to calibrator ");   	
					verificationService.getCountOfNewVerifications().success(function (count) {
			       		$scope.countOfUnreadVerifications = count;
						});
			});	   	
		
			$rootScope.$on('verification-was-read', function(){
				$log.info("gotcha... verif was read "); 
				verificationService.getCountOfNewVerifications().success(function (count) {
		       		$scope.countOfUnreadVerifications = count;
					});
			});
		
			$scope.$on('$destroy', function () {
					$scope.stopPolling();
			}); 

	}]);
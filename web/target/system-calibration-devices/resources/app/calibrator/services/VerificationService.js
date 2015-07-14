angular
    .module('calibratorModule')
    .factory('VerificationService', ['$http', '$log', function ($http, $log) {

        return {
            getArchivalVerifications: function (currentPage, itemsPerPage) {
                return getData('verifications/archive/' + currentPage + '/' + itemsPerPage);
            },
            getNewVerifications: function (currentPage, itemsPerPage, searchType, searchText) {
                return getData('verifications/new/' + currentPage + '/' + itemsPerPage + '/' + searchType + '/' + searchText);
            },
            getArchivalVerificationDetails: function (verificationId) {
                return getData('verifications/archive/' + verificationId);
            },
            getNewVerificationDetails: function (verificationId) {
                return getData('verifications/new/' + verificationId);
            },
            getVerificators: function (url) {
                return getData('verifications/new/verificators');
            },
            sendVerificationsToCalibrator: function (data) {
                return updateData('new/update', data);
            },
            sendInitiatedVerification:function(form){
                return sendData("send",form);
            },
            getCalibratorsCorrespondingProvider:function(url){
                return getData("applications/calibrators");
            },
            getLocalitiesCorrespondingProvider:function(url){
                return getData("applications/localities");
            },
            getStreetsCorrespondingLocality:function(selectedLocality){
                return getData("applications/streets/" + selectedLocality.id);
            },
            getBuildingsCorrespondingStreet:function(selectedBuilding){
                    return getData("applications/buildings/" + selectedBuilding.id);
            },
            getCountOfNewVerifications: function(url) {
            	return getData('verifications/new/count/calibrator');
            },
            markVerificationAsRead : function(data) {
            	return updateData('new/read', data);
            }
        };

        function getData(url) {

           // $log.info(url);

            return $http.get('calibrator/' + url)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }

        function updateData(url, data) {
            return $http.put('calibrator/verifications/' + url, data)
                .success(function (responseData) {
                    return responseData;
                })
                .error(function (err) {
                    return err;
                });
        }

        function sendData(url, data) {
            return $http.post('calibrator/applications/' + url, data)
                .success(function (responseData) {
                    return responseData;
                })
                .error(function (err) {
                    return err;
                });
        }
   
    }]);

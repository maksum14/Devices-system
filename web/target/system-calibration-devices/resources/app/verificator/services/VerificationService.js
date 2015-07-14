angular
    .module('verificatorModule')
    .factory('VerificationService', ['$http', '$log', function ($http, $log) {

        return {
            getArchivalVerifications: function (currentPage, itemsPerPage) {
                return getData('verifications/archive/' + currentPage + '/' + itemsPerPage);
            },
            getNewVerifications: function (currentPage, itemsPerPage) {
                return getData('verifications/new/' + currentPage + '/' + itemsPerPage);
            },
            getArchivalVerificationDetails: function (verificationId) {
                return getData('verifications/archive/' + verificationId);
            },
            getNewVerificationDetails: function (verificationId) {
                return getData('verifications/new/' + verificationId);
            },
            getVerificators: function (url) {
                return getData('verifications/new/providers');
            },
            sendVerificationsToCalibrator: function (data) {
                return updateData('new/update', data);
            },
            sendInitiatedVerification:function(form){
                return sendData("send",form);
            },
            getVerificatorsCorrespondingProvider:function(url){ // ??
                return getData("applications/verificators");
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
            	return getData('verifications/new/count/verificator');
            },
            markVerificationAsRead : function(data) {
            	return updateData('new/read', data);
            },
            searchNewVerifications : function(data) {
            	return sendDataWithParams('new/search', data);
            }
        };

        function getData(url) {

            $log.info(url);

            return $http.get('verificator/' + url)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }

        function updateData(url, data) {
            return $http.put('verificator/verifications/' + url, data)
                .success(function (responseData) {
                    return responseData;
                })
                .error(function (err) {
                    return err;
                });
        }

        function sendData(url, data) {
            return $http.post('verificator/applications/' + url, data)
                .success(function (responseData) {
                    return responseData;
                })
                .error(function (err) {
                    return err;
                });
        }
    }]);

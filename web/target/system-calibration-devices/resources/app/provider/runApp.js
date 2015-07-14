require.config({
    paths: {
        angular: '../../assets/bower_components/angular/angular.min',
        csrfInterceptor: '../../assets/bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min',
        angularBootstrap: '../../assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularUIRouter: '../../assets/bower_components/angular-ui-router/release/angular-ui-router.min',
        showErrors: '../../assets/bower_components/angular-bootstrap-show-errors/src/showErrors.min',
        ngTable: '../../assets/bower_components/ng-table/ng-table',
        providerModule: 'providerModule'
    },
    shim: {
        angular: {
            exports: "angular"
        },
        csrfInterceptor: {
            deps: ['angular']
        },
        angularBootstrap: {
            deps: ['angular']
        },
        angularUIRouter: {
            deps: ['angular']
        },
        showErrors: {
            deps: ['angular']
        },
        ngTable: {
        	exports:"ngTable",
        	 deps: [ 'angular' ]
        },
        providerModule: {
            deps: ['angular', 'csrfInterceptor', 'angularBootstrap', 'angularUIRouter',
                'showErrors', 'ngTable']
        }
    }
});

require(['providerModule'], function () {
    angular.bootstrap(document.getElementById('providerModule'), ['providerModule']);
});

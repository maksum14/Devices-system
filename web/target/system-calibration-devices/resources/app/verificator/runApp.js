require.config({
    paths: {
        angular: '../../assets/bower_components/angular/angular.min',
        csrfInterceptor: '../../assets/bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min',
        angularBootstrap: '../../assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularUIRouter: '../../assets/bower_components/angular-ui-router/release/angular-ui-router.min',
        showErrors: '../../assets/bower_components/angular-bootstrap-show-errors/src/showErrors.min',
        ngTable: '../../assets/bower_components/ng-table/ng-table',
        verificatorModule: 'verificatorModule'
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
        verificatorModule: {
            deps: ['angular', 'csrfInterceptor', 'angularBootstrap', 'angularUIRouter',
                'showErrors']
        }
    }
});

require(['verificatorModule'], function () {
    angular.bootstrap(document.getElementById('verificatorModule'), ['verificatorModule']);
});

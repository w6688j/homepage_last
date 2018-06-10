requirejs.config({
    baseUrl: './js/',
    paths: {
        'jquery': 'https://cdn.bootcss.com/jquery/2.1.4/jquery.min',
        'angular': 'https://cdn.bootcss.com/angular.js/1.4.6/angular.min',
        'angular-ui-router': 'https://cdn.bootcss.com/angular-ui-router/0.2.15/angular-ui-router.min',
        'superfish': 'https://cdn.bootcss.com/superfish/1.7.9/js/superfish.min',
        'easing': 'https://cdn.bootcss.com/jquery-easing/1.3/jquery.easing.min',
        'laravel': 'app/app',
        'angular-async-loader': 'libs/angular-async-loader.min',
        'ctrl': 'app/controllers',
        'srv': 'app/services',
        'dire': 'app/directives',
        'config': 'app/config',
        'functions': 'app/functions',
    },
    shim: {
        'functions': ['jquery', 'superfish', 'easing'],
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'config': {
            deps: ['angular'],
            exports: 'config'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'angular', 'laravel', 'ctrl/loadingInterceptor', 'angular-ui-router', 'app/routers'],
    function ($, angular) {
        $(function () {
            angular.bootstrap(document, ['laravel']);
        });
    });
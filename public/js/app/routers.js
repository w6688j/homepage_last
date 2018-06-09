define(['laravel', 'config'], function (laravel, config) {
    laravel.run(['$state', '$stateParams', '$rootScope',
        function ($state, $stateParams, $rootScope) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);

    laravel.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: config.tpl('/index/index'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'index'
                })
                .state('research', {
                    url: '/research',
                    templateUrl: config.tpl('/index/research'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'research'
                })
                .state('publications', {
                    url: '/publications',
                    templateUrl: config.tpl('/index/publications'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'publications'
                })
                .state('projects', {
                    url: '/projects',
                    templateUrl: config.tpl('/index/projects'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'projects'
                })
                .state('awards', {
                    url: '/awards',
                    templateUrl: config.tpl('/index/awards'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'awards'
                })
                .state('courses', {
                    url: '/courses',
                    templateUrl: config.tpl('/index/courses'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'courses'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: config.tpl('/index/contact'),
                    controllerUrl: 'ctrl/index/index',
                    controller: 'contact'
                })
            ;

            $locationProvider.html5Mode(true).hashPrefix('!');
        }]);
});
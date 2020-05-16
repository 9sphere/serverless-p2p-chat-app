angular
    .module('serverlessApp', ['ngRoute'])
    .config(config)
    .run(run)
    .directive('ngEnter', ngEnter);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        }).when('/name', {
           templateUrl: 'views/name.html',
           controller: 'NameController'
        });
};

run.$inject = ['$rootScope', '$location'];

function run($rootScope, $location) {
    $rootScope.name = localStorage.getItem('name') || '';
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if (!$rootScope.name) {
            $location.path('/name');
        } else {
            $location.path('/');
        }
    });
}
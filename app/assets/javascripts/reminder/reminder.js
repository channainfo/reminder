var reminder = angular.module('reminder', ['templates',
                                           'ui.router',
                                           'ngResource',
                                           'ngAnimate',
                                           'ui.bootstrap',
                                           'toggle-switch'
                                           ]);


reminder.config(["$httpProvider", '$locationProvider', function($httpProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);
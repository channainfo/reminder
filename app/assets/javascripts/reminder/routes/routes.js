reminder.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/groups");
  //
  // Now set up the states
  $stateProvider
    .state('groups', {
      url: "/groups",
      templateUrl: "reminder/templates/groups/index.html"
    })
    .state('groups.new', {
      url: "/new",
      templateUrl: "reminder/templates/groups/new.html"
    })
    .state('schedules', {
      url: "/schedules",
      templateUrl: "reminder/templates/schedules/index.html"
    })
}]);
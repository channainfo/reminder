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
    .state('groups.edit', {
      url: "/:groupId/edit",
      templateUrl: "reminder/templates/groups/edit.html"
    })

    .state('schedules', {
      url: "/schedules",
      templateUrl: "reminder/templates/schedules/index.html"
    })
     .state('schedules.new', {
      url: "/new",
      templateUrl: "reminder/templates/schedules/new.html"
    })
    .state('schedules.edit', {
      url: "/:scheduleId/edit",
      templateUrl: "reminder/templates/schedules/edit.html"
    })
}]);
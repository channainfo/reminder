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
    .state('groups-new', {
      url: "/groups/new",
      templateUrl: "reminder/templates/groups/new.html"
    })
    .state('groups-edit', {
      url: "/groups/:groupId/edit",
      templateUrl: "reminder/templates/groups/edit.html"
    })

    .state('schedules', {
      url: "/schedules",
      templateUrl: "reminder/templates/schedules/index.html"
    })
     .state('schedules-new', {
      url: "/schedules/new",
      templateUrl: "reminder/templates/schedules/new.html"
    })
    .state('schedules-edit', {
      url: "/schedules/:scheduleId/edit",
      templateUrl: "reminder/templates/schedules/edit.html"
    })
}]);
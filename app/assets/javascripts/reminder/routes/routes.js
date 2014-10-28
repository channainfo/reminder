reminder.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/projects");
  //
  // Now set up the states
  $stateProvider
    .state('projects', {
      url: "/projects",
      templateUrl: "reminder/templates/projects/index.html"
    })
    .state('groups', {
      url: "/projects/:projectId/groups",
      templateUrl: "reminder/templates/groups/index.html"
    })
    .state('groups-new', {
      url: "/projects/:projectId/groups/new",
      templateUrl: "reminder/templates/groups/new.html"
    })
    .state('groups-edit', {
      url: "/projects/:projectId/groups/:groupId/edit",
      templateUrl: "reminder/templates/groups/edit.html"
    })

    .state('schedules', {
      url: "/projects/:projectId/schedules",
      templateUrl: "reminder/templates/schedules/index.html"
    })
     .state('schedules-new', {
      url: "/projects/:projectId/schedules/new",
      templateUrl: "reminder/templates/schedules/new.html"
    })
    .state('schedules-edit', {
      url: "/projects/:projectId/schedules/:scheduleId/edit",
      templateUrl: "reminder/templates/schedules/edit.html"
    })
}]);
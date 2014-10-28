reminder.controller("ProjectController", ["$scope", "Project", "Loader", function($scope, Project, Loader) {
  $scope.status = false;

  $scope.projects = [];
  $scope.project = null;

  $scope.init = function(){
    Loader.fetchTo($scope, {
      projects: true,
    });
  }

}])
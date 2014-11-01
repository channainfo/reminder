reminder.controller("ProjectsController", 
                  ["$scope", "Project",
                  function($scope, Project){
  $scope.projects = [];

  $scope.init = function(){
    $scope.setLoading(true);

    Project.query(function(projects){
      $scope.projects = projects;
      $scope.setLoading(false);
    })
  }

}])
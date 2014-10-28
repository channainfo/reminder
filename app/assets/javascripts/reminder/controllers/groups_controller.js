reminder.controller("GroupsController", 
                  ["$scope", "$timeout", "$state", "Group", "Loader",
                  function($scope, $timeout, $state, Group, Loader){

  $scope.editingMode = false;
  $scope.groups = [];

  $scope.init = function(){
    $scope.setLoading(true);

    Group.query({project_id: $scope.params("projectId")}, function(groups){
      $scope.groups = groups;
      $scope.setLoading(false);
    })
  }

  $scope.remove = function(group) {
    if(!confirm("Are you sure you want to remove?")) return;
    $scope.removeGroup(group);
  }

  $scope.removeGroup = function(group){
    var successCallback = function(){
      $scope.setLoading(false);
      var index = $scope.groups.indexOf(group);
      if(index != -1)
        $scope.groups.splice(index, 1);

      $scope.setFlashSuccess("Group has been removed");
      $scope.redirectTo("groups", {projectId: $scope.params("projectId")});
    }

    var errorCallback = function(){
      $scope.setLoading(false);
      $scope.setFlashFailure("Couldn't remove group");
    }
    
    $scope.setLoading(true);
    Group.remove({id: group.id, project_id: $scope.params("projectId")}, successCallback, errorCallback);
  }

}])
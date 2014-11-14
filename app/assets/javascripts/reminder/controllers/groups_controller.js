reminder.controller("GroupsController", 
                  ["$scope", "ReminderGroup",
                  function($scope, ReminderGroup){

  $scope.editingMode = false;
  $scope.groups = [];

  $scope.init = function(){
    $scope.setLoading(true);

    ReminderGroup.query({project_id: $scope.params("projectId")}, function(groups){
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
      $scope.groups.removeElement(group, function(search, group){
         return search.id == group.id
      });

      $scope.setFlashSuccess("Group has been removed");
      $scope.redirectTo("groups", {projectId: $scope.params("projectId")});
    }

    var errorCallback = function(){
      $scope.setLoading(false);
      $scope.setFlashFailure("Couldn't remove group");
    }
    
    $scope.setLoading(true);
    ReminderGroup.remove({id: group.id, project_id: $scope.params("projectId")}, successCallback, errorCallback);
  }

}])
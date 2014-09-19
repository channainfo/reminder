reminder.controller("GroupsController", 
                  ["$scope", "Group",
                  function($scope, Group){

  $scope.groups = [];

  $scope.init = function(){
    Group.query(function(groups){
      $scope.groups = groups;
    })
  }

  $scope.remove = function(group) {
    if(!confirm("Are you sure you want to remove?")) return;
    $scope.removeGroup(group);
  }

  $scope.removeGroup = function(group){
    var successCallback = function(){
      $scope.setLoadingStatus(false);
      var index = $scope.groups.indexOf(group);
      if(index != -1)
        $scope.groups.splice(index, 1);

      $scope.setSuccess("Group has been removed");
      $scope.redirectTo("groups");
    }

    var errorCallback = function(){
      $scope.setLoadingStatus(false);
      $scope.setFailure("Couldn't remove group");
    }
    
    $scope.setLoadingStatus(true);
    Group.remove({id: group.id}, successCallback, errorCallback);
  }

}])
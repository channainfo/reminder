reminder.controller("GroupsController", 
                  ["$scope", "Group", "$state",
                  function($scope, Group, $state){

  $scope.groups = [];

  $scope.init = function(){
    Group.query().$promise.then(function(groups){
      $scope.groups = groups;
    })
  }

  $scope.remove = function(group) {
    if(!confirm("Are you sure you want to remove?")) return;
    $scope.setLoadingStatus(true);
    Group.remove({id: group.id}).$promise.then(
      function(){
        $scope.setLoadingStatus(false);
        var index = $scope.groups.indexOf(group);
        if(index != -1)
          $scope.groups.splice(index, 1);

        $scope.setSuccess("Group has been removed");
        $state.go("groups");
      },
      function(){
        $scope.setLoadingStatus(false);
        $scope.setFailure("Couldn't remove group");
      }
    );
  }
}])
reminder.controller("SchedulesController", 
                  ["$scope", "$state", "Project", "Schedule", "Group", "Channel", "ScheduleHelper",
                  function($scope, $state, Project, Schedule, Group, Channel, ScheduleHelper){

  $scope.groups            = [];
  $scope.schedules         = [];
  $scope.channels          = [];

  $scope.projects          = [];
  $scope.callFlows         = [];
  $scope.projectVariables  = [];

  $scope.init = function(){
    ScheduleHelper.loadTo($scope, {
      projects: true,
      channels: true,
      schedules: true,
      groups: true
    });
  }

  $scope.remove = function(schedule) {
    if(!confirm("Are you sure you want to remove?")) return;
    $scope.setLoadingStatus(true);
    Schedule.remove({id: schedule.id}).$promise.then(
      function(){
        $scope.setLoadingStatus(false);
        var index = $scope.schedules.indexOf(schedule);
        if(index != -1)
          $scope.schedules.splice(index, 1);

        $scope.setSuccess("Schedule has been removed");
        $state.go("schedules");
      },
      function(){
        $scope.setLoadingStatus(false);
        $scope.setFailure("Couldn't remove schedule");
      }
    );
  }

}])
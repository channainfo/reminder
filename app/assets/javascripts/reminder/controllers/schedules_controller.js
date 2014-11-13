reminder.controller("SchedulesController", 
                  ["$scope", "Project", "ReminderSchedule", "Loader",
                  function($scope, Project, ReminderSchedule, Loader){

  $scope.groups            = [];
  $scope.schedules         = [];
  $scope.channels          = [];

  $scope.init = function(){
    Loader.fetchTo($scope, {
      channels: true,
      schedules: true,
      groups: true
    });
  }

  $scope.remove = function(schedule) {
    if(!confirm("Are you sure you want to remove?"))
      return;

    $scope.setLoading(true);

    ReminderSchedule.remove({project_id: $scope.params("projectId"), id: schedule.id},
      function(){
        var index = $scope.schedules.indexOf(schedule);
        if(index != -1)
          $scope.schedules.splice(index, 1);

        $scope.setLoading(false);
        $scope.setFlashSuccess("Schedule has been removed");
        $scope.redirectTo("schedules", {projectId: $scope.params("projectId")});
      },
      function(){
        $scope.setLoading(false);
        $scope.setFlashFailure("Couldn't remove schedule");
      }
    );
  }

}])
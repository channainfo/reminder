reminder.controller("SchedulesController", 
                  ["$scope", "$state", "Project", "Schedule", "Group", "Channel",
                  function($scope, $state, Project, Schedule, Group, Channel){

  $scope.groups            = [];
  $scope.schedules         = [];
  $scope.channels          = [];

  $scope.projects          = [];
  $scope.callFlows         = [];
  $scope.projectVariables  = [];

  $scope.init = function(){

    Channel.query({}, function(channels) {
      $scope.channels = channels;
    });

    Project.query({}, function(projects) {
      $scope.projects = projects;
      $scope._fillCallFlowsAndVariables();
    });

    Group.collection({}, function(groups) {
      $scope.groups = groups;
    });

    Schedule.query().$promise.then(function(schedules){
      $scope.schedules = schedules;
    })
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

  $scope._fillCallFlowsAndVariables = function(){
    $scope.callFlows = [];
    $scope.projectVariables = [];

    $.each($scope.projects, function(_, project){
      
      $.each(project.project_variables, function(_, variable){
        variable.projectName = project.name;
        $scope.projectVariables.push(variable);
      });

      $.each(project.call_flows, function(_, callFlow){
        callFlow.projectName = project.name;
        $scope.callFlows.push(callFlow);
      });
    });
  }
}])
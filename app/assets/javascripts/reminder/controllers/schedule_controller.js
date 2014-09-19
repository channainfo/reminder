reminder
  .controller("ScheduleController", 
              ["$scope", "$stateParams", "Schedule", "Group", "Channel", "EntityManager", 
              function($scope, $stateParams, Schedule, Group, Channel, EntityManager){


  $scope.DATE_TYPES = ["Day", "Week", "Month", "Year"];

  $scope.init = function() {
    $scope.setDefaultData();
    if(!$stateParams.scheduleId)
      return;
    $scope.fetchSchedule();
  }

  $scope.fetchSchedule = function() {
    var success = function(schedule){
      $scope.schedule = schedule;
    };

    var error = function() {
      $scope.redirectTo("schedules");
    };

    Schedule.get({id: $stateParams.scheduleId}, success, error);
  }

  $scope.setDefaultData = function(){
    $scope.schedule = new Schedule({
      id: 0,
      group_id: 0,
      channels: [],
      call_flow_id: 0,
      start_date: new Date(),
      from: "",
      to: "",
      retries: "",
      is_repeated: false,
      conditions: { var_name: {},
                    operator: "=",
                    value: "",
                    data_type: "DAY" }
    })
    $scope.newChannel = null;
    $scope.startDate    = new Date();
  }

  $scope.resetForm = function(){
    $scope.setDefaultData();
  }

  $scope.filterVariables = function(){
    var callFlow = $scope.schedule.findCallFlowIn($scope.callFlows);
    
    $scope.variables = $scope.projectVariables.filter(callFlow.projectName, function(projectName, variable) {
      return variable.projectName == projectName;
    });
  };

  $scope.replace = function(schedule) {
    var index = $scope.schedules.indexOfElement(schedule, function(schedule, e){
      return schedule.id == e.id
    })

    if(index != -1)
      $scope.schedules.splice(index, 1, schedule);
    else
      $scope.schedules.unshift(schedule);
  }

  $scope.save = function(){
    $scope.setLoadingStatus(true);

    var success = function(schedule){
      $scope.setLoadingStatus(false);
      $scope.replace(schedule);

      $scope.setSuccess("Schedule has been saved");
      $scope.redirectTo("schedules");
    }

    var error = function(){
      $scope.setLoadingStatus(false);
      $scope.setFailure("Couldn't save schedule");
    }

    entity = EntityManager.getEntityFor(Schedule);
    entity.save($scope.schedule, success, error);
  }

  $scope.addNewChannel = function() {
    if($scope.newChannel && !$scope.channelExists($scope.newChannel)) {
      $scope.schedule.channels.push($scope.newChannel);
      $scope.newChannel = null;
    }
  }

  $scope.channelExists = function(channel) {
    var index = $scope.schedule.channels.indexOfElement(channel, function(channel, e) {
      return channel.id == e.id;
    })
    return index != -1;
  }

  $scope.removeChannel = function(index){
    $scope.schedule.channels.splice(index, 1);
  }

}])
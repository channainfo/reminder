reminder
  .controller("ScheduleController", 
              ["$scope", "Project", "Schedule", "Group", "Channel", "EntityManager", "Loader", 
              function($scope, Project, Schedule, Group, Channel, EntityManager, Loader){

  $scope.newChannel = null;
  $scope.startDate    = new Date();
  $scope.schedule = new Schedule({
    id: 0,
    project_id: $scope.params("projectId"),
    group_id: 0,
    channels: [],
    call_flow_id: 0,
    start_date: new Date(),
    from: "",
    to: "",
    retries: "",
    is_repeated: false,
    conditions: []
  });

  $scope.DATE_TYPES = ["Day", "Week", "Month", "Year"];

  $scope.groups            = [];
  $scope.channels          = [];



  $scope.loadReferences = function(){
    Loader.fetchTo($scope, {
      channels: true,
      groups: true
    });
  }

  $scope.init = function() {
    $scope.loadReferences();
    //load schedule if edit action
    if($scope.params("scheduleId"))
      $scope.loadSchedule($scope.params("scheduleId"));
  }

  $scope.loadSchedule = function(id) {
    $scope.setLoading(true);

    Schedule.get({project_id: $scope.params("projectId"), id: id},
      function(schedule){
        $scope.schedule = schedule;
        $scope.setLoading(false);
      }, 
      function() {
        $scope.setLoading(false);
        $scope.setFlashFailure("Couldn't load schedule");
        $scope.redirectTo("schedules", {projectId: $scope.params("projectId")});
      }
    );
  }
  
  $scope.save = function(){
    $scope.setLoading(true);
    var success = function(schedule){
      $scope.setLoading(false)
      $scope.setFlashSuccess("Schedule has been saved");
      $scope.redirectTo("schedules", {projectId: $scope.params("projectId")});
    }

    var error = function(){
      $scope.setLoading(false);
      $scope.setFlashFailure("Couldn't save schedule");
    }

    entity = EntityManager.getEntityFor(Schedule);
    entity.save($scope.schedule, success, error);
  }

  $scope.addNewChannel = function() {
    if($scope.isNewChannelValid()) {
      $scope.schedule.channels.push($scope.newChannel);
      $scope.newChannel = null;
    }
  }

  $scope.isNewChannelAvailable = function() {
    if($scope.newChannel)
      return !$scope.schedule.channels.hasElement($scope.newChannel, function(search, element){
          return search.id == element.id
        })
    return true
  }

  $scope.isNewChannelValid = function(){
    if($scope.newChannel && $scope.isNewChannelAvailable())
      return true;
    return false;
  }

  $scope.removeChannel = function(index){
    $scope.schedule.channels.splice(index, 1);
  }

  $scope.isValid = function(){
    var valid = $scope.schedule.group_id &&
                $scope.schedule.call_flow_id &&
                $scope.schedule.channels.length > 0

    if($scope.schedule.is_repeated){
      valid = valid && 
              $scope.isValueValid() && 
              $scope.isVariableValid &&
              $scope.isDataTypeValid();
    }
    else
      valid = valid && $scope.isFromValid() && $scope.isToValid();

    return valid && $scope.isRetryValid()
  }

  $scope.isValueValid = function(){
    return $scope.schedule.hasConditions() &&
           $scope.schedule.conditions[0].value;
  }

  $scope.isDataTypeValid = function(){
    return $scope.schedule.hasConditions() &&
           $scope.schedule.conditions[0].data_type;
  }

  $scope.isVariableValid = function(){
    return $scope.schedule.hasConditions() && 
           $scope.schedule.conditions[0].var_name &&
           $scope.schedule.conditions[0].var_name.name;
  }

  $scope.isRetryValid = function(){
    if($scope.schedule.retries)
       return $scope.schedule.retries.isCommaSeparatedNumber()
    return true
  }

  $scope.isFromValid = function(){
    return $scope.schedule.from.isHourFormat();
  }

  $scope.isToValid = function(){
    return $scope.schedule.to.isHourFormat();
  }

}])
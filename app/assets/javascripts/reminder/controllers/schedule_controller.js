reminder
  .controller("ScheduleController", 
              ["$scope", "Project", "ReminderSchedule", "DataTransformer", "EntityManager", "Loader", 
              function($scope, Project, ReminderSchedule, DataTransformer, EntityManager, Loader){

  $scope.newChannel = null;
  $scope.startDate    = new Date();
  $scope.schedule = new ReminderSchedule({
    id: 0,
    project_id: $scope.params("projectId"),
    reminder_group_id: 0,
    reminder_channels: [],
    call_flow_id: 0,
    client_start_date: new Date(),
    time_from: "",
    time_to: "",
    retries_in_hours: "",
    is_repeated: false,
    conditions: []
  });

  $scope.DATE_TYPES = ["day", "week", "month", "year"];

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

    ReminderSchedule.get({project_id: $scope.params("projectId"), id: id},
      function(schedule){
        $scope.schedule = DataTransformer.schedule(schedule);
        $scope.setLoading(false);
      }, 
      function() {
        $scope.setLoading(false);
        $scope.setFlashFailure("Couldn't load schedule");
        $scope.redirectTo("schedules", {projectId: $scope.params("projectId")});
      }
    );
  }

  $scope.findChannel = function(channelId){
    return $scope.channels.findElement(channelId, function(channelId, channel){
      return channelId == channel.id
    });
  }
  
  $scope.save = function(){
    $scope.setLoading(true);
    var success = function(){
      $scope.setLoading(false)
      $scope.setFlashSuccess("Schedule has been saved");
      $scope.redirectTo("schedules", {projectId: $scope.params("projectId")});
    }

    var error = function(){
      $scope.setLoading(false);
      $scope.setFlashFailure("Couldn't save schedule");
    }

    entity = EntityManager.getEntityFor(ReminderSchedule);
    entity.save($scope.schedule, success, error);
  }

  $scope.addNewChannel = function() {
    if($scope.isNewChannelValid()) {
      $scope.schedule.reminder_channels.push({channel_id: $scope.newChannel.id});
      $scope.newChannel = null;
    }
  }

  $scope.isNewChannelAvailable = function() {
    if($scope.newChannel)
      return !$scope.schedule.reminder_channels.hasElement($scope.newChannel, function(search, element){
          return search.id == element.channel_id
        })
    return true
  }

  $scope.isNewChannelValid = function(){
    if($scope.newChannel && $scope.isNewChannelAvailable())
      return true;
    return false;
  }

  $scope.removeChannel = function(index){
    $scope.schedule.reminder_channels.splice(index, 1);
  }

  $scope.isValid = function(){
    var valid = $scope.schedule.reminder_group_id &&
                $scope.schedule.call_flow_id &&
                $scope.schedule.reminder_channels.length > 0

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
           $scope.schedule.conditions[0].variable
  }

  $scope.isRetryValid = function(){
    if($scope.schedule.retries_in_hours)
       return $scope.schedule.retries_in_hours.isCommaSeparatedNumber()
    return true
  }

  $scope.isFromValid = function(){
    return $scope.schedule.time_from.isHourFormat();
  }

  $scope.isToValid = function(){
    return $scope.schedule.time_to.isHourFormat();
  }

}])
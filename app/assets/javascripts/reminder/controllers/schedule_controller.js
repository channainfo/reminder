reminder
  .controller("ScheduleController", 
              ["$scope", "$stateParams", "Project", "Schedule", "Group", "Channel", "EntityManager", "ScheduleHelper", 
              function($scope, $stateParams, Project, Schedule, Group, Channel, EntityManager, ScheduleHelper){

  $scope.DATE_TYPES = ["Day", "Week", "Month", "Year"];


  $scope.groups            = [];
  $scope.channels          = [];
  $scope.projects          = [];

  $scope.loadReferences = function(){
    ScheduleHelper.loadTo($scope, {
      projects: true,
      channels: true,
      groups: true
    });
  }

  $scope.init = function() {
    $scope.loadReferences();
    $scope.setDefaultData();

    //load schedule if edit action
    if($stateParams.scheduleId){
      setTimeout(function(){
         $scope.loadSchedule($stateParams.scheduleId);
       }, 300);
    }
  }

  $scope.loadSchedule = function(id) {
    Schedule.get({id: id},
      function(schedule){
        $scope.schedule = schedule;
      }, 
      function() {
        $scope.redirectTo("schedules");
      }
    );
  }

  $scope.setDefaultSchedule = function(){
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
    });
  }

  $scope.setDefaultData = function(){
    $scope.setDefaultSchedule();
    $scope.newChannel = null;
    $scope.startDate    = new Date();
  }

  $scope.filterVariables = function(){
    var callFlow = $scope.schedule.findCallFlowIn($scope.callFlows);
    if(callFlow) {
      $scope.variables = $scope.projectVariables.filter(callFlow.projectName, function(projectName, variable) {
        return variable.projectName == projectName;
      });
    }
  };

  $scope.$watch('schedule.call_flow_id', function(newVal, oldVal){ 
    if(newVal !=0)
      $scope.filterVariables();
  })

  $scope.save = function(){
    $scope.setLoadingStatus(true);

    var success = function(schedule){
      $scope.setLoadingStatus(false)
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
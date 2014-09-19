reminder.factory("Schedule", ["$resource", "Config", function($resource, Config){
  var ScheduleModel = $resource( Config.host + "schedules/:id", null, {
    update: { method: 'PUT' }
  });

  // custom method for Schedule resource
  ScheduleModel.prototype.toParams = function(){
    var _self = this;
    return {
      schedule: {
        group_id: _self.group_id,
        channels: _self.channels,
        call_flow_id: _self.call_flow_id,
        start_date: _self.start_date,
        from: _self.from,
        to: _self.to,
        conditions: _self.conditions,
        retries: _self.retries,
        is_repeated: _self.is_repeated
      }
    }
  }

  ScheduleModel.prototype.findGroupIn = function(groups){
    var _self = this;
    return groups.findElement(_self.group_id, function(groupId, group) {
             return group.id == groupId;
           });
  }

  ScheduleModel.prototype.findCallFlowIn = function(callFlows){
    var _self = this;
    return callFlows.findElement(_self.call_flow_id, function(callFlowId, callFlow) {
             return callFlow.id == callFlowId;
           });
  }

  ScheduleModel.prototype.channelsAsText = function(){
    var results = $scope.channels.map(function(channel){
      return channel.name
    });
    return results.join(", ")
  };

  ScheduleModel.prototype.hasConditions = function(){
    var _self = this;
    return !jQuery.isEmptyObject(_self.conditions.var_name)
  }

  return ScheduleModel;
}])
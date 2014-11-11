reminder.factory("Schedule", ["$resource", "Config", function($resource, Config){
  var ScheduleModel = $resource( Config.host + "projects/:project_id/schedules/:id", null, {
    update: { method: 'PUT' },
    create: { method: 'POST'}
  });

  // custom method for Schedule resource
  ScheduleModel.prototype.toParams = function(){
    var _self = this;
    if(_self.hasConditions()) _self.conditions[0].operator = "="
    return {
      schedule: {
        group_id: _self.group_id,
        channels: _self.channels,
        call_flow_id: _self.call_flow_id,
        start_date: _self.start_date,
        from: _self.from,
        to: _self.to,
        conditions: _self.conditions,
        retries_in_hours: _self.retries_in_hours,
        is_repeated: _self.is_repeated,
        project_id: _self.project_id
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
    var results = this.channels.map(function(channel){
      return channel.name
    });
    return results.join(", ")
  };

  ScheduleModel.prototype.hasConditions = function(){
    return this.conditions.length > 0
  }
  return ScheduleModel;
}])
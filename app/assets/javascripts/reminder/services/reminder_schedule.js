reminder.factory("ReminderSchedule", ["$resource", "Config", function($resource, Config){
  var ScheduleModel = $resource( Config.host + "projects/:project_id/reminder_schedules/:id", null, {
    update: { method: 'PUT' },
    create: { method: 'POST'}
  });

  // custom method for Schedule resource
  ScheduleModel.prototype.toParams = function(){
    var _self = this;
    if(_self.hasConditions()) _self.conditions[0].operator = "="
    return {
      reminder_schedule: {
        project_id: _self.project_id,
        reminder_group_id: _self.reminder_group_id,
        reminder_channels_attributes: _self.reminder_channels.map(function(reminder_channel){
          return {id: reminder_channel.id, channel_id: reminder_channel.channel_id}
        }),
        call_flow_id: _self.call_flow_id,
        client_start_date: _self.client_start_date.strftime(Config.dateFormat),
        time_from: _self.time_from,
        time_to: _self.time_to,
        conditions: _self.conditions,
        retries: _self.retries_in_hours ? 1 : 0,
        retries_in_hours: _self.retries_in_hours,
        schedule_type: _self.schedule_type
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

  ScheduleModel.prototype.channelsAsText = function(channels){
    var results = this.reminder_channels.map(function(reminderChannel){ 
      var channel = channels.findElement(reminderChannel, function(reminderChannel, channel){
        return reminderChannel.channel_id == channel.id;
      })
      return channel.name
    });
    return results.join(", ")
  };

  ScheduleModel.prototype.hasConditions = function(){
    return this.conditions.length > 0
  }
  return ScheduleModel;
}])
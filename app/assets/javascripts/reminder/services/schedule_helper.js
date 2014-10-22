reminder.factory("ScheduleHelper", ["Channel", "Project", "Group", "Schedule",
  function(Channel, Project, Group, Schedule){
    return {
      scope: null,
      loadTo: function(scope, options){
        var _self = this;
        _self.scope = scope;
        if(options['projects']){
          Project.query({}, function(projects) {
            _self.scope.projects = projects;
            _self.setCallFlows();
            _self.setProjectVariables();
          });
        }

        if(options['groups']){
          Group.collection({}, function(groups) {
            _self.scope.groups = groups;
          });
        }

        if(options['channels']){
          Channel.query({}, function(channels) {
            _self.scope.channels = channels;
          });
        }

        if(options['schedules']){
          Schedule.query({}, function(schedules){
            _self.scope.schedules = schedules;
          });
        }
    },

    setProjectVariables:  function(){
      var _self = this;
      _self.scope.projectVariables = [];

      _self.scope.projects.each(function(project){
        project.project_variables.each(function(variable){
          variable.projectName = project.name;
          _self.scope.projectVariables.push(variable);
        });
      });
    },

    setCallFlows:  function() {
      var _self = this;
      _self.scope.callFlows = [];

      _self.scope.projects.each(function(project){
        project.call_flows.each(function(callFlow){
          callFlow.projectName = project.name;
          _self.scope.callFlows.push(callFlow);
        });
      });
    }
  }

}])
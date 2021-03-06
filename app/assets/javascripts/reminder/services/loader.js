reminder.factory("Loader", ["Channel", "Project", "ReminderGroup", "ReminderSchedule",
  function(Channel, Project, ReminderGroup, ReminderSchedule){
    return {
      fetchTo: function(scope, options){

         if(options['projects']){
          
          scope.$watch("project", function(){
            scope.setBreadcrumbs([ {label: (scope.project ? scope.project.name : '' ), url: false} ]);
          });

          Project.query(function(projects) {
            scope.projects = projects;
            scope.project = scope.projects.findElement(scope.params("projectId"), function(projectId, project) {
               return projectId == project.id
            })
          });
        }

        if(options['groups']){
          ReminderGroup.collection({project_id: scope.params("projectId")}, function(groups) {
            scope.groups = groups;
          });
        }

        if(options['channels']){
          Channel.query({}, function(channels) {
            scope.channels = channels;
          });
        }

        if(options['schedules']){
          ReminderSchedule.query({project_id: scope.params("projectId")}, function(schedules){
            scope.schedules = schedules;
          });
        }
    }
  }

}])
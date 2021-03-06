function Entity(klass) {
  this.klass = klass;

  this.isNewRecord = function(resource) {
    return resource == undefined || resource.id == undefined || parseInt(resource.id) == 0;
  }

  this.save  = function(resource, success, error) {
    if (this.isNewRecord(resource))
      return this.klass.create({project_id: resource.project_id}, resource.toParams(), success, error);
    else
      return this.klass.update({project_id: resource.project_id, id: resource.id}, resource.toParams(), success, error);
  }
}

reminder.factory("EntityManager", ["ReminderGroup", "ReminderSchedule" , function(ReminderGroup, ReminderSchedule){
  return {
    entity: null,
    getEntityFor: function(modelClass) {
      if(this.entity && this.entity.klass != modelClass)
        this.entity.klass = modelClass;
      else if(this.entity == null)
        this.entity = new Entity(modelClass);
      return this.entity;
    }
  }
}]);

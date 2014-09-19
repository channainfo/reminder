function Entity(klass) {
  this.klass = klass;

  this.isNewRecord = function(resource) {
    return parseInt(resource.id) == 0;
  }

  this.save  = function(resource, success, error) {
    if (this.isNewRecord(resource))
      return this.klass.save(resource.toParams(), success, error);
    else
      return this.klass.update({id: resource.id}, resource.toParams(), success, error);
  }
}

reminder.factory("EntityManager", ["Group", function(Group){
  return {
    entity: null,
    getEntityFor: function(modelClass) {
      this.entity = new Entity(modelClass);
      return this.entity;
    }
  }
}]);

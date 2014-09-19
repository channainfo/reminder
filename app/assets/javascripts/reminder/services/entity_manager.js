function Entity(klass) {
  this.klass = klass;

  this.save  = function(resource) {
    if (parseInt(resource.id)>0)
      return this.klass.update({id: resource.id}, resource.toParams());
    else
      return this.klass.save(resource.toParams());
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

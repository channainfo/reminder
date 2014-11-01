reminder.factory("Group", ["$resource", "Config", function($resource, Config){
	var GroupModel = $resource( Config.host + "projects/:project_id/groups/:id", null, {
    update: { method: 'PUT' },
    create: { method: 'POST'},
    collection: { method: 'GET', 
                  isArray: true,
                  url: Config.host + "projects/:project_id/groups/collection"  }
  });

  //custom method for Group resource
  GroupModel.prototype.hasAddress = function() {
    return this.addresses.length > 0;
  };

  GroupModel.prototype.addressesText = function(){
    return this.addresses.join(",")
  };

  GroupModel.prototype.toParams = function(){
    var _self = this;
    return  {
      group: {
        name: _self.name,
        addresses: _self.addresses,
        project_id: _self.project_id
      }
    }
  }
  
  return GroupModel;
}])
reminder.factory("Group", ["$resource", "Config", function($resource, Config){
	var GroupModel = $resource( Config.host + "groups/:id");

  //custom method for Group resource
  GroupModel.prototype.hasAddress = function() {
    return this.addresses.length > 0;
  };

  GroupModel.prototype.addressesText = function(){
    return this.addresses.join(",")
  };

  return GroupModel;
}])
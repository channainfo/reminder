reminder.factory("Group", ["$resource", "Config", function($resource, Config){
	return $resource( Config.host + "groups/:id");
}])
reminder.factory("Channel", ["$resource", "Config", function($resource, Config){
  return $resource( Config.host + "channels/:id");
}])
reminder.factory("CallFlow", ["$resource", "Config", function($resource, Config){
  return $resource(Config.host + "call_flows/:id");
}])
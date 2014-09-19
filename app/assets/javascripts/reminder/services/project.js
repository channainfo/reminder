reminder.factory("Project", ["$resource", "Config", function($resource, Config){
  return $resource( Config.host + "projects/:id");
}])
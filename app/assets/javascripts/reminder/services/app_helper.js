reminder.factory("AppHelper", ["$state", function($state){
  return {
    url: function(routeName, routesParams, opitons){
      return $state.href(routeName, routesParams, opitons);
    }
  }
}])
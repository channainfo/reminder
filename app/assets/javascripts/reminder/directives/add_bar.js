reminder.directive('rmAddBar', function() {
  return {
    restrict: 'E',
    scope: { 
      title: '=',
      url: "="
    },
    templateUrl: 'reminder/templates/directives/add_bar.html'
  };
});
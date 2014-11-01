reminder.directive('rmTab', function() {
  return {
    restrict: 'E',
    scope: { 
      active: '=',
      project: '='
    },
    templateUrl: 'reminder/templates/directives/tab.html'
  };
});
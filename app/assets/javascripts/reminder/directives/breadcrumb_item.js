reminder.directive('rmBreadcrumbItem', function() {
  return {
    require: '^rmBreadcrumb',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, breadcrumbCtrl) {
      breadcrumbCtrl.addItem(scope);
    },
    templateUrl: 'reminder/templates/directives/breadcrumb_item.html'
  };
});
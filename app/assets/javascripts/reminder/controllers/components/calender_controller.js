reminder.controller('CalendarController', ['$scope', function($scope){

  $scope.format = "dd/MM/yyyy";

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };


  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

}])
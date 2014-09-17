reminder.controller("BaseController", ["$scope", function($scope) {
  $scope.status = false;
  $scope.message = "";
  $scope.loading = false;

  $scope.setSuccess = function(msg) {
    $scope.status = "success";
    $scope.message = msg;
  }

  $scope.setFailure = function(msg) {
    $scope.status = "failed";
    $scope.message = msg;
  }

  $scope.setLoadingStatus = function(status) {
    $scope.status = false
    $scope.loading = status;
  }

}])
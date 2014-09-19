reminder.controller("BaseController", ["$scope", "$location", function($scope, $location) {
  $scope.status = false;
  $scope.message = "";
  $scope.loading = false;
  $scope.currentUrl = "";

  $scope.init = function() {
    $scope.$on('$locationChangeStart', function(event) {
      $scope.currentUrl = $location.url();
    });
  }

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

  $scope.isMenuActive = function(path){
    return $scope.currentUrl.indexOf(path) != -1 ? " active" : ""
  }
}])
reminder.controller("BaseController", ["$rootScope", "$scope", "$location", "$state", "$stateParams", "AppHelper",
  function($rootScope, $scope, $location, $state, $stateParams, AppHelper) {

  $scope.FLASH_TIMEOUT = 10000;
  $rootScope.appHelper = AppHelper;
  
  $rootScope.flashMessage = "";
  $rootScope.loading = false;
  $scope.currentUrl = "";

  $scope.init = function() {
    $scope.$on('$locationChangeStart', function(event) {
      $scope.currentUrl = $location.url();
    });
  }

  //Flash message
  $scope.setFlashSuccess = function(msg) {
    $rootScope.flashStatus = "success";
    $rootScope.flashMessage = msg;
  }

  $scope.setFlashFailure = function(msg) {
    $rootScope.flashStatus = "failed";
    $rootScope.flashMessage = msg;
  }

  $scope.setLoading = function(loading) {
    $rootScope.loading = loading;
  }

  $scope.flushFlashMessage = function(){
    var message = $rootScope.flashMessage;
    return message;
  }

  $scope.flashStatus = function(){
    return $rootScope.flashStatus;
  }

  $scope.flashMessage = function() {
    return $rootScope.flashMessage;
  }

  $scope.isMenuActive = function(path){
    return $scope.currentUrl.indexOf(path) != -1 ? " active" : ""
  }

  $scope.redirectTo = function(path, params, options){
    $state.go(path, params, options);
  }

  $scope.params = function(paramName){
    return $stateParams[paramName];
  }

  $scope.setBreadcrumbs = function(breadcrumbs) {
    $rootScope.breadcrumbs = breadcrumbs;
  }

    //COMPONENTS
  $scope.breadcrumbs = function() {
    return $rootScope.breadcrumbs;
  }

}])
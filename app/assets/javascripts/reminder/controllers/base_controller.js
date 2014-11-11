reminder.controller("BaseController", ["$rootScope", "$scope", "$location", "$state", "$stateParams", "$timeout", "AppHelper",
  function($rootScope, $scope, $location, $state, $stateParams,$timeout, AppHelper) {

  $rootScope.appHelper = AppHelper;
  
  $rootScope._flashMessage = "";
  $rootScope._loading = false;
  $scope.currentUrl = "";

  $scope.init = function() {
    $scope.$on('$locationChangeStart', function(event) {
      $scope.currentUrl = $location.url();

      //clearout the flash once change the page
      $timeout(function(){
        $rootScope._flashMessage = ""
      }, 2*1000)
    });
  }

  //Flash message
  $scope.setFlashSuccess = function(msg) {
    $rootScope._flashStatus = "success";
    $rootScope._flashMessage = msg;
  }

  $scope.setFlashFailure = function(msg) {
    $rootScope._flashStatus = "failed";
    $rootScope._flashMessage = msg;
  }

  $scope.setLoading = function(loading) {
    $rootScope._loading = loading;
  }

  $scope.isLoading = function(){
    return $rootScope._loading
  }

  $scope.flushFlashMessage = function(){
    return $rootScope._flashMessage
  }

  $scope.flashStatus = function(){
    return $rootScope._flashStatus;
  }

  $scope.flashMessage = function() {
    return $rootScope._flashMessage;
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
    $rootScope._breadcrumbs = breadcrumbs;
  }

    //COMPONENTS
  $scope.breadcrumbs = function() {
    return $rootScope._breadcrumbs;
  }

}])
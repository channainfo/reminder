describe("BaseController", function() {
  var scope, state;

  beforeEach(function(){
    module("reminder");

    inject(function($controller, $state, $stateParams, $rootScope, $injector){
      scope = $rootScope.$new()
      state = $state

      $controller('BaseController', {
        $rootScope: $rootScope,
        $scope:     scope,
        $location:  $injector.get("$location"),
        $state:     state,
        $stateParams: $stateParams,
        AppHelper: $injector.get("AppHelper")
      });

      spyOn(state, 'go');
      $stateParams.projectId = 1
    })
  })

  describe("setLoading", function(){
    it("mark loading status to a given value", function(){
      scope.setLoading(true)
      expect(scope.isLoading()).toEqual(true)
    })
  })

  describe("setFlashSuccess", function(){
    it("set flash message to message and flash status to success", function(){
      scope.setFlashSuccess("X has been saved successfully")
      expect(scope.flashMessage()).toEqual("X has been saved successfully")
      expect(scope.flashStatus()).toEqual("success")
    })
  })

  describe("setFlashFailure", function(){
    it("set flash message to message and flash status to failed", function(){
      scope.setFlashFailure("Could not save xxx")
      expect(scope.flashMessage()).toEqual("Could not save xxx")
      expect(scope.flashStatus()).toEqual("failed")
    })
  })

  describe("redirectTo", function(){
    it("invoke the state.go", function(){
      scope.redirectTo("projects", {projectId: 1}, {});
      expect(state.go).toHaveBeenCalledWith("projects", {projectId: 1}, {})
    })
  })

  describe("params", function(){
    it("return value from stateParam.paramName", function(){
      expect(scope.params("projectId")).toEqual(1)
    })
  })
})
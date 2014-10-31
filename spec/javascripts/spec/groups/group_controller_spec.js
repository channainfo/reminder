describe("GroupController", function(){
  var scope, httpBackend, config

  beforeEach(function(){
    module("reminder")
    inject(function($injector, $controller, $rootScope, $httpBackend, Group, EntityManager, Config){
      scope  = $rootScope.$new()
      config = Config
      httpBackend = $httpBackend
      FakeBase(scope)

      $controller("GroupController", {
        '$scope': scope,
        'Group': Group,
        'EntityManager': EntityManager
      })
    })
  })

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  })

  describe("save", function(){
    it("set flash success message and redirect to /projects/:projectId/groups if save successfully", function(){
      httpBackend.whenPOST(config.host + 'projects/1/groups').respond(200)
      scope.save()
      httpBackend.flush();

      expect_to_show_loading_indicator_for(scope)
      expect(scope.setFlashSuccess).toHaveBeenCalledWith("Group has been saved")
      expect(scope.redirectTo).toHaveBeenCalledWith("groups", {projectId: 1})
    })

    it("set flash error message if failed to save", function(){
      httpBackend.whenPOST(config.host + 'projects/1/groups').respond(401)
      scope.save()
      httpBackend.flush()

      expect_to_show_loading_indicator_for(scope)
      expect(scope.setFlashFailure).toHaveBeenCalledWith("Couldn't save group")

    })
  })

  describe("fetchGroup", function(){
    it("store the fetched result to scope.group", function(){
      httpBackend.whenGET(config.host + 'projects/1/groups/1').respond(200, {id: 1, name: 'RHAC'})
      scope.fetchGroup()
      httpBackend.flush();

      expect_to_show_loading_indicator_for(scope)
      expect(scope.group.id).toEqual(1)
      expect(scope.group.name).toEqual('RHAC')

    })

    it("redirectTo /projects/:projectId/groups if error", function(){
      httpBackend.whenGET(config.host + 'projects/1/groups/1').respond(403)
      scope.fetchGroup()
      httpBackend.flush()

      expect_to_show_loading_indicator_for(scope)
      expect(scope.redirectTo).toHaveBeenCalledWith("groups", {projectId: 1})
    })

  });

})
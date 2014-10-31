describe('GroupsController', function(){
  // test variables
  var httpBackend, config, scope;

  beforeEach(function(){
    module('reminder');
    inject(function($injector, $controller, $rootScope, $httpBackend, Config){

      httpBackend  = $httpBackend
      config       = Config
      scope        = $rootScope.$new()
      FakeBase(scope)

      $controller('GroupsController', {
        '$scope': scope,
        'Group': $injector.get('Group')
      });

    });
  });

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  })

  it("populate scope with list of tasks", function(){
    httpBackend.whenGET(config.host + 'projects/1/groups').respond(200, [{id: 10, name: 'Channa'}]);
    scope.init();
    httpBackend.flush();

    expect_to_show_loading_indicator_for(scope)
    expect(scope.groups.length).toEqual(1);
    expect(scope.groups[0].id).toEqual(10)
    expect(scope.setLoading).toHaveBeenCalledWith(false);

  });

  describe("removeGroup", function() {
    beforeEach(function(){
      scope.groups = [
        {id: 1, name: 'name1'},
        {id: 2, name: 'name2'}
      ];
    })

    it("remove group from groups scope  if success", function(){
      httpBackend.whenDELETE(config.host + 'projects/1/groups/1').respond(200);
      scope.removeGroup({id: 1})
      httpBackend.flush();

      expect(scope.setLoading).toHaveBeenCalledWith(true)
      expect(scope.groups.length).toEqual(1);
      expect(scope.setFlashSuccess).toHaveBeenCalledWith("Group has been removed")
      expect(scope.redirectTo).toHaveBeenCalledWith('groups', { projectId : 1 } )
    });

    it("set error message to scope if failed", function(){
      httpBackend.whenDELETE(config.host + 'projects/1/groups/10').respond(401);
      scope.removeGroup({id: 10})
      httpBackend.flush();

      expect(scope.setLoading).toHaveBeenCalledWith(false);
      expect(scope.setFlashFailure).toHaveBeenCalledWith("Couldn't remove group");
    })
  });
});
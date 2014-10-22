describe('GroupsController', function(){
  // test variables
  var scope, httpBackend, faker = {}, config;

  beforeEach(function(){
    faker.groups = [];
  });

  beforeEach(function(){

    module('reminder');
    inject(function($controller, $rootScope, $injector){
      scope = $rootScope.$new();
      httpBackend  = $injector.get('$httpBackend');
      config       = $injector.get('Config');

      $controller('GroupsController', {
        '$scope': scope,
        'Group': $injector.get('Group'),
        '$state': $injector.get('$state')
      });

    });
  });

  it("populate scope with list of tasks", function(){
    httpBackend.whenGET(config.host + 'groups').respond(faker.groups);
    scope.init();
    
    httpBackend.flush();
    expect(scope.groups.length).toEqual(0);
  });
});
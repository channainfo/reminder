function FakeBase(scope){

  scope.params = function(key){
    var params = {groupId: 1, scheduleId: 1, projectId: 1}
    return params[key]
  }

  scope.setLoading = function(type){ }
  scope.setFlashFailure = function(msg) { }
  scope.setFlashSuccess = function(msg) { }
  scope.redirectTo = function(url) { }

  spyOn(scope, "setLoading");
  spyOn(scope, "setFlashFailure")
  spyOn(scope, "setFlashSuccess")
  spyOn(scope, "redirectTo")
}
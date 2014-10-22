reminder
  .controller("GroupController", 
	            ["$scope", "Group", "EntityManager", "$stateParams",
	            function($scope, Group, EntityManager, $stateParams){

	$scope.resetForm = function(){
		$scope.setDefaultData();
	}

	$scope.setDefaultData = function(){
		$scope.group = new Group({name: '', addresses: [], id: 0 });
		$scope.newAddress = "";
	}

	$scope.init = function() {
		$scope.setDefaultData();
		if(!$stateParams.groupId)
			return;
		$scope.fetchGroup();
	}

	$scope.fetchGroup = function() {
		Group.get({id: $stateParams.groupId}, function(group){
			$scope.group = group;
		}, function() {
			$scope.redirectTo("groups");
		})
	}

	$scope.save = function(){
		$scope.implicitNewAddress();
		$scope.setLoadingStatus(true);

		var successCallback = function(group){
			$scope.setLoadingStatus(false);
			$scope.setSuccess("Group has been saved");
			$scope.redirectTo("groups");
		}

		var errorCallback = function(){
			$scope.setLoadingStatus(false);
			$scope.setFailure("Couldn't save group");
		}

		entity = EntityManager.getEntityFor(Group);
		entity.save($scope.group, successCallback, errorCallback);
	}

	$scope.implicitNewAddress = function() {
		if($scope.newAddress != "")
			$scope.group.addresses.push($scope.newAddress);
	}

	$scope.addNewAddress = function() {
		if($scope.newAddress) {
			$scope.group.addresses.push($scope.newAddress);
			$scope.newAddress = "";
		}
	}

	$scope.removeAddress = function(index){
		$scope.group.addresses.splice(index, 1);
	}
}])
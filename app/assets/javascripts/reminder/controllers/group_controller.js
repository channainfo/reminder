reminder
  .controller("GroupController", 
	            ["$scope", "Group", "EntityManager",
	            function($scope, Group, EntityManager){


	$scope.setDefaultData = function(){
		$scope.group = new Group({id:0, project_id: $scope.params("projectId"), name: '', addresses: []});
		$scope.newAddress = "";
	}

	$scope.init = function() {
		$scope.setDefaultData();
		if(!$scope.params("groupId"))
			return;
		$scope.fetchGroup();
	}

	$scope.fetchGroup = function() {
		$scope.setLoading(true);
		Group.get({project_id: $scope.params("projectId"), id: $scope.params("groupId")}, function(group){
			$scope.group = group;
			$scope.setLoading(false)
		}, function() {
			$scope.setLoading(false)
			$scope.redirectTo("groups", {projectId: $scope.params("projectId")});
		})
	}

	$scope.save = function(){
		$scope.setLoading(true);

		var successCallback = function(group){
			$scope.setLoading(false);
			$scope.setFlashSuccess("Group has been saved");
			$scope.redirectTo("groups", {projectId: $scope.params("projectId")});
		}

		var errorCallback = function(){
			$scope.setLoading(false);
			$scope.setFlashFailure("Couldn't save group");
		}

		entity = EntityManager.getEntityFor(Group);
		entity.save($scope.group, successCallback, errorCallback);
	}

	$scope.addNewAddress = function() {
		if($scope.newAddress && $scope.isNewAddressValid()) {
			$scope.group.addresses.push($scope.newAddress);
			$scope.newAddress = "";
		}
	}

	$scope.removeAddress = function(index){
		$scope.group.addresses.splice(index, 1);
	}

	$scope.isValid = function() {
		return $scope.group.name;
	}

	$scope.isNewAddressValid = function(){
		if($scope.newAddress)
			return $scope.newAddress.isPhoneNumber() && $scope.isNewAddressAvailable()
		return true;
	}

	$scope.isNewAddressAvailable = function(){
		var found = $scope.group.addresses.hasElement($scope.newAddress, function(search, e){
				return search == e
		})
		return !found;
	}

}])
reminder
  .controller("GroupController", 
	            ["$scope", "Group", "EntityManager", "$stateParams", "$state",
	            function($scope, Group, EntityManager, $stateParams, $state){

	$scope.resetForm = function(){
		$scope.group = new Group({name: '', addresses: [] })
		$scope.newAddress = "";
	}
	$scope.resetForm();

	$scope.loadGroup = function() {
		$scope.fetchGroup();
	}

	$scope.fetchGroup = function() {
		if(!$stateParams.groupId) return;

		Group.get({id: $stateParams.groupId}, function(group){
			$scope.group = group;
		}, function() {
			$state.go("groups");
		})
	}

	$scope.save = function(){
		$scope.implicitNewAddress();
		$scope.setLoadingStatus(true);

		EntityManager.getEntityFor(Group).save($scope.group)
			.$promise
			.then($scope.saveSuccess, $scope.saveFailed);
	}

	$scope.saveSuccess = function(group){
		$scope.setLoadingStatus(false);
	  $scope.groups.unshift(group);
	  $scope.resetForm();
	  $scope.setSuccess("Group has been saved");
	}

	$scope.saveFailed = function(){
		$scope.setLoadingStatus(false);
		$scope.setFailure("Couldn't save group");
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
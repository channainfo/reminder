reminder.controller("GroupNewController", ["$scope", "Group", function($scope, Group){
	$scope.resetForm = function(){
		$scope.group = new Group({name: '', addresses: []})
		$scope.newAddress = "";
	}
	$scope.resetForm();

	$scope.save = function(){
		$scope.implicitNewAddress();

		$scope.setLoadingStatus(true);
		
		Group.save({group: $scope.group}).$promise.then(
			function(group){
				$scope.setLoadingStatus(false);
			  $scope.groups.unshift(group);
			  $scope.resetForm();
			  $scope.setSuccess("Group has been created");
			},
		  function(error){
		  	$scope.setLoadingStatus(false);
				$scope.setFailure("Couldn't create group");
		  }
		);
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
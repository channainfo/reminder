reminder.controller("GroupNewController", ["$scope", "Group", function($scope, Group){
	$scope.name = "Group name";
	$scope.addresses = ["100","1001"];
	$scope.newAddress = "";

	$scope.save = function(){
		var data = $scope.prepareData();
		console.log("data", data);
		Group.save(data)
	}

	$scope.prepareData = function() {
		return {
			name: $scope.name,
			addresses: $scope.addresses
		}
	}

	$scope.addNewAddress = function() {
		if($scope.newAddress) {
			console.log("adding address")
			$scope.addresses.push($scope.newAddress);
			$scope.newAddress = "";
		}
		else{
			console.log("empty address")
		}
	}

	$scope.removeAddress = function(index){
		$scope.addresses.splice(index, 1);
	}

}])

reminder.factory("Config", ["$window", function($window){
	return {
		host: $window.config['host'],
    dateFormat: '%d/%m/%Y'
	}
}])
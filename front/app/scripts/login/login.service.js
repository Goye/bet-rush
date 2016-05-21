(function() {
	angular
		.module('prodigi.login')
		.factory('LoginFactory', LoginFactory);

	function LoginFactory($q,$window) {
		var getUserInfo = function() {
				var user = $window.localStorage.getItem('user');
				var isAuthenticate = false;
				if (user) {
						isAuthenticate = true;
				}
				return isAuthenticate;
		}
		var initUser = function() {
			var userInfo = getUserInfo();
      if (userInfo) {
        return $q.when(userInfo);
      } else {
        return $q.reject({ authenticated: false });
      }
		}
		return {
			initUser: initUser
		};
	}
}());

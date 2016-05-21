(function() {
  angular
  .module('prodigi.common')
  .factory('authInterceptor', authInterceptor);

  function authInterceptor($window) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.user) {
          var user = JSON.parse($window.localStorage.user);
          if (user) {
            config.headers.Authorization = 'Bearer ' + user.accessToken;
          }
        }
        return config;
      },
      response: function(response) {
        if (response.status == 401) {
          $window.location('/admin');
        }
        return response;
      }
    };
  }
}());

(function() {
  angular.module('betrush.common', ['ngResource'])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    }]);
}());

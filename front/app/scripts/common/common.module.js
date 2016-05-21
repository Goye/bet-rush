(function() {
  angular.module('prodigi.common', ['ngResource'])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    }]);
}());

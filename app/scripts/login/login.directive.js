(function() {
  angular
  .module('betrush.login')
  .directive('login', login);

  function login() {
    return {
      restrict: 'E',
      scope: {
      },
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/login.view.html',
      link: function postLink() {
      }
    };
  }
}());

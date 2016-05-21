(function() {
  angular
  .module('prodigi.header')
  .directive('header', header);

  function header() {
    return {
      restrict: 'E',
      scope: {},
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/header.view.html',
      replace: true,
      link: function(scope, attrs, element) {
      }
    };
  }
}());

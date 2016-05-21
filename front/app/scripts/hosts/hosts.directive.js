(function() {
  angular
  .module('prodigi.hosts')
  .directive('hosts', hosts);

  function hosts(parallaxFactory) {
    return {
      restrict: 'E',
      scope: {
        targetElement: '@'
      },
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/hosts.view.html',
      link: function postLink(scope) {
        var target = null;
        if (scope.targetElement) {
          target = document.getElementById(scope.targetElement);
          parallaxFactory.startParallax(target, {
            defaultPosition: 1000, delay: 0.3
          });
        }
      }
    };
  }
}());

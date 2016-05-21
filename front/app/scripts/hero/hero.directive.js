(function() {
  angular
  .module('prodigi.hero')
  .directive('hero', hero);

  function hero(parallaxFactory) {
    return {
      restrict: 'E',
      scope: {
        targetElement: '@',
        eventModel: '='
      },
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/hero.view.html',
      replace: true,
      link: function(scope, attrs, element) {
        var target = null;
        if (scope.targetElement) {
          target = document.getElementById(scope.targetElement);
          parallaxFactory.startParallax(target, {
              defaultPosition: 10, delay: 0.3
            });
        }
        scope.$watch('eventModel', function(value) {
          scope.vm.eventModel = value;
        });
      }
    };
  }
}());

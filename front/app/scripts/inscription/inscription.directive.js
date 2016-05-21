(function() {
  angular
  .module('prodigi.inscription')
  .directive('inscription', inscription);

  function inscription() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        eventModel: '='
      },
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/inscription.view.html',
      replace: true,
      link: function(scope, element, attrs) {
        scope.$watch('eventModel', function(value) {
          scope.vm.eventModel = value;
        });
      }
    };
  }

}());

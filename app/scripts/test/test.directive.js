(function() {
  angular
  .module('prodigi.test')
  .directive('test', test);

  function test() {
    return {
      restrict: 'E',
      scope: {
        modelTest: '='
      },
      templateUrl: '/views/test.view.html',
      link: function postLink(scope) {
        console.log('test directive', scope.modelTest);
      }
    };
  }
}());

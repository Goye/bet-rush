(function() {
  angular
  .module('prodigi.footer')
  .directive('footer', footer);

  function footer() {
    return {
      restrict: 'E',
      scope: {},
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/footer.view.html',
      replace: true,
      link: function(scope, attrs, element) {
      }
    };
  }
}());

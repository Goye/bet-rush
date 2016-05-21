(function() {
  angular
  .module('prodigi.about')
  .directive('about', about);

  function about() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/views/about-prodigious.view.html',
      replace: true,
      link: function(scope, attrs, element) {
      }
    };
  }
}());

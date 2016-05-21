(function() {
  angular
  .module('prodigi.contact')
  .directive('contact', contact);

  function contact(parallaxFactory) {
    return {
      restrict: 'E',
      scope: {
        targetElement: '@'
      },
      templateUrl: '/views/contact-us.view.html',
      replace: true,
      link: function(scope, attrs, element) {
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

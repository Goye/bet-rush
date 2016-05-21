(function() {
  angular
    .module('prodigi.common')
    .directive('scrollToElement', scrollToElement);

  function scrollToElement() {
    return {
      restrict: 'A',
      link: function(scope, $elm, attrs) {
        function scrollElement(event) {
          event.preventDefault();
          var top = $(attrs.href).offset().top;
          $('html, body').animate({scrollTop: top}, 1000);
        }
        $elm.on('click', scrollElement.bind(this));
      }
    };
  }
}());

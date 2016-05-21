(function() {
  angular
    .module('prodigi.footer')
    .factory('FooterFactory', FooterFactory);

  function FooterFactory() {
    return {
      'name': 'prodigi',
      'month': 'March'
    };
  }
}());

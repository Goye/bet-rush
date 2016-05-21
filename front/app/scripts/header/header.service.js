(function() {
  angular
    .module('prodigi.header')
    .factory('HeaderFactory', HeaderFactory);

  function HeaderFactory() {
    return {
      'name': 'prodigi',
      'month': 'March'
    };
  }
}());

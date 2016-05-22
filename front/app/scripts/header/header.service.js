(function() {
  angular
    .module('betrush.header')
    .factory('HeaderFactory', HeaderFactory);

  function HeaderFactory() {
    return {
      'name': 'prodigi',
      'month': 'March'
    };
  }
}());

(function() {
  angular
    .module('prodigi.test')
    .factory('TestFactory', TestFactory);

  function TestFactory() {
    return {
      'name': 'prodigi',
      'month': 'March'
    };
  }
}());

(function() {
  angular
    .module('prodigi.test')
    .controller('TestCtrl', TestCtrl);

  function TestCtrl(TestFactory) {
    var vm = this;
    vm.event = TestFactory;
    console.log('hola controller watch', vm.event);
  }
}());

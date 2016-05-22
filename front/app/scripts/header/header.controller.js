(function() {
  angular
  .module('betrush.header')
  .controller('HeaderCtrl', HeaderCtrl);

  function HeaderCtrl(HeaderFactory) {
    var vm = this;
    vm.event = HeaderFactory;
  }
}());

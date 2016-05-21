(function() {
  angular
    .module('prodigi.footer')
    .controller('FooterCtrl', FooterCtrl);

  function FooterCtrl(FooterFactory) {
    var vm = this;
    vm.event = FooterFactory;
  }
}());

(function() {
  angular
    .module('prodigi.hero')
    .controller('HeroCtrl', HeroCtrl);

  function HeroCtrl(HeroFactory) {
    var vm = this;
    vm.event = HeroFactory;
  }
}());

(function() {
  angular
    .module('betrush.lose')
    .controller('LoseBetCtrl', loseBetCtrl);

  function loseBetCtrl($scope, ResourceFactory, $window, $http, $timeout, $state) {
    var vm = this;
    vm.bet = {};
    vm.bet.category = 'cine';
    console.log('new bet');

    vm.goToFeed = function() {
      $state.go('/');
    };

    vm.sendBet = function(bet) {
      console.log('new bet', bet);
      $http.post('/api/new/event', bet)
        .success(function(res) {
          console.log('success res', res)
          vm.goToFeed();
        })
        .error(function(error) {
          console.log('error', error)
        })
    };
  }
}());

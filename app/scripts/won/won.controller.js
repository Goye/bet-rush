(function() {
  angular
    .module('betrush.won')
    .controller('WonBetCtrl', wonBetCtrl);

  function wonBetCtrl($scope, ResourceFactory, $window, $http, $timeout, $state) {
    var vm = this;
    vm.bet = {};
    vm.bet.category = 'cine';
    vm.count = {};
    vm.event = ResourceFactory.rest('/api/get/events');
    console.log('new bet');
    getCards();

    vm.goToFeed = function() {
      $state.go('/');
    };

    function getCards() {
      vm.event.get({}, function(res){
        console.log(res);
        vm.count = res.count;
      });
    }

    vm.newBet = function() {
      $state.go('newBet');
    }

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

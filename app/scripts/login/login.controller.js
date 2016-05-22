(function() {
  angular
    .module('betrush.login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, ResourceFactory, $window, $http, $timeout, $state) {
    var vm = this;
    vm.data = [];
    vm.event = ResourceFactory.rest('/api/get/events');
    getCards();

    function checkTime() {
      console.log('check')
      $timeout(function(){
        vm.data = [];
        getCards();
      }, 10000);
    }
    function getCards() {
      vm.event.query({}, function(data){
        console.log(data);
        vm.data = data;
        checkTime();
      });
    }

    vm.newBet = function() {
      $state.go('newBet');
    }

    vm.add = function(card) {
      card.cant += 5
    }
    vm.minus = function(card) {
      if(card.cant !== 0) {
        card.cant -= 5
      }
    }
    vm.closeCard = function(card) {
      console.log('close')
      var pos = vm.data.indexOf(card);
      vm.data.splice(pos, 1);
    }

    vm.sendAnswer = function(card, option) {
      //value = cant, eventId, option
      console.log(card, option);
      var data = {
        value: card.cant,
        eventId: card._id,
        option: option
      }
      console.log('data', data)
      $http.post('/api/save/bet', data)
        .success(function(res) {
          console.log('success res', res)
          vm.closeCard(card);
        })
        .error(function(error) {
          console.log('error', error)
        })

    }
  }
}());

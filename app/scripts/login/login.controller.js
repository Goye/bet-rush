(function() {
  angular
    .module('betrush.login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, ResourceFactory, $window, $http) {
    var vm = this;
    vm.data = {};
    vm.event = ResourceFactory.rest('/api/get/events');
    vm.event.query({}, function(data){
      console.log(data);
      //vm.data = data;
    });
  }
}());

(function() {
  angular
    .module('prodigi.login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, ResourceFactory, $window, $http) {
    var vm = this;
    vm.data = {};
    vm.event = ResourceFactory.rest('/login');
    vm.login = function(){
      $http.get('localhost:8080/api/hola')
      .success(function(data) {
        console.log('hola')
      })
      .error(function() {
        console.log('error');
      })
    };
  }
}());

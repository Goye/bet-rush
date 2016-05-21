(function() {
  angular
    .module('prodigi.login')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, ResourceFactory, $window) {
    var vm = this;
    vm.data = {};
    vm.event = ResourceFactory.rest('/login');
    vm.login = function(){
      vm.errorMessage = '';
      vm.event.save(vm.data, function(res){
        $window.localStorage.setItem('user', JSON.stringify(res));
        $window.location = '/admin/events';
      },function(err){
        $window.localStorage.removeItem('user');
        vm.errorMessage = err.data.message;
      });
    };
  }
}());

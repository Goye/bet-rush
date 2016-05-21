(function() {
  angular
  .module('prodigi.inscription')
  .controller('InscriptionCtrl', InscriptionCtrl);

  function InscriptionCtrl(ResourceFactory, ngDialog) {
    var vm = this;
    vm.collapse= true;
    vm.data = {
      knowledges: []
    };
    vm.eventModel = {
      id: 0
    };
    vm.showRequirments = function() {
      ngDialog.open({
        template: '/views/requirements.view.html',
        showClose: false,
        className: 'ngdialog-theme-default ngdialog-small'
      });
    };
    vm.event = ResourceFactory.rest('/api/admin/inscription', vm.data._id);
    vm.sendData = function(inscriptionForm) {
      if (inscriptionForm.$valid) {
        vm.eventModel.inscriptions.push(vm.data);
        vm.event.save(vm.data, function(response) {
          ngDialog.open({
            template: '/views/inscription.popup.view.html',
            showClose: false,
            className: 'ngdialog-theme-default ngdialog-small'
          });
          vm.data = {
            knowledges: []
          };
        }, function(error) {
          console.error('error', error);
        });
      }
    };

    vm.toggleSelection = function(knowledge) {
      var index = vm.data.knowledges.indexOf(knowledge);
      if (index == -1) {
        vm.data.knowledges.push(knowledge);
      } else {
        vm.data.knowledges.splice(index, 1);
      }
    };
  }
}());

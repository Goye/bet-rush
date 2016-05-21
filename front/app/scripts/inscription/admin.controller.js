(function() {
  angular
  .module('prodigi.event')
  .controller('InscriptionAdminCtrl', InscriptionAdminCtrl);

  function InscriptionAdminCtrl(ResourceFactory, ngDialog, $stateParams, ngTableParams, HostsFactory) {
    var vm = this;
    vm.data = {
      _id: $stateParams.id
    };

    vm.busy = {
      delay: 0,
      minDuration: 0,
      message: 'Por favor espere...',
      backdrop: true,
      promise: null
    };

    vm.event = ResourceFactory.rest('/api/admin/inscription/:id', vm.data._id);

    if (vm.data._id) {
      vm.event.get({id:vm.data._id}, function(response){
        vm.data = response;
        // vm.data.startDate = new Date(response.startDate);
        // vm.data.endDate = new Date(response.endDate);
      });
    }

    vm.getListEvents = function() {
      vm.tableParams = new ngTableParams({
        sorting: {
          updateAt: 'desc'
        }
      }, {
        filterDelay: 500,
        counts: [],
        getData: function($defer, params) {
          var options = extend({
            sort: params.orderBy(),
            select: '_id name lastname idNumber age phone email eps university preGrade knowledges createdAt'
          }, params.filter());
          vm.busy.promise = vm.event.query(options,
            function(data) {
              $defer.resolve(data);
            }
          );
        }
      });
    };

    function extend(obj1, obj2) {
      for(key in obj2)
        if (obj2[key])
          obj1[key] = obj2[key];
      return obj1;
    }
  }
}());

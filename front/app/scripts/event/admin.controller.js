(function() {
  angular
  .module('prodigi.event')
  .controller('EventAdminCtrl', EventAdminCtrl);

  function EventAdminCtrl(ResourceFactory, ngDialog, $stateParams, ngTableParams) {
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

    vm.event = ResourceFactory.rest('/api/admin/event/:id', vm.data._id);

    if (vm.data._id) {
      vm.event.get({id:vm.data._id}, function(response){
        vm.data = response;
        vm.data.startDate = new Date(response.startDate);
        vm.data.endDate = new Date(response.endDate);
      });
    }

    vm.sendEvent = function(form){
      vm.data.updateAt = Date.now();
      if (vm.data._id) {
        vm.event.update({id:vm.data._id}, vm.data, function(response) {
          ngDialog.open({
            template: '<div class="alert"><p>Los datos se han actualizado exitosamente</p></div>',
            plain: true,
            controller: ['$window', '$timeout', function($window, $timeout) {
              $timeout(function(){
                $window.location = '/admin/events';
              },1000);
            }]
          });
        }, function(error) {
          console.error('error', error);
        });
      } else {
        vm.event.save(vm.data, function(response) {
          ngDialog.open({
            template: '<div class="alert"><p>Los datos se han guardado exitosamente</p></div>',
            plain: true,
            controller: ['$window', '$timeout', function($window, $timeout) {
              $timeout(function(){
                $window.location = '/admin/events';
              },1000);
            }]
          });
        }, function(error) {
          console.error('error', error);
        });
      }
    };

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
            select: '_id name startDate endDate active createdAt updateAt'
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

    vm.remove = function(_id) {
      ngDialog.open({
        template: '<div class="clearfix"><p>¿Esta seguro que desea eliminar este elemento?</p>'+
        '<div class="col-md-3 col-sm-3 col-md-offset-3 col-sm-offset-3">'+
          '<button class="btn btn-default" ng-click="closeThisDialog()">Cancelar</button>'+
        '</div>'+
        '<div class="col-md-3 col-sm-3">'+
          '<button class="btn btn-danger" ng-click="delete()">Aceptar</button>'+
        '</div></div>',
        plain: true,
        controller: ['$window', '$scope', function($window, $scope) {
          $scope.delete = function(){
            vm.event.delete({id:_id}, function(response){
              $scope.closeThisDialog();
              vm.tableParams.reload();
            });
          };
        }]
      });
    };
  }
}());
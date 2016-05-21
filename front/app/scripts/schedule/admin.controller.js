(function() {
  angular
  .module('prodigi.event')
  .controller('ScheduleAdminCtrl', ScheduleAdminCtrl);

  function ScheduleAdminCtrl($stateParams, $state, ngDialog, ngTableParams, ResourceFactory) {
    
    var vm = this;

    vm.data = {
      _id: $stateParams.idEvent,
      activities: []
    };

    vm.activity = {
      _id: $stateParams.id,
      hosts: []
    };

    vm.host = {};

    vm.busy = {
      delay: 0,
      minDuration: 0,
      message: 'Por favor espere...',
      backdrop: true,
      promise: null
    };

    vm.event = ResourceFactory.rest('/api/admin/event/:id', vm.data._id);

    vm.eventHost = ResourceFactory.rest('/api/admin/host');

    if ($state.current.name == 'expoActivity') {
      vm.tableHostParams = new ngTableParams({
        sorting: {
          updateAt: 'desc'
        }
      }, {
        filterDelay: 500,
        counts: [],
        getData: function($defer, params) {
          var options = {
            active: true,
            select: '_id name'
          };
          vm.eventHost.query(options, 
            function(response) {
              $defer.resolve(response);
            }
          );
        }
      });
    }

    vm.addHostToActivity = function(id, data) {
      var item = vm.data.activities.filter(function(item) {
        return item._id == vm.activity._id;
      })[0];
      if (data) {
        item.hosts.push(id);
      } else {
        for(var i = 0, l = item.hosts.length; i < l; i++){
          item.hosts.splice(item.hosts.indexOf(id), 1);  
        }
      }
      vm.event.update({id: vm.data._id}, vm.data, function(response){
        ngDialog.open({
          template: '<div><p>Los datos se han guardado exitosamente</p></div>',
          plain: true,
          controller: ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
            $timeout(function() {
                 $scope.closeThisDialog();
            }, 1500);
          }]
        });
      });
    }

    if (vm.activity._id) {
      vm.event.query({
        "activities._id": vm.activity._id
      }, function(response) {
        vm.data = response[0];
        vm.activity = response[0].activities.filter(function(item){
          return item._id == vm.activity._id;
        })[0];
        vm.activity.activityDate = new Date(vm.activity.activityDate);
        vm.activity.startTime = new Date(vm.activity.startTime);
        vm.activity.endTime = new Date(vm.activity.endTime);
      });
    } else {
      vm.event.get({id:vm.data._id}, function(response){
        vm.data = response;
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
            _id: vm.data._id,
            sort: params.orderBy(),
            select: '_id name activities'
          }, params.filter());
          vm.busy.promise = vm.event.query(options,
            function(data) {
              vm.data = data[0];
              $defer.resolve(vm.data.activities);
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

    vm.sendEvent = function(){
      vm.activity.updateAt = Date.now();
      if (vm.activity._id) {
        var item = vm.data.activities.filter(function(item){
          return item._id == vm.activity._id;
        })[0];
        item = vm.activity;
      } else {
        vm.data.activities.push(vm.activity);
      }
      vm.event.update({id:vm.data._id}, vm.data, function(response) {
          ngDialog.open({
            template: '<div><p>Los datos se han guardado exitosamente</p></div>',
            plain: true,
            controller: ['$window', '$timeout', function($window, $timeout) {
              $timeout(function() {
                $window.location = '/admin/activities/' + vm.data._id;
              }, 1000);
            }]
          });
      });
    }

  }
}());
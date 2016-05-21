(function() {
  angular
  .module('prodigi.event')
  .controller('EventCtrl', EventCtrl);

  function EventCtrl($q, ResourceFactory, ngDialog, ngTableParams) {
    var vm = this;
    vm.data = {};

    var params = {
      'sort': '-updateAt',
      'limit': 1
    };

    vm.event = ResourceFactory.rest('/api/event/:param', {id: vm.data.param});

    vm.eventHost = ResourceFactory.rest('/api/admin/host');

    var hostIds = [];

    vm.startEventLanding = function() {
      params.active = true;
      getEvents().then(function(data) {
        var events = data[0];
        if (events && events.activities) {
          hostIds = events.activities.reduce(function(a, b) {
            b.hosts.forEach(function(host) {
              if (a.indexOf(host) == -1) {
                a.push(host);
              }
            });
            return a;
          }, []);
          if (hostIds.length) {
            vm.eventHost.query({
              '_id__in': hostIds.join(','),
              'active': true,
              'select': "_id name"
            }, function(response) {
              if(response && response.length) {
                events.activities.forEach(function(activity, index) {
                  activity.hosts = activity.hosts.map(function(hostId, index) {
                    return response.filter(function(hostObject){
                      return hostObject._id == hostId;
                    })[0];
                  });
                });
              }
            });
          }
          vm.data = events;
        }
      });
    };

    function getEvents() {
      var deferred = $q.defer();
      vm.event.query(params, function(response) {
        if (response.length) {
          deferred.resolve(response);
        }
      }, function(error) {
          console.error('error', error);
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }

  }
}());

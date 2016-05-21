(function() {
  angular
  .module('prodigi.schedule')
  .directive('schedule', schedule);

  function schedule() {
    return {
      restrict: 'E',
      scope: {
        eventModel: '='
      },
      controller: '@',
      name: 'controllerName',
      templateUrl: '/views/schedule.view.html',
      link: function postLink(scope) {
        scope.$watch('eventModel', function(value) {
          var eventModel = value;
          if (eventModel && eventModel.activities) {
            var activities = eventModel.activities;
            var days = activities.reduce(function(a, b) {
              if(a.indexOf(b.activityDate) == -1 && b.active)
                a.push(b.activityDate);
              return a;
            }, []);
            days.forEach(function(day) {
              scope.vm.schedule.push({
                dia: day,
                events: activities.filter(function(activity) {
                  return activity.activityDate == day;
                })
              });
            });
            scope.vm.startConfig();
          }
        });
      }
    };
  }
}());

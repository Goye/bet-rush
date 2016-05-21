(function() {
  angular.module('prodigi.event', ['prodigi.common'])
    .filter('customFormatDate', function($filter) {
      var dateFilter = $filter('date');
      return function(date, format) {
        if (date) {
          var localDate = new Date(date);
          var localTime = localDate.getTime();
          var localOffset = localDate.getTimezoneOffset() * 60000;
          date = new Date(localTime + localOffset);
          return dateFilter(date, format);
        }
        return '';
      };
    })
    .filter('dateMoment', function($filter){
      var momentFilter = $filter('date');
      return function(date, format) {
        var momentDate = moment(date).format(format);
        return momentFilter(momentDate, format);
      };
    });
}());

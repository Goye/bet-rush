(function() {
  angular
    .module('prodigi.hosts')
    .factory('HostsFactory', HostsFactory);

  function HostsFactory($http) {
    return {
      uploadImage: function(url, photo) {
        var fd = new FormData();
        fd.append("filename", photo);
        console.log('photo', photo)
        return $http.post(url, fd, {
          withCredentials: false,
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
        });
      }
    };
  }
}());

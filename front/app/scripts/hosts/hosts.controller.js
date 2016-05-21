(function() {
  angular
    .module('prodigi.hosts')
    .controller('HostsCtrl', HostsCtrl);

  function HostsCtrl($scope, ngDialog, ResourceFactory) {
    var vm = this;
    vm.data = {};
    vm.event = ResourceFactory.rest('/api/host/:id', {
      id: vm.data._id
    });

    vm.event.query({
      active: true
    }, function(response) {
      vm.data = response;
      //====================================
      // Slick 3
      //====================================
      $scope.slickConfigLoaded = true;
      $scope.slickConfig = {
        method: {},
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        easing: 'swing',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    });

    $scope.showModal = function(model) {
      console.log('show modal');
      ngDialog.open({
        template: '/views/host.popup.view.html',
        className: 'ngdialog-theme-default ngdialog-big',
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.host = model;
        }]
      });
    };
  }
}());

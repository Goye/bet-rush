(function() {
  angular.module('betrush', [
    'betrush.header',
    'betrush.login',
    'betrush.bet',
    'betrush.won',
    'betrush.lose',
    'ui.router',
    'textAngular'
  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $stateProvider

        .state('/', {
          url: '/',
          views: {
            content: {
              templateUrl: '/views/partials/login.view.html',
              controller: 'LoginCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('newBet', {
          url: '/newBet',
          views: {
            content: {
              templateUrl: '/views/partials/newbet.view.html',
              controller: 'NewBetCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('wonBet', {
          url: '/wonBet',
          views: {
            content: {
              templateUrl: '/views/partials/won.view.html',
              controller: 'WonBetCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('loseBet', {
          url: '/loseBet',
          views: {
            content: {
              templateUrl: '/views/partials/lose.view.html',
              controller: 'LoseBetCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('events', {
          url: '/admin/events',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/event/list.view.html',
              controller: 'EventAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('addEvent', {
          url: '/admin/events/add',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/event/add.view.html',
              controller: 'EventAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('editEvent', {
          url: '/admin/events/:id',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/event/add.view.html',
              controller: 'EventAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('hosts', {
          url: '/admin/hosts',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/host/list.view.html',
              controller: 'HostAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('addHost', {
          url: '/admin/hosts/add',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/host/add.view.html',
              controller: 'HostAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('editHost', {
          url: '/admin/hosts/:id',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/host/add.view.html',
              controller: 'HostAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('activities', {
          url: '/admin/activities/:idEvent',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/activity/list.view.html',
              controller: 'ScheduleAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('addActivity', {
          url: '/admin/activity/:idEvent/add',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/activity/add.view.html',
              controller: 'ScheduleAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('editActivity', {
          url: '/admin/activity/:idEvent/edit/:id',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/activity/add.view.html',
              controller: 'ScheduleAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('expoActivity', {
          url: '/admin/activity/:idEvent/hosts/:id',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/activity/addHostToActivity.view.html',
              controller: 'ScheduleAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        })
        .state('inscriptions', {
          url: '/admin/inscriptions',
          views: {
            nav: {
              templateUrl: '/views/admin/partials/nav.html'
            },
            content: {
              templateUrl: '/views/admin/inscription/list.view.html',
              controller: 'InscriptionAdminCtrl',
              controllerAs: 'vm',
              resolve: {
                auth: ["LoginFactory", function(LoginFactory){
                  return LoginFactory.initUser();
                }]
              }
            }
          }
        });
    }]).config(['$provide', function($provide){
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['$delegate', function(taOptions){
        	taOptions.toolbar = [
			      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'quote'],
			      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
			      ['html','insertLink', 'wordcount', 'charcount']
				  ];
				  return taOptions;
        }]);
    }])
  	.run(['$rootScope', '$state', '$stateParams', '$location',
      function($rootScope, $state, $stateParams, $location) {
        $rootScope.$on('$stateChangeStart',
          function(event, toState, toStateParams) {
            //console.log('state change', toState, toStateParams);
          }
        );
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
          if (error.authenticated === false) {
            $state.go('admin');
          }
        });
      }
    ]);
}());

(function() {
    'use strict';

  angular
    .module('rateApp.rate-people-list',[
    ]);
})();

(function() {
    'use strict';

  angular.module('rateApp.rate-people-list')
    .controller('RatePeopleController', RatePeopleController);

  RatePeopleController.$inject = ['$scope', '$timeout', 'PeopleService', 'DataService', 'RateAssets'];
  
  function RatePeopleController($scope, $timeout, peopleService, dataService, RateAssetsProvider) {
    var vm = this;
    vm.people = [];
    vm.getBackContentImg = getBackContentImg;

    activate();

    function getBackContentImg() {
      return RateAssetsProvider.assets.ASSETS_IMG + '/rating-stars.png';
    }

    function activate() {
      $timeout(function() {
        $scope.$emit('startLoading', 'RatePeopleController');
      }, 1);
      return peopleService.getPeople().then(function(dataPeople){
        vm.people = dataPeople;
        if(!vm.people || vm.people.length === 0){
          return dataService.getData(RateAssetsProvider.assets.ASSETS_DATA + '/personajes.json').then(function(data){
              vm.people = data;
              $scope.$emit('endLoading', 'RatePeopleController');
              return vm.people;
          });
        } else {
          $scope.$emit('endLoading', 'RatePeopleController');
          return vm.people;
        }
      });
    }

  }
})();

(function() {
    'use strict';

  angular.module('rateApp.rate-people-list')
      .directive('ratePeople', RatePeople);

  function RatePeople() {
      return {
          restrict: 'E',
          controller: 'RatePeopleController',
          controllerAs: 'ratePeopleCtrl',
          templateUrl: 'src/rate-people-list/rate-people.template.html'
      };
  }
})();

(function() {'use strict';angular.module('rateApp.rate-people-list').run(['$templateCache', function($templateCache) {$templateCache.put('src/rate-people-list/rate-people.template.html','<style>.m-b-lg {\r\n    margin-bottom: 45px !important;\r\n}\r\n\r\n.m-b-0 {\r\n    margin-bottom: 0 !important;\r\n}\r\n\r\n.panel-profile .panel-heading {\r\n    height: 150px;\r\n    background-size: cover;\r\n}\r\n\r\n.panel-profile-img {\r\n    max-width: 100px;\r\n    margin-top: -70px;\r\n    margin-bottom: 5px;\r\n    border: 3px solid #fff;\r\n    border-radius: 100%;\r\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.panel-profile .panel-title {\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.template-index h5 {\r\n    font-size: 17px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.m-b {\r\n    margin-bottom: 15px !important;\r\n}\r\n\r\n.btn-sm {\r\n    font-size: 12px;\r\n    padding: 5px 15px;\r\n}\r\n\r\n.panel {\r\n  height: inherit;\r\n}\r\n\r\n\r\n/* entire container, keeps perspective */\r\n\r\n.flip-container {\r\n    perspective: 1000px;\r\n}\r\n\r\n\r\n/* flip the pane when hovered */\r\n\r\n.flip-container:hover .flipper,\r\n.flip-container.hover .flipper {\r\n    transform: rotateY(180deg);\r\n}\r\n\r\n.flip-container,\r\n.front,\r\n.back {\r\n    width: 100%;\r\n    height: 320px;\r\n}\r\n\r\n\r\n/* flip speed goes here */\r\n\r\n.flipper {\r\n    transition: 0.6s;\r\n    transform-style: preserve-3d;\r\n    position: relative;\r\n}\r\n\r\n\r\n/* hide back of pane during swap */\r\n\r\n.front,\r\n.back {\r\n    backface-visibility: hidden;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n\r\n/* front pane, placed above back */\r\n\r\n.front {\r\n    z-index: 2;\r\n    /* for firefox 31 */\r\n    transform: rotateY(0deg);\r\n}\r\n\r\n\r\n/* back, initially hidden pane */\r\n\r\n.back {\r\n    transform: rotateY(180deg);\r\n}\r\n\r\n.back > div {\r\n    background: rgba(0, 0, 0, 0.5);\r\n    height: 100%;\r\n    width: 100%;\r\n    opacity: 1;\r\n    -webkit-transition: ease-out .3s;\r\n    -moz-transition: ease-out .3s;\r\n    -o-transition: ease-out .3s;\r\n    transition: ease-out .3s;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.back > div > a {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n    -moz-transform: translate(-50%, -50%);\r\n    -ms-transform: translate(-50%, -50%);\r\n    -o-transform: translate(-50%, -50%);\r\n    transform: translate(-50%, -50%);\r\n    text-align: center;\r\n}\r\n\r\n.back > img{\r\n  width: 100%;\r\n  height:  100%;\r\n}\r\n\r\n.flip-container:hover .flipper,\r\n.flip-container.hover .flipper,\r\n.flip-container.flip .flipper {\r\n    transform: rotateY(180deg);\r\n}</style><div class="container"><div class="page-header"><h2>Personajes</h2></div><div class="col-md-4 m-b-lg" ng-repeat="person in ratePeopleCtrl.people"><div class="flip-container" ontouchstart="this.classList.toggle(\'hover\');"><div class="flipper"><div class="front"><!-- front content --><div class="panel panel-default panel-profile m-b-0"><div class="panel-heading" style="background-image: {{person.background}}"></div><div class="panel-body text-center"><img class="panel-profile-img" ng-src="{{person.profileImg}}"><h5 class="panel-title">{{person.nick}}</h5><p class="m-b">{{person.job}}</p></div></div></div><div class="back"><!-- back content --> <img ng-src="{{ratePeopleCtrl.getBackContentImg()}}"><div><a href="#/person/{{person._id}}" class="btn btn-primary btn-sm m-b">Valoraciones \xBB</a></div></div></div></div></div></div>');}]);})();
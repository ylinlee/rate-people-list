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

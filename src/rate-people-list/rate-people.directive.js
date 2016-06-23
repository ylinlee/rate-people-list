(function() {
    'use strict';

  angular.module('rateApp.rate-people.list')
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

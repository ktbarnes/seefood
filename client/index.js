angular.module('SeeFood',[])
.controller('SeeFoodController', function($scope, Food) {
  $scope.foods = [];
  $scope.newFood = '';

  $scope.addFood = function() {
    Food.addFood($scope.newFood).then(function(resp) {
      if(resp) $scope.foods.push(resp);
      $scope.newFood = '';
    });
  }

  $scope.removeFood = function(index) {
    $scope.foods.splice(index, 1)
  }
  
})
.factory('Food', function($http) {
  return {
    addFood: function(food) {
      return $http({
        url: '/',
        method: 'POST',
        data: {food: food}
      })
      .then (function(resp) {
        return resp;
      })
      .catch(function(err) {
        console.error(err);
      });
    }
  }
});
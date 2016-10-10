angular.module('SeeFood',[])
.controller('SeeFoodController', function($scope, Food) {
  $scope.foods = [];
  $scope.newFood = '';

  $scope.addFood = function() {
    // console.log('what up inside $scope.addFood')
    Food.addFood($scope.newFood)
    .then(function(resp) {
      // console.log('inside Food.addFood');
      if(resp) {
        // console.log('hello',resp);
        $scope.foods.push(resp);
      } 
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
        // console.log('Have resp', resp.data.common[0])
        return {name: resp.data.common[0].food_name ,url: resp.data.common[0].photo.thumb};
      })
      .catch(function(err) {
        console.error(err);
      });
    }
  }
});
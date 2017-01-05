angular.module('SeeFood', ['ngRoute'])
.config(function($routeProvider) {
  //setting up the routing between the add and diary views with redirect to the add view
  $routeProvider
  .when('/add', {
    templateUrl: 'views/add.html',
    controller: 'SeeFoodController'
  })
  .when('/diary', {
    templateUrl: 'views/diary.html',
    controller: 'SeeFoodController'
  })
  .otherwise({
    redirectTo:'/add'
  });

})
.controller('SeeFoodController', function($scope, Food) {

  $scope.added = '';
  $scope.foods = [];
  $scope.newFood = '';
  $scope.entries = [];

  $scope.getDiary = function() {
    Food.getDiary()
    .then(function(resp) {
      if(resp) {
        $scope.entries = [];
        resp.forEach(function(item) {
          $scope.entries.push(item));
        }
      }
    });
  }

  $scope.getDiary();

  $scope.addFood = function() {
    Food.addFood($scope.newFood)
    .then(function(resp) {  
      if(resp) {
        $scope.foods = [].concat(resp);
        $scope.added = 'Select food to add to diary!'
      } 
      $scope.newFood = '';
    });
  }

  $scope.addToDiary = function(index) {
    $scope.entries.push($scope.foods[index]);
    Food.addEntry($scope.foods[index]);
    $scope.foods = [];
    $scope.added = 'Added to diary! View Diary to see details';
  }

  $scope.removeFromDiary = function(index) {
    Food.removeEntry($scope.entries[index]);
    $scope.entries.splice(index, 1)
  }

})
.factory('Food', function($http) {

  var addFood = function(food) {
    return $http({
      url: '/',
      method: 'POST',
      data: {
        food: food
      }
    })
    .then (function(resp) {
      return resp.data.common.map(function(item) {
        return {
          name: item.food_name, 
          url: item.photo.thumb
        }
      });
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  var getDiary = function() {
    return $http({
      url: '/diary',
      method: 'GET'
    })
    .then(function(resp) {
      return resp.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  var addEntry = function(entry) {
    return $http({
      url: '/diary',
      method: 'POST',
      data: entry
    });
  }

  var removeEntry = function(entry) {
    return $http({
      url: '/diary/:' + entry._id,
      method: 'DELETE'
    });
  }

  return {
    addFood: addFood,
    getDiary: getDiary,
    addEntry: addEntry,
    removeEntry: removeEntry
  }

});
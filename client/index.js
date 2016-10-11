angular.module('SeeFood',['ngRoute'])
.config(function($routeProvider) {
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
  })
})
.controller('SeeFoodController', function($scope, Food) {
  $scope.foods = [];
  $scope.newFood = '';
  // $scope.entries = $scope.entries || [];
  $scope.entries = [];
  // console.log('line 20 +++++++ SeeFoodController',$scope.entries);
  $scope.getDiary = function() {
    Food.getDiary()
    .then(function(resp) {
      if(resp) {
        $scope.entries = [];
        // console.log("line 26 ++++++ inside $scope.getDiary",resp);
        resp.forEach(item => $scope.entries.push(item));
        // console.log("line 28 ++++++ after assigning resp to $scope.entries",$scope.entries);
      }
    });
  }

  $scope.getDiary();

  $scope.addFood = function() {
    // console.log('what up inside $scope.addFood')
    Food.addFood($scope.newFood)
    .then(function(resp) {
      // console.log('inside Food.addFood');
      if(resp) {
        // console.log('hello',resp);
        $scope.foods = $scope.foods.concat(resp);
      } 
      $scope.newFood = '';
    });
  }

  $scope.addToDiary = function(index) {
    // console.log('addToDiary called');
    $scope.entries.push($scope.foods[index]);
    // console.log('Adding to diary',$scope.foods[index]);
    Food.addEntry($scope.foods[index]);
    $scope.foods = [];
  }

  $scope.removeFromDiary = function(index) {
    // console.log('line 43 +++++ removeFromDiary',$scope.entries[index]);
    Food.removeEntry($scope.entries[index]);
    $scope.entries.splice(index, 1)
  }

})
.factory('Food', function($http) {
  var addFood = function(food) {
    return $http({
      url: '/',
      method: 'POST',
      data: {food: food}
    })
    .then (function(resp) {
      // console.log('Have resp', resp.data.common[0])
      // Branded
      // var array = resp.data.branded.map(function(item){
      //   return {name: item.food_name, url: item.photo.thumb};
      // });
      var array = resp.data.common.map(function(item){
        return {name: item.food_name, url: item.photo.thumb};
      });
      console.log(array);
      // return {name: resp.data.common[0].food_name, url: resp.data.common[0].photo.thumb};
      return array;
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  var getDiary = function() {
    console.log('getting Diary');
    return $http({
      url: '/diary',
      method: 'GET'
    })
    .then(function(resp) {
      console.log('inside reponse of front end getDiary ++++++ index.js', resp.data);
      return resp.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  var addEntry = function(entry) {
    console.log('adding Entry');
    return $http({
      url: '/diary',
      method: 'POST',
      data: entry
    }).then(function(resp) {
      console.log("Entry Added")
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  var removeEntry = function(entry) {
    console.log('line 119 +++++++ removingEntry', entry);
    return $http({
      url: '/diary',
      method: 'PUT',
      data: entry
    }).then(function(resp) {
      console.log("Entry Deleted")
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  return {
    addFood: addFood,
    getDiary: getDiary,
    addEntry: addEntry,
    removeEntry: removeEntry
  }
});
angular
.module('SeeFood', ['ngRoute'])
.config(function($routeProvider) {

  // routing between the add and diary views with redirect to the add view
  $routeProvider
  .when('/add', {
    templateUrl: 'views/add.html',
    controller: 'AddController'
  })
  .when('/diary', {
    templateUrl: 'views/diary.html',
    controller: 'DiaryController'
  })
  .otherwise({
    redirectTo:'/add'
  });

})
.controller('AddController', function($scope, Food, Entries) {

  // Message that upon search prompts user to select a food item or after selection indicates food item was added to diary
  $scope.added = '';

  // Returned food items from search
  $scope.foods = [];

  // ng-model for the search form in the add view
  $scope.newFood = '';

  // Searches for food item via Nutritionix API and displays results for user selection
  $scope.addFood = function() {
    Food.searchFood($scope.newFood)
    .then(function(resp) {  
      if(resp) {
        $scope.foods = [].concat(resp);
        $scope.added = 'Select food to add to diary!';
      } 
      $scope.newFood = '';
    });
  }

  // Add food item as entry to cached diary (if loaded) and database
  $scope.addToDiary = function(index) {
    if (Entries.loadedDiary) Entries.cacheEntry($scope.foods[index]);
    Food.addEntry($scope.foods[index]);
    $scope.foods = [];
    $scope.added = 'Added to diary! View Diary to see details';
  }

})
.controller('DiaryController', function($scope, Food, Entries) {

  // Array of cached diary entries retrieved if diary has already been viewed
  if (Entries.loadedDiary()) {
    $scope.entries = Entries.cachedDiary();
  } else {
  // Retrieve diary entries if diary has not yet been viewed and cache each entry
    $scope.getDiary = function() {
      Food.getDiary()
      .then(function(resp) {
        if(resp) {
          $scope.entries = resp;
          Entries.viewDiary();
          $scope.entries.forEach(function(entry) {
            Entries.cacheEntry(entry);
          });
        }
      });
    }();
  }

  // Removes entry from diary when entry in diary is clicked
  $scope.removeFromDiary = function(index) {
    Food.removeEntry($scope.entries[index]);
    $scope.entries.splice(index, 1);
  }

})
.factory('Food', function($http) {
  // Factory to send AJAX calls to the server, which the communicates with the database and the Nutritionix API

  // AJAX call to search for food item via Nutritionix API and return a map of the name and url of image
  var searchFood = function(food) {
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

  // AJAX call to retrieve saved food entries from database and returns the array of data
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

  // AJAX call to add selected food to database
  var addEntry = function(entry) {
    return $http({
      url: '/diary',
      method: 'POST',
      data: entry
    });
  }

  // AJAX call to remove food item entry from database
  var removeEntry = function(entry) {
    return $http({
      url: '/diary/' + entry._id,
      method: 'DELETE'
    });
  }

  return {
    searchFood: searchFood,
    getDiary: getDiary,
    addEntry: addEntry,
    removeEntry: removeEntry
  }

})
.factory('Entries', function() {
  // Shared factory between add and diary views to maintain cache of diary entries so database in not queries every time view is changed to diary

  // Cached entries initialized to empty array
  var entries = [];

  // Flag for whether diary has been viewed and downloaded from database
  var loaded = false;

  // Set diary has been viewed to true
  var viewDiary = function() {
    loaded = true;
  }

  // Returns flag for whether diary has already been viewed
  var loadedDiary = function() {
    return loaded;
  }

  // Add entry to cached diary
  var cacheEntry = function(entry) {
    entries.push(entry);
  }

  // Returns the cached diary
  var cachedDiary = function() {
    return entries;
  }

  return {
    viewDiary: viewDiary,
    loadedDiary: loadedDiary,
    cacheEntry: cacheEntry,
    cachedDiary: cachedDiary
  }

});
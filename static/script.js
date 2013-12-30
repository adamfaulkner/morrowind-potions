angular.module('main', [])
  .controller('indexController', function($scope, $http) {
    function get_ingredients() {
      $http.get('/ingredients')
        .success(function(data) {
          $scope.availableIngredients = data;
        });
    }

    $scope.change = function() {
      $http.get('/api', {params: {
        ingredients: $scope.selectedIngredients
      }})
        .success(function(data) {
          $scope.availablePotions = data;
        });
    };

    get_ingredients();
  });

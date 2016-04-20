
//angular.module('MaryamScotchTodo', ['todoController', 'todoService']);
// //public/core.js

var MaryamScotchTodo = angular.module('MaryamScotchTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  //get and show all todos when first on page
  $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })

    .error(function(data){
      console.log('Error: ' + data);
    });

  //when submitting add form, send text to node API
  $scope.createTodo =  function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        //clear the form
        $scope.formData = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  //delete todo after checking it
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos' + id)
      .success(function(data){
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
}
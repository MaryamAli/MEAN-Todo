angular.module('todoController', [])
 
 .controller('mainController', function($scope, $http){
  $scope.formData = {};

  $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        $scope.formData = {}; //clears form
        $scope.todos = data;
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos' + id)
      .success(function(data){
        $scope.todos = data;
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
 });


//   .controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos){
//     $scope.formData = {};
//     $scope.loading = true;

//     // GET all todos
//     Todos.get()
//       .success(function(data){
//         $scope.todos = data;
//         $scope.loading = false;
//       });

//     // CREATE send to node API
//     $scope.createTodo =  function() {
//       //make sure form isn't empty
//       if($scope.formData.text != undefined){
//         $scope.loading = true;

//         //create function called from service
//         Todos.create($scope.formData)
//           //if successful, get all new todos
//           .success(function(data){
//             $scope.loading =  false;
//             $scope.formData = {}; //clear from
//             $scope.todos = data;
//           });
//       }
//     };

//     //Delete
//     $scope.deleteTodo = function(id) {
//       $scope.loading = true;

//       Todos.delete(id)
//         .success(function(data){
//           $scope.loading = false;
//           $scope.todos = data;
//         });
//     };

//   }]);
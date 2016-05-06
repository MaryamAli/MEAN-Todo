angular.module('todoController', [])
 
 .controller('mainController', function($scope, $http, Todos){
  $scope.formData = {};
  //GET

  Todos.get()
    .success(function(data){
      $scope.todos = data;
    });

  //CREATE
  $scope.createTodo = function() {
    if($scope.formData.text != undefined){
      Todos.create($scope.formData)
      //if successful
      .success(function(data){
        $scope.formData = {}; //clears form
        $scope.todos = data;
      });
    }
  };

  //DELETE
  $scope.deleteTodo = function(id){
    Todos.delete(id)
      //call all new todos
      .success(function(data){
        $scope.todos = data;
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
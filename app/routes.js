var Todo = require('./models/todo');

// function getTodos(res){
//   Todo.find(function(err, todos){
//     if (err){
//       res.send(err);
//     }
//     res.json(todos);
//   });
// };

// module.exports = function (app){
//   //api

//   app.get('/api/todos', function (req, res){
//     getTodos(res);
//   });
//   app.post
// }

module.exports = function(app) {
  //api
  app.get('/api/todos', function (req, res){
    //use mongoose to get all todos
    Todo.find(function(err, todos) {
      if (err)
          res.send(err)
        res.json(todos);

    });
  });
  //create todos and send back all after creating
  app.post('/api/todos', function (req, res) {
    //create, info comes from AJAX request via angular
    Todo.create({
      text    : req.body.text,
      done    : false
    }, function(err, todo){
      if (err)
          res.send(err);
        //get and return all todos after one created
        Todo.find(function(err, todos){
          if (err)
            res.send(err)
          res.jason(todos);
        });
    });
  });
  //delete a todo
  app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
      _id   : req.params.todo_id
    }, function(err, todo){
      if (err)
        res.send(err);
      //get and return all todos after one deleted
      Todo.find(function(err, todos){
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  //application
  app.get('*', function(req, res){
    res.sendfile('./public/index.html');
  });

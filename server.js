// server.js

// set up

var express         = require('express');
var app             = express();

//mongodb
var mongoose        = require('mongoose');
//log requests to console
var morgan          = require('morgan');
//pull info from HTML(express4)
var bodyParser      = require('body-parser');
//simulate Delete and Put
var methodOverride  = require('method-override');



// var port            = process.env.PORT || 8080;
// var database        = require('./config/database');




//configuration

mongoose.connect('mongodb:node@mongo.onmodulus.net:27017/uw03mypu');
//sets static file location
app.use(express.static(__dirname + '/public'));
//logs every request to console
app.use(morgan('dev'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
//parse application/json
app.use(bodyParser.json());
//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());



var Todo  = mongoose.model('Todo', {
  text  : String
});


// routes
  //api
  // get all todos
// require('./app/routes.js')(app);
  app.get('/api/todos', function(req, res) {
    
    //use mongoose
    Todo.find(function(err, todos) {
      
      //if error, send the error
      if (err)
        res.send(err)

      res.json(todos);
    });
  });

  //create todo and send back all created todos
  app.post('/api/todos', function(req, res){

    //create todo, info from AJAX from angular
    Todo.create({
      text  : req.body.text,
      done  : false

    }, function(err, todo){
      if (err)
        res.send(err);

      //get and return all todos after each new one
      Todo.find(function(err, todos){
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  //delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo){
      if (err)
        res.send(err);

      //get and return all todos after each new one
      Todo.find(function(err, todos){
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  // //application
  // app.get('*', function(req, res){
  //   //load single file view
  //   res.sendFile('./public/index.html');
  // });

//start server.js

app.listen(8080);
console.log("App listening on port 8080");
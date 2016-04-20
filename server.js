// server.js

// set up

var express         = require('express');
var app             = express();

//mongodb
var mongoose        = require('mongoose');

//log requests to console
//var morgan          = require('morgan');
var port            = process.env.PORT || 8080;
var database        = require('./config/database');

//pull info from HTML POST
// var bodyParser      = require('body-parser');

//simulate Delete and Put
// var methodOverride  = require('method-override');

//configuration

mongoose.connect(database.url);

// app.use(express.static(__dirname + '/public'));


app.configure(function() {
    app.use(express.static(__dirname +'/public'));  
    app.use(express.logger('dev'));
    app.use(express.bodyParser());

    // app.use(morgan('dev'));
    // app.use(bodyParser.urlencoded({'extended':'true'}));
    // app.use(bodyParser.json());
    // app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(methodOverride());

});


// var Todo  = mongoose.model('Todo', {
//   text  : String
// });


// routes
  //api
  // get all todos
require('./app/routes.js')(app);
  // app.get('/api/todos', function(req, res) {
    
  //   //use mongoose
  //   Todo.find(function(err, todos) {
      
  //     //if error, send the error
  //     if (err)
  //       res.send(err)

  //     res.json(todos);
  //   });
  // });

  // //create todo and send back all created todos
  // app.post('/api/todos', function(req, res){

  //   //create todo, info from AJAX from angular
  //   Todo.create({
  //     text  : req.body.text,
  //     done  : false

  //   }, function(err, todo){
  //     if (err)
  //       res.send(err);

  //     //get and return all todos after each new one
  //     Todo.find(function(err, todos){
  //       if (err)
  //         res.send(err)
  //       res.json(todos);
  //     });
  //   });
  // });

  // //delete a todo
  // app.delete('/api/todos/:todo_id', function(req, res) {
  //   Todo.remove({
  //     _id : req.params.todo_id
  //   }, function(err, todo){
  //     if (err)
  //       res.send(err);

  //     //get and return all todos after each new one
  //     Todo.find(function(err, todos){
  //       if (err)
  //         res.send(err)
  //       res.json(todos);
  //     });
  //   });
  // });

  // //application
  // app.get('*', function(req, res){
  //   //load single file view
  //   res.sendFile('./public/index.html');
  // });

//start server.js

app.listen(port);
console.log("App listening on port" + port);
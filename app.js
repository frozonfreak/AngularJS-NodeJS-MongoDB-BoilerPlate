
//-----------------------------------------------------------------------------------------------
// Module dependencies.
//-----------------------------------------------------------------------------------------------

var express   = require('express')
  , routes    = require('./routes')
  , config    = require('./server/config')
  , DBtools   = require('./server/dbFunction')
  , module    = require('./server/modules')
  , http      = require('http')
  , fs        = require('fs')
  , os        = require('os').networkInterfaces()
  , MongoClient = require('mongodb').MongoClient
  , path      = require('path')
  , app       = express()
  , server    = http.createServer(app); 


//-----------------------------------------------------------------------------------------------
//Configurations
//-----------------------------------------------------------------------------------------------
app.configure(function(){
  app.use(express.favicon(__dirname + '/public/image/favicon.ico')); 
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.logger('dev'));
  app.use(express.methodOverride());

  //Used for passing parameters from Client to Server. 
  //All parameters are under req.body.<param name>
  app.use(express.bodyParser());  

  //Set up session variable
  app.use(express.cookieParser(config.sessionKey));

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure( 'development', function (){
  app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});
 
//app.configure( 'production', function (){
//  app.use( express.errorHandler());
//});

//-----------------------------------------------------------------------------------------------
// GET used only for page navigation
// Navigations routes
//-----------------------------------------------------------------------------------------------

//Basic routing
app.get('/', routes.index);

//Routing with parameters
//Access the params with req.params.param1/req.params.param2
//Example: http://servername/path/folder/file
app.get('/path/:param1/:param2', function(req, res, next){
  //Download Files using NodeJS
  module.fileDownload(req, res);
});

//-----------------------------------------------------------------------------------------------
// Web Service Calls
// All Interaction with Client and Server happen via POST JSON requests
//-----------------------------------------------------------------------------------------------

app.post('/services', function (req, res){
    console.log(req.body);
    switch(req.body.type)
    {
      case 'typeID':
        //Call function in module.js
        module.executeType(req,res);
      break;

    }
 });

// Start server
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


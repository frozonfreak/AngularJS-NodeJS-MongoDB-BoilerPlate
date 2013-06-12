
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
  app.use(express.cookieParser(config.sessionKey));

  
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure( 'development', function (){
  app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});
 
app.configure( 'production', function (){
  app.use( express.errorHandler());
});

//-----------------------------------------------------------------------------------------------
//Navigations routes
//-----------------------------------------------------------------------------------------------
app.get('/', routes.index);



//-----------------------------------------------------------------------------------------------
//Web Service
//-----------------------------------------------------------------------------------------------

app.post('/services', function (req, res){
    switch(req.body.type)
    {
      case 'type':
        module.executeType(req,res);
      break;

    }
 });

// Start server
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var MongoClient = require('mongodb').MongoClient
	, config    = require('./config')
	, DBtools   = require('./dbFunction')
	, routes    = require('../routes')
	, fs        = require('fs')

module.exports = {
	//A basic execution module
	//Calls modules from DB functions and retirn back error
	executeType:function(req, res){
		console.log(req.body.type);
		DBtools.executeType(req, res,function(err,result){
	        if(err){
	          console.log(err);
	          return;
	        }
	        res.contentType('json');
	        res.write(JSON.stringify("OutPut"));
   			res.end();
	
	    });
	},
	//Download a file 
	//- Check is file exists
	//- set path to file in server
	//- send download path to client
	//- .extension optional, depends on parameter received from client

	fileDownload: function(req, res){		
			fs.exists('folder/'+req.params.param1+'/'+req.params.param2+'.extension', function (exists) {
			  if(exists){
			      var file = req.params.fileName+'.extension'
			        , path =  '././files/'+req.params.param1+'/'+ file;
			      res.download(path);
			  }
			  else{
			    var result={
			                  "status": '0',
			                   "message": 'File Not Found' 
			              };
			              res.write(JSON.stringify(result));
			              res.end();
			  }
			 });
		}
};
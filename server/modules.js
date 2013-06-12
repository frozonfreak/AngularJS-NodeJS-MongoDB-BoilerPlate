var MongoClient = require('mongodb').MongoClient
	, config    = require('./config')
	, DBtools   = require('./dbFunction')
	, routes    = require('../routes')

module.exports = {
	executeType:function(req, res){
		console.log(req.body.type);
		console.log(req.body.ID);
		DBtools.executeType(req, res,function(err,result){
	        if(err){
	          console.log(err);
	          return;
	        }

	        res.contentType('json');
	        res.write(JSON.stringify(result));
   			res.end();
	
	    });
	}	
};
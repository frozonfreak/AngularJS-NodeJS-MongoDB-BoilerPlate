var MongoClient = require('mongodb').MongoClient
	, config    = require('./config');

module.exports = {
  
  executeType : function(req, res, callback){
     MongoClient.connect(config.mongoPath+config.dbName, function(err, db) {
       if(err){
        db.close();
         return callback(new Error("Unable to Connect to DB"));
       }
       var collection = db.collection(config.template);
       collection.find({'id':req.body.ID} , {'fieldname1' : 1, 'fieldname2' : 1}).nextObject(function(err, doc) {
         if(err){
           db.close();
           return callback(new Error("Error finding document in DB"));
         }  
             db.close();
             return callback(null,doc);
           });
     });
  }

};
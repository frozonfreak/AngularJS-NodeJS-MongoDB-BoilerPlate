var DBtools   = require('../server/dbFunction')	
  , config    = require('../server/config');
/*
 * GET home page.
 */
module.exports = {
	index: function(req, res){
	  	res.render('index');
	  }
};
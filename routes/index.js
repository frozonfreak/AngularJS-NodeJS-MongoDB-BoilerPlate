var express = require('express');
var router = express.Router();
var module1 = require('../server/module.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/services', function (req, res){
    console.log(req.body);
    switch(req.body.type)
    {
      case 'type':
        //Call function in module.js
        module1.executeType(req,res);
      break;

    }
 });

module.exports = router;


var express = require('express');
var router = express.Router();
var module1 = require('../server/module.js');

router.post('/services', function (req, res){
    console.log(req.body);
    switch(req.body.type)
    {
      case 'typeID':
        //Call function in module.js
        module1.executeType(req,res);
      break;

    }
 });

module.exports = router;


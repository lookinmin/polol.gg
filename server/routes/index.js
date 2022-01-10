var express = require('express');
var router = express.Router();
const TeamDB = require("../DataBase/TeamDB");

router.get('/', function(req,res){
  res.send({greeting : "hello"});
})

router.get('/db', function(req, res){
  res.send({Name : TeamDB.GetTeamName()});
})

module.exports = router;
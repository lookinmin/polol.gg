const tf = require('@tensorflow/tfjs');
var mysql = require('mysql2');
const port = require('../DataBase/port/SQLport');


var connection;
const sql = "REPLACE INTO `polol`.`team` (`predictrate`) VALUES (?);";
let isSuccess = "false";

const predictRank = async () => {
  connection = await mysql.createPool(
    port
  );
};


predictRank()
  .then(async () =>{




  })


 
  .finally(()=> {
    module.exports = { result: isSuccess }
  })
const tf = require('@tensorflow/tfjs');
var mysql = require('mysql2');
const port = require('../port/SQLport');

var connection;
const sql = "REPLACE INTO `polol`.`match` (`Lrate1`, `Rrate1`, `Lrate2`, `Rrate2`) VALUES (?, ?, ?, ?);";
let isSuccess = "false";

const precdictMain = async () => {
  connection = await mysql.createPool(
    port
  );
};

precdictMain()
  .then(async () =>{




  })


  .finally(()=> {
    module.exports = { result: isSuccess }
  })
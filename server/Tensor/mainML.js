const tf = require('@tensorflow/tfjs');
const dfd = require('danfojs-node');
var mysql = require('mysql2');
const port = require('../DataBase/port/SQLport');

var connection;
const sql = "REPLACE INTO `polol`.`match` (`Lrate1`, `Rrate1`, `Lrate2`, `Rrate2`) VALUES (?, ?, ?, ?);";
let isSuccess = "false";

const precdictMain = async () => {
  connection = await mysql.createPool(
    port
  );
};

precdictMain()
  dfd.readCSV('http://localhost:3002/data').then(function(data){
    console.log(data);
    data.print();
  })
    
  .finally(()=> {
    module.exports = { result: isSuccess }
  })
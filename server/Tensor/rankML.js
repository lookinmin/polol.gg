const tf = require('@tensorflow/tfjs');
var mysql = require('mysql2');
const port = require('../port/SQLport');

var connection;

const predictRank = async () => {
  connection = await mysql.createPool(
    port
  );
};


predictRank().then(async () =>{

})


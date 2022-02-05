const tf = require('@tensorflow/tfjs');
var mysql = require('mysql2');
const port = require('../port/SQLport');

var connection;

const precdictMain = async () => {
  connection = await mysql.createPool(
    port
  );
};

precdictMain().then(async () =>{

})
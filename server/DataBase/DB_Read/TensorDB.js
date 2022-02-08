"use strict"

var mysql = require('mysql2');
const port = require('../port/SQLport');
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();
var result = new Array();

class TensorDB{
  constructor(body){
    this.body = body;
  }
  
  async Get_DataInfo(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows1] = await promisePool.query('SELECT * FROM polol.week1 ORDER BY `date`, `match`');
    for(let i =0;i < rows1.length;i++){
      result1[i] = rows1[i];
    }

    const [rows2] = await promisePool.query('SELECT * FROM polol.week2 ORDER BY `date`, `match`');
    for(let i =0;i < rows2.length;i++){
      result2[i] = rows2[i];
    }

    const [rows3] = await promisePool.query('SELECT * FROM polol.week3 ORDER BY `date`, `match`');
    for(let i =0;i < rows3.length;i++){
      result3[i] = rows3[i];
    }

    result = result1.concat(result2, result3);

    promisePool.end();
    return result;
  }
}


module.exports = TensorDB;



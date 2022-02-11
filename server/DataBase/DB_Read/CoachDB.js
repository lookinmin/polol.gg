"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
var result = new Array();

class CoachDB{
  constructor(body){
    this.body = body;
  }
  
  async Get_CoachInfo(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM polol.coach');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    promisePool.end();
    return result;
  }
}
module.exports = CoachDB;



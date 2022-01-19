"use strict"

var mysql = require('mysql2');
const port = require('./port/SQLport');
var result = new Array();

class MatchDB{
  constructor(body){
    this.body = body;
  }

  async Get_MatchInfo(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM polol.match');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }

    promisePool.end();
    return result;
  }
}
module.exports = MatchDB;


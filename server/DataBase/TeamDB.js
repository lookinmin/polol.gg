"use strict"

var mysql = require('mysql2');
const port = require('./port/SQLport');
var result = new Array();

class TeamDB{
  constructor(body){
    this.body = body;
  }

  async Get_TeamInfo(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM polol.team');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }

    return result;
  }
}
module.exports = TeamDB;



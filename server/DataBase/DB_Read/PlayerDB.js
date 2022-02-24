"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
var result = new Array();

class PlayerDB{
  constructor(body){
    this.body = body;
  }

  async Get_PlayerInfo(target){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query(`SELECT * FROM stack.${target}_player ORDER BY Team`);
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    promisePool.end();
    return result;
  }
}
module.exports = PlayerDB;



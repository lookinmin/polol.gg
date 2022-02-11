"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
var result = new Array();

class PlayerDB{
  constructor(body){
    this.body = body;
  }

  async Get_PlayerInfo(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM polol.players ORDER BY team');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    promisePool.end();
    return result;
  }
}
module.exports = PlayerDB;



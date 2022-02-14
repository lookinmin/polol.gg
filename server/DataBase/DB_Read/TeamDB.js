"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
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

    const [rows] = await promisePool.query('SELECT * FROM polol.team ORDER BY `difference`');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    
    promisePool.end();
    return result;
    
  }


  async Get_TeamRank(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT `TeamName`, `rank` FROM polol.team ORDER BY `rank`');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    
    promisePool.end();
    return result;
  }



}
module.exports = TeamDB;



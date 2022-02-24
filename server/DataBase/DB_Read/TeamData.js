"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');

class TeamData{
  constructor(body){
    this.body = body;
  }

  async Get_TeamInfo(target){
    console.log('get_teaminfo');
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    let result = [];

    const [rows] = await promisePool.query(`SELECT * FROM stack.${target}_regular_team ORDER BY "Difference"`);
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    // console.log(result);
    
    promisePool.end();
    return result;
    
  }
}

module.exports = TeamData;
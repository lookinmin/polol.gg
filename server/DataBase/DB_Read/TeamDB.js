"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
var result = new Array();

class TeamDB{
  constructor(body){
    this.body = body;
  }

  async Get_TeamRank(){
    console.log('get_teamRank')
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT `TeamName`, `Rank` FROM stack.spring22_regular_team ORDER BY `Rank`');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    
    promisePool.end();
    return result;
  }

}
module.exports = TeamDB;



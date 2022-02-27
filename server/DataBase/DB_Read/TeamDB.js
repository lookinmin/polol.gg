"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
var result = new Array();
const Lowest = require('./lowest/DBName');

class TeamDB{
  constructor(body){
    this.body = body;
  }

  async Get_TeamRank(){
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    var ON = new Lowest();
    var BB = await ON.Submit();
    
    var num = BB.length-1;

    const sliceString =(e)=> {
      var First = e.split('_');
      var F_str = First[0];
      return F_str;
    }

    var target = sliceString(BB[num]);

    const [rows] = await promisePool.query('SELECT TeamName, `Rank`'+`FROM stack.${target}_regular_team ORDER BY `+'`Rank`');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }
    promisePool.end();
    return result;
  }

}
module.exports = TeamDB;



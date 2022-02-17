"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');


class PlayOffDB{
  constructor(body){
    this.body = body;
  }

  async Get_PlayOffInfo(){
    var date = new Array();
    var teams = new Array();
    var result = new Array();
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows1] = await promisePool.query('SELECT * FROM polol.playoff_match');
    for(let i =0;i < rows1.length;i++){
      date[i] = rows1[i];
    }

    const [rows2] = await promisePool.query('SELECT * FROM polol.playoff');
    for(let i =0;i < rows2.length;i++){
      teams[i] = rows2[i];
    }
    promisePool.end();

    result = date.concat(teams);
    return result;
  }
}
module.exports = PlayOffDB;



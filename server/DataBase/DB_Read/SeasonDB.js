"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');


class SeasonDB {
  constructor(body) {
    this.body = body;
  }

  async Get_SeasonInfo() {
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    var result = new Array();


    const [rows] = await promisePool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = "stack";');
    for(let i = 0;i < rows.length;i++){
      result[i] = (rows[i].TABLE_NAME).substring(0,16);
    }

    var final = new Array();

    for(let i = 0 ; i < result.length; i++){
      if(i%2 === 0){
        final.push(result[i]);
      }
    }
    promisePool.end();
    return final;
  }
}
module.exports = SeasonDB;


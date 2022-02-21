"use strict"

const mysql = require('mysql2');
const port = require('../port/pololPort');

class ChampionsDB{
  constructor(body){
    this.body = body;
  }

  async Get_ChampionsInfo(){
    const connection = await mysql.createPool(
      port
    );

    var result = [];
    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM polol.champions');
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }

    promisePool.end();
    return result;
  }
}
module.exports = ChampionsDB;


"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
const Lowest = require('./lowest/DBName');


var result = new Array();


class HistoryDB{
  constructor(body){
    this.body = body;
  }

  async Get_HistoryInfo(){
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


    const [rows] = await promisePool.query(`SELECT * FROM history.${target}`);
    for(let i =0;i < rows.length;i++){
      result[i] = rows[i];
    }

    promisePool.end();
    return result;
  }
}
module.exports = HistoryDB;


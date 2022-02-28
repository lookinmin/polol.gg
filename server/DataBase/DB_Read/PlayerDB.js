"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');


class PlayerDB {
  constructor(body) {
    this.body = body;
  }

  async Get_PlayerInfo(target) {
    var connection = await mysql.createPool(
      port
    );
    var result = new Array();
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(`SELECT * FROM stack.${target}_player`);
    for (let i = 0; i < rows.length; i++) {
      result[i] = rows[i];
    }
    if (target[target.length - 1] == "f") {
      for (let i = 0; i < rows.length; i++) {
        const sql = "SELECT `KoreaName`,`Team`,`Position`,`Birth`,`Main`,`Pic` FROM stack." + target.split("_")[0] + "_regular_player Where `Name`=?";
        const [ff] = await promisePool.query(sql, result[i].Name)
        if(ff[0]!=undefined){
          result[i].Team=ff[0].Team;
          result[i].KoreaName=ff[0].KoreaName;
          result[i].Position=ff[0].Position;
          result[i].Birth=ff[0].Birth;
          result[i].Main=ff[0].Main;
          result[i].Pic=ff[0].Pic;
        }
      }
    }


    promisePool.end();
    return result;
  }
}
module.exports = PlayerDB;

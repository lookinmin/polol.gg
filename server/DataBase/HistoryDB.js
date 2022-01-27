"use strict"

var mysql = require('mysql2');
const port = require('./port/SQLport');
const axios = require("axios");
const cheerio = require("cheerio");

var result = new Array();


class HistoryDB {
  constructor(body) {
    this.body = body;
  }


  async Get_HistoryInfo() {

    var connection = await mysql.createPool(
      port
    );


    const promisePool = connection.promise();

      const [rows] = await promisePool.query('SELECT * FROM polol.match_result');
      for (let i = 0; i < rows.length; i++) {
        result[i] = rows[i];
      }

      promisePool.end();
      return result;


    }

}




module.exports = HistoryDB;


"use strict"

var mysql = require('mysql2');
const port = require('../port/SQLport');
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();
var result4 = new Array();
var result = new Array();

class TensorDB {
  constructor(body) {
    this.body = body;
  }

  async Get_DataInfo() {
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows1] = await promisePool.query('SELECT * FROM polol.week1 ORDER BY `date`');
    for (let i = 0; i < rows1.length; i++) {
      result1[i] = rows1[i];
    }

    const [rows2] = await promisePool.query('SELECT * FROM polol.week2 ORDER BY `date`');
    for (let i = 0; i < rows2.length; i++) {
      result2[i] = rows2[i];
    }

    const [rows3] = await promisePool.query('SELECT * FROM polol.week3 ORDER BY `date`');
    for (let i = 0; i < rows3.length; i++) {
      result3[i] = rows3[i];
    }

    const [rows4] = await promisePool.query('SELECT * FROM polol.week4 ORDER BY `date`');
    for (let i = 0; i < rows4.length; i++) {
      result4[i] = rows4[i];
    }

    result = result1.concat(result2, result3, result4);

    promisePool.end();
    return result;
  }

  async SplitByRole() {
    var resultData = {
      TOP: [],
      JGL: [],
      MID: [],
      ADC: [],
      SPT: [],
    }

    const dataInfo = await this.Get_DataInfo();

    dataInfo.forEach((e) => {
      switch (e.Role) {
        case "TOP":
          resultData.TOP.push(e);
          break;
        case "JUNGLE":
          resultData.JGL.push(e);
          break;
        case "MID":
          resultData.MID.push(e);
          break;
        case "ADC":
          resultData.ADC.push(e);
          break;
        case "SUPPORT":
          resultData.SPT.push(e);
          break;
        default:
          break;
      }
    })

    return resultData;
  }
}


module.exports = TensorDB;
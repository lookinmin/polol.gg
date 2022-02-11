"use strict"

var mysql = require('mysql2');
const port = require('../port/eduPort');
var result = new Array();

class TFDB_22Summer {
  constructor(body) {
    this.body = body;
  }

  async Get_DataInfo() {
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const [rows] = await promisePool.query('SELECT * FROM edudata.summer_21 WHERE `Player` = "Faker" ORDER BY `Player`, `date`');
    for (let i = 0; i < rows.length; i++) {
      result[i] = rows[i];
    }

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


module.exports = TFDB_22Summer;
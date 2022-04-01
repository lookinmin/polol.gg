const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require('mysql2');
const port = require('../port/pololPort');

console.log('WritePlayOff');


var Lteam = [];
var Lscore = [];
var Rteam = [];
var Rscore = [];
var round = [];

var month = [];
var day = [];

class WritePlayoff{
  constructor(body){
    this.body = body;
  }


  async changePlayOff(target){
    const res = await axios.get(String(target));
    const $ = cheerio.load(res.data);

    console.log("플옵 크롤링 스타트");
    
    const SplitDate = (date) => {
      const newDate = date.split("-");
      month.push(newDate[1]);
      day.push(newDate[2]);
    }
    
    const SplitScore = (score1) => {
      const newScore1 = score1.split("-");
      Lscore.push(newScore1[0]);
      Rscore.push(newScore1[1]);
    }

    const ChangeTeamName = (e) => {
      var result;
      switch(e){
        case "T1":
          result = "T1";
          break;
        case "DRX":
          result = "DRX";
          break;
        case "DWG KIA":
          result = "DK";
          break;
        case "Nongshim RedForce":
          result = "NS";
          break;
        case "Gen.G eSports":
          result = "GEN";
          break;
        case "Kwangdong Freecs":
          result = "KDF";
          break;
        case "Liiv SANDBOX":
          result = "LSB";
          break;
        case "KT Rolster":
          result = "KT";
          break;
        case "Hanwha Life eSports":
          result = "HLE";
          break;
        case "Fredit BRION":
          result = "BRO";
          break;
      }
    
      return result;
    }


    for (let i = $(`tbody > tr`).length; i  >=  1; i--) {
      Lteam.push(ChangeTeamName($(`tbody > tr:nth-child(${i})  > td:nth-child(2)`).text()))
      Rteam.push(ChangeTeamName($(`tbody > tr:nth-child(${i})  > td:nth-child(4)`).text()))
      SplitScore($(`tbody > tr:nth-child(${i})  > td:nth-child(3)`).text())
      round.push($(`tbody > tr:nth-child(${i})  > td:nth-child(5)`).text())
      SplitDate($(`tbody > tr:nth-child(${i})  > td:nth-child(7)`).text())
    }

    const sliceString =(e)=> {
      var First = e.split('%');
      var F_str = First[1].concat(First[3]);
      return F_str;
    }

    var FF = sliceString(String(target));

    const sliceString2 =(e)=> {
      var Second = e.split('0');
      var S_str = Second[1].replace(/[0-9]/g, "");
      var Y_str = Second[3].replace(/[^0-9]/g,"");

      S_str = S_str+Y_str;

      return S_str;
    }

    var SS = sliceString2(FF).toLowerCase();

    this.changePODB(SS);
  }

  async changePODB(dbName){
    var connection;
    connection = mysql.createPool(
      port
    );

    const sql = "INSERT INTO `history`.`" +dbName+ "` (`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`) VALUES (?, ?, ?, ?, ?, ?);";

    try {
      try {
        const promisePool = connection.promise();
        for (let i = 0; i < Lteam.length; i++) {
          let param = [month[i], day[i], Lteam[i], Lscore[i], Rteam[i], Rscore[i], round[i]];
          const [row] = await promisePool.query(sql, param, function (err, rows, fields) {
            if (err) {
              console.log(err);
            } else {
              console.log(row);
            }
          });
        }
        promisePool.end();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }
}




module.exports = WritePlayoff;


  
  
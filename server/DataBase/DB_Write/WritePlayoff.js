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
    const res = await axios.get(("https://gol.gg/tournament/tournament-matchlist/LCK%20"+target.slice(0,target.length-2)+"%20Playoffs%2020"+target.slice(-2,target.length)+"/"));
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


    this.changePODB(target);
  }

  async changePODB(target){
    var connection;
    connection = mysql.createPool(
      port
    );

    const sql = "REPLACE INTO `history`.`" +target+ "` (`ID`,`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`) VALUES (?,?, ?, ?, ?, ?, ?);";

    try {
      try {
        const promisePool = connection.promise();
        const [rows] = await promisePool.query("SELECT * FROM history." + target);
        let j = 0;
        while (true){
          if(rows[j]==undefined){
            j++;
            break;
          }
          
          if(rows[j].Lteam2 === null && ((100*rows[j].Month + rows[j].Day) !== (100*rows[j-1].Month + rows[j-1].Day))){
            j++;
            break;
          }
          
          j++;
        }
        for (let i = 0; i < Lteam.length; i++) {
          let param = [j+i,month[i], day[i], Lteam[i], Lscore[i], Rteam[i], Rscore[i], round[i]];
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


  
  
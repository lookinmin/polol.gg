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

const sql = "REPLACE INTO `history`.`spring22` (`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`) VALUES (?, ?, ?, ?, ?, ?);";

var connection;

const getPlayOff = async () => {
  connection = await mysql.createPool(
    port
  );
  try {
    return await axios.get('https://gol.gg/tournament/tournament-matchlist/LCK%20Summer%20Playoffs%202021/');
  } catch (error) {
    console.error(error);
  }
};

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

getPlayOff()
  .then((html) => {
    const $ = cheerio.load(html.data);
    for (let i = $(`tbody > tr`).length; i  >=  1; i--) {
      Lteam.push(ChangeTeamName($(`tbody > tr:nth-child(${i})  > td:nth-child(2)`).text()))
      Rteam.push(ChangeTeamName($(`tbody > tr:nth-child(${i})  > td:nth-child(4)`).text()))
      SplitScore($(`tbody > tr:nth-child(${i})  > td:nth-child(3)`).text())
      round.push($(`tbody > tr:nth-child(${i})  > td:nth-child(5)`).text())
      SplitDate($(`tbody > tr:nth-child(${i})  > td:nth-child(7)`).text())
    }
  })

  .then(async () => {
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
  })



  
  
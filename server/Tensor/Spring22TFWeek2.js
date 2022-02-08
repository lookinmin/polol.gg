const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../DataBase/port/SQLport');

var setNum = [];
var matchUrl = [];
var gameDate = [];
var gameSet = [];
var gameResult = [];
var playerName = [];
var playerRole = [];
var playerKills = [];
var playerDeaths = [];
var playerAssists = [];
var playerCSM = [];
var playerGPM = [];
var playerVision = [];
var playerDPM = [];
var playerKP = [];
var playerGD15 = [];
var playerResult = [];

const sql = "REPLACE INTO `polol`.`week2` (`date`, `match`, `Player`, `Role`, `Kills`, `Deaths`, `Assists`, `CSM`, `GPM`, `Vision Score`, `DPM`, `KP%`, `GD@15`, `Result`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
var connection;

const ClearArray = () => {
  gameDate = [];
  gameSet = [];
  gameResult = [];
  playerName = [];
  playerRole = [];
  playerKills = [];
  playerDeaths = [];
  playerAssists = [];
  playerCSM = [];
  playerGPM = [];
  playerVision = [];
  playerDPM = [];
  playerKP = [];
  playerGD15 = [];
  playerResult = [];
}

const setGameDate = (date) => {
  const newDate = date.split("-");
  const newDate2 = newDate[2].split(" ");
  return String(newDate[1]+newDate2[0]);
}

const setGameSet = (set) => {
  const newSet = set.split(" ");
  return String(newSet[1]);
}

const getMatchResult = async (res, num) => {
  const $ = cheerio.load(res.data);
  for (let i = 1; i <= 10; i++) {
    gameDate.push(setGameDate($(`div.text-right`).text()));
    gameSet.push(setGameSet($(`li.game-menu-button-active`).text()))
    playerName.push($(`table.completestats > tbody > tr:nth-child(1) > td:nth-child(${i + 1})`).text())
    playerRole.push($(`table.completestats > tbody > tr:nth-child(2) > td:nth-child(${i + 1})`).text())
    playerKills.push(Number($(`table.completestats > tbody > tr:nth-child(4) > td:nth-child(${i + 1})`).text()))
    playerDeaths.push(Number($(`table.completestats > tbody > tr:nth-child(5) > td:nth-child(${i + 1})`).text()))
    playerAssists.push(Number($(`table.completestats > tbody > tr:nth-child(6) > td:nth-child(${i + 1})`).text()))
    playerCSM.push($(`table.completestats > tbody > tr:nth-child(11) > td:nth-child(${i + 1})`).text())
    playerGPM.push($(`table.completestats > tbody > tr:nth-child(13) > td:nth-child(${i + 1})`).text())
    playerVision.push($(`table.completestats > tbody > tr:nth-child(15) > td:nth-child(${i + 1})`).text())
    playerDPM.push($(`table.completestats > tbody > tr:nth-child(29) > td:nth-child(${i + 1})`).text())
    playerKP.push($(`table.completestats > tbody > tr:nth-child(32) > td:nth-child(${i + 1})`).text())
    playerGD15.push($(`table.completestats > tbody > tr:nth-child(38) > td:nth-child(${i + 1})`).text())


    if (num === 0) {
      if (i <= 5) {
        playerResult.push(gameResult[num]);
      } else {
        playerResult.push(gameResult[num + 1]);
      }
    } else if (num === 1) {
      if (i <= 5) {
        playerResult.push(gameResult[num + 1]);
      } else {
        playerResult.push(gameResult[num + 2]);
      }
    } else {
      if (i <= 5) {
        playerResult.push(gameResult[num + 2]);
      } else {
        playerResult.push(gameResult[num + 3]);
      }
    }
  }

  try {
    try {
      connection = await mysql.createPool(port);
      const promisePool = connection.promise();
      for (let i = 0; i < playerName.length; i++) {
        let param = [gameDate[i], gameSet[i], playerName[i], playerRole[i], playerKills[i], playerDeaths[i], playerAssists[i], playerCSM[i],
        playerGPM[i], playerVision[i], playerDPM[i], playerKP[i], playerGD15[i], playerResult[i]];
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
    await ClearArray();
  } catch (err) {
    console.log(err);
  }
}

const getWinOrLose = (res) => {
  const $ = cheerio.load(res.data);
  for (let i = 1; i < $(`div.p-4 > div.col-12 > div.col-cadre > div.row`).length; i++) {
    gameResult.push($(`div.p-4 > div.col-12 > div.col-cadre > div:nth-child(${i + 1}) > div:nth-child(1) > h1`).text());
    gameResult.push($(`div.p-4 > div.col-12 > div.col-cadre > div:nth-child(${i + 1}) > div:nth-child(3) > h1`).text());
  }
}

const SplitScore = (score) => {
  let num = score.split("-");
  return Number(num[0]) + Number(num[1]);
}

const getMatchUrl = (url) => {
  const newUrl = url.split("/");
  return newUrl[3];
}

const CrawlingMatchResult = async () => {
  const res = await axios.get(`https://gol.gg/tournament/tournament-matchlist/LCK%20Spring%202022/`);
  const $ = cheerio.load(res.data);
  for (let i = $(`table > tbody > tr`).length; i >= $(`table > tbody > tr`).length - 10; i--) {
    setNum.push(SplitScore($(`table > tbody > tr:nth-child(${i}) >td:nth-child(3)`).text()));
    matchUrl.push(getMatchUrl($(`table > tbody > tr:nth-child(${i}) >td:nth-child(1) > a`).attr('href')));
  }

  try {
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < setNum[j]; i++) {
        let pageNum = matchUrl[j] + i;
        let gameResult = await axios.get(`https://gol.gg/game/stats/${pageNum}/page-summary/`);
        await getWinOrLose(gameResult);
        let matchResult = await axios.get(`https://gol.gg/game/stats/${pageNum}/page-fullstats/`);
        await getMatchResult(matchResult, i);
      }
    }
  }catch (err) {

  }finally {
    console.log('write to db');
  }

}

CrawlingMatchResult();



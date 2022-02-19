
const axios = require("axios");
const cheerio = require("cheerio");

var mysql = require('mysql2');
const port = require('../port/pololPort');

var Lteam1 = [];
var Lscore1 = [];
var Rteam1 = [];
var Rscore1 = [];
var Lteam2 = [];
var Lscore2 = [];
var Rteam2 = [];
var Rscore2 = [];
var month = [];
var day = [];

const sql = "REPLACE INTO `history`.`spring22` (`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`, `Lteam2`, `Lscore2`, `Rteam2`, `Rscore2`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

var connection;

const getMatchResult = async () => {
  connection = await mysql.createPool(
    port
  );
  try {
    return await axios.get('https://lol.fandom.com/wiki/LCK/2022_Season/Spring_Season');
  } catch (error) {
    console.error(error);
  }
};


const SplitDate = (date) => {
  const newDate = date.split("-");
  month.push(newDate[1]);
  day.push(newDate[2]);
}

const SplitScore = (score1, score2) => {
  const newScore1 = score1.substr(0);
  Lscore1.push(newScore1[0]);
  Rscore1.push(newScore1[1]);

  const newScore2 = score2.substr(0);
  Lscore2.push(newScore2[0]);
  Rscore2.push(newScore2[1]);
}

getMatchResult()
  .then((html) => {
    const $ = cheerio.load(html.data);
    for (let i = 0; i < $(`div.matchlist-tab-wrapper`).length; i++) {
      for (let j = 8; j <= 36; j += 7) {
        Lteam1.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j}) > td.matchlist-team1 > span.team > span.teamname`).text());
        Rteam1.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j}) > td.matchlist-team2 > span.team > span.teamname`).text());
        Lteam2.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j + 2}) > td.matchlist-team1 > span.team > span.teamname`).text());
        Rteam2.push($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j + 2}) > td.matchlist-team2 > span.team > span.teamname`).text());
        SplitDate($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j})`).attr('data-date'));
        SplitScore($(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
      table.matchlist > tbody > tr:nth-child(${j}) > td.matchlist-score`).text(),
          $(`div#matchlist-content-wrapper > div:nth-child(${i + 1}) > 
        table.matchlist > tbody > tr:nth-child(${j + 2}) > td.matchlist-score`).text());
      }
    }
  })
  .then(async () => {
    try {
      try {
        const promisePool = connection.promise();
        for (let i = 0; i < Lteam1.length; i++) {
          let param = [month[i], day[i], Lteam1[i], Lscore1[i], Rteam1[i], Rscore1[i], Lteam2[i], Lscore2[i], Rteam2[i], Rscore2[i]];
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



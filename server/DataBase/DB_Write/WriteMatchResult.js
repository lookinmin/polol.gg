const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');

class WriteMatchResult {
  constructor(body) {
    this.body = body;
  }
  async getMatchResult(target) { //tableMaker에 보내는 디비랑 동일
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

    const get_season_name = (str) => {
      str = str.toLowerCase();
      let season;
      let year;
      if (str[1] == "p") {
        year = str.replace("spring", "");
        season = "Spring"
      } else {
        year = str.replace("summer", "");
        season = "Summer"
      }
      return [year, season]
    }
    const SplitDate = (date) => {
      console.log("오류 여기??" + typeof date);
      console.log("오류 내용이 뭔데?" + date);
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
    let [year, season] = get_season_name(target);
    const res = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Season');
    const $ = cheerio.load(res.data);
    for (let i = 0; i < $(`div.matchlist-tab-wrapper`).length; i++) {
      for (let j = 8; j <= $(`div#matchlist-content-wrapper  div:nth-child(${i + 1})  table.matchlist  tbody tr`).length; j += 7) {
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

    const connection = await mysql.createPool(
      port
    );

    try {
      try {
        const promisePool = connection.promise();

        var sql = "REPLACE INTO `history`." + target + " (`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`, `Lteam2`, `Lscore2`, `Rteam2`, `Rscore2`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
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
    console.log(target + "match update")
  }

}

module.exports = WriteMatchResult;

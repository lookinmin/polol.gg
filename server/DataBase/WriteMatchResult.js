console.log("WriteMatchResult");
const axios = require("axios");
const cheerio = require("cheerio");

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer1234!',
  database: 'polol'
});

class WriteMatchResult {
  constructor(body) {
    this.body = body;
  }

  async writeMatchResult() {

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

    const sql = "REPLACE INTO `polol`.`match_result` (`month`, `day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`, `Lteam2`, `Lscore2`, `Rteam2`, `Rscore2`, `key`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    const getMatchResult = async () => {
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
      .then(() => {
        for (let i = 0; i < Lteam1.length; i++) {
          let params = [month[i], day[i], Lteam1[i], Lscore1[i], Rteam1[i], Rscore1[i]
            , Lteam2[i], Lscore2[i], Rteam2[i], Rscore2[i], i]
          if (Lscore1[i] === undefined || Lscore1[1] === "") {
            break;
          } else {
            connection.query(sql, params, function (err, rows, fields) {
              if (err) {
                console.log(err);
              } else {
                console.log("Data inserted");
              }
            });
          }
        }

        connection.end();
      })



    // connection.query(sql, params, function(err, rows, fields) {
    //   if(err){
    //     console.log(err);
    //   }else {
    //     console.log("Data inserted");
    //   }
    // });


    return "asdf";
  }
}


module.exports = WriteMatchResult;
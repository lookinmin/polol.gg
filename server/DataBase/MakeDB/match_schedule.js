const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');


match_scehdule = async (string) => {
  var Lteam1 = [];
  var Rteam1 = [];
  var Lteam2 = [];
  var Rteam2 = [];
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
    const newDate = date.split("-");
    month.push(newDate[1]);
    day.push(newDate[2]);
  } //tableMaker에 보내는 디비랑 동일
  let [year, season] = get_season_name(string);
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
    }
  }

  
  let match_period={
    start:Number(month[0]),
    end:Number(month[month.length-1])
  }
  let jointeam=[...(new Set(Lteam1))];
  const connection = await mysql.createPool(
    port
  );

  try {
    try {
      const promisePool = connection.promise();

      // target = `spring22`;

      var sql = "INSERT INTO `history`." + string + " (`Month`, `Day`, `Lteam1`, `Rteam1`, `Lteam2` ,`Rteam2`) VALUES (?, ?, ?, ?, ?, ?);";
      for (let i = 0; i < Lteam1.length; i++) {
        let param = [month[i], day[i], Lteam1[i], Rteam1[i], Lteam2[i], Rteam2[i], ];
        const [row] = await promisePool.query(sql, param, function (err, rows, fields) {
          if (err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      }
      for (let i = 0; i < 10; i++) {
        let value=jointeam[i]
        console.log(value);
        sql = "INSERT INTO stack." + string + "_regular_team(`TeamName`) VALUES (?)";
        await promisePool.query(sql, value,
            function (err, rows, fields) {
                if (err) {
                    console.log('dbwrite: ' + err);
                } else {
                    console.log("data inserted");
                }
            })
    }
      promisePool.end();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
  
  return match_period;
}


module.exports = {
  ms: match_scehdule
};

const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');



const gePOPlayer = async (str) => {
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
  const Calculate = (games, kill, death, assist) => {
    let data = [];
    data[0] = Math.round(Number(games) * Number(kill));
    data[1] = Math.round(Number(games) * Number(death));
    data[2] = Math.round(Number(games) * Number(assist));
    return data;
  }
  try {
    let [year, season] = get_season_name(str);
    var player = [];
    const res = await axios('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Playoffs/Player_Statistics');
    const $ = cheerio.load(res.data);

    for (let i = 4; i < $(`table.sortable > tbody > tr`).length; i++) {
      let games = $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(2)`).text();
      let kill = $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(6)`).text();
      let death = $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(7)`).text();
      let assist = $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(8)`).text();
      let data = Calculate(games, kill, death, assist);
      player.push({
        name: $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(1)`).text(),
        win: $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(3)`).text(),
        lose: $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(4)`).text(),
        kill: data[0],
        death: data[1],
        assist: data[2],
        KDA: $(`table.sortable > tbody > tr:nth-child(${i + 1}) > td:nth(9)`).text(),
      })
    }
    console.log(player);
    var connection = await mysql.createPool(
      port
    );

    try {
      const promisePool = connection.promise();

      for (let j = 0; j < player.length; j++) {
        let sql = "REPLACE INTO `stack`.`" + str + "_playoff_player` (`Name`, `Kill`, `Death`, `Assist`, `Win`, `Lose`) VALUES (?, ?, ?, ?, ?, ?);";
        await promisePool.query(sql, [player[j].name,player[j].kill, player[j].death,
            player[j].assist, player[j].win, player[j].lose
          ],
          function (err, rows, fields) {
            if (err) {
              console.log('dbwrite: ' + err);
            } else {
              console.log("data inserted");
            }
          })

      }

      promisePool.end();
    } catch (error) {
      console.log('db: ', error);
    }
    // console.log(rows);
  } catch (err) {
    console.log(err);
  }
  console.log(str + "player update")
}
module.exports = {
  gePOPlayer: gePOPlayer
};
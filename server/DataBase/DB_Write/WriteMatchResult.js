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
      const newDate = date.split("-");
      month.push(newDate[1]);
      day.push(newDate[2]);
    }

    let [year, season] = get_season_name(target);
    const res = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Season');
    const $ = cheerio.load(res.data);
    for (let i = 0; i < $(`tr.ml-row`).length; i+=2) {
      let temp1=$(`tr.ml-row`)[i].children[1].children[0].data
      let temp2=$(`tr.ml-row`)[i].children[2].children[0].data
      SplitDate(($(`tr.ml-row`)[i].attribs['data-date'])) 
      
      Lteam1.push($(`tr.ml-row`)[i].children[0].children[0].children[0].children[0].data)
      Rteam1.push($(`tr.ml-row`)[i].children[4].children[0].children[1].children[0].data)
      if(temp1=="W"){
        Lscore1.push("2");
        Rscore1.push("0");
      }
      else if(temp1=="FF"){
        Lscore1.push("0");
        Rscore1.push("2");
      }
      else{
        Lscore1.push(temp1);
        Rscore1.push(temp2);
      }
      
      try {
        temp1=$(`tr.ml-row`)[i+1].children[1].children[0].data
        temp2=$(`tr.ml-row`)[i+1].children[2].children[0].data
        if(temp1=="W"){
          Lscore2.push("2");
          Rscore2.push("0");
        }
        else if(temp1=="FF"){
          Lscore2.push("0");
          Rscore2.push("2");
        }
        else{
          Lscore2.push(temp1);
          Rscore2.push(temp2);
        }
        Lteam2.push($(`tr.ml-row`)[i + 1].children[0].children[0].children[0].children[0].data)
        Rteam2.push($(`tr.ml-row`)[i + 1].children[4].children[0].children[1].children[0].data)
        
      } catch {

      }
    }

    const connection = await mysql.createPool(
      port
    );

    try {
      try {
        const promisePool = connection.promise();

        // target = `spring22`;

        var sql = "REPLACE INTO `history`." + target + " (`ID`,`Month`, `Day`, `Lteam1`, `Lscore1`, `Rteam1`, `Rscore1`, `Lteam2`, `Lscore2`, `Rteam2`, `Rscore2`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        for (let i = 0; i < Lteam1.length; i++) {
          let param = [i+1,month[i], day[i], Lteam1[i], Lscore1[i], Rteam1[i], Rscore1[i], Lteam2[i], Lscore2[i], Rteam2[i], Rscore2[i]];
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

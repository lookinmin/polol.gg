"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');


class PlayOffDB{
  constructor(body){
    this.body = body;
  }

  async Get_PlayOffInfo(){
    var date = new Array();
    var result = new Array();
    var connection = await mysql.createPool(
      port
    );

    const promisePool = connection.promise();

    const rows1 = await promisePool.query('SELECT * FROM history.spring22 ORDER BY `Month` DESC,`Day` DESC LIMIT 5');
    for(let i =0;i < rows1[0].length;i++){
      if(rows1[0][i].Lscore1!=null&&rows1[0][i].Lscore2==null)
        date.push(rows1[0][i]);
    }

    const rows2 = await promisePool.query('SELECT `TeamName` FROM stack.spring22_regular_team ORDER BY `Rank`');
    var teams={
      rank1:rows2[0][0].TeamName,
      rank2:rows2[0][1].TeamName,
      rank3:rows2[0][2].TeamName,
      rank4:rows2[0][3].TeamName,
      rank5:rows2[0][4].TeamName,
      rank6:rows2[0][5].TeamName,
      season: "season"
    }
    promisePool.end();

    result = date.concat(teams);
    return result;
  }
}
module.exports = PlayOffDB;



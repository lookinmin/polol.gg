"use strict"

var mysql = require('mysql2');
const port = require('../port/pololPort');
const Lowest = require('./lowest/DBName');


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

    var ON = new Lowest();
    var BB = await ON.Submit();
    
    var num = BB.length-1;

    const sliceString =(e)=> {
      var First = e.split('_');
      var F_str = First[0];
      return F_str;
    }

    var target = sliceString(BB[num]);

    const rows1 = await promisePool.query("SELECT * FROM history."+target+" ORDER BY `Month` DESC,`Day` DESC LIMIT 5");
    for(let i =rows1[0].length-1;i>= 0;i--){
      if(rows1[0][i].Lscore1!=null&&rows1[0][i].Lscore2==null)
        date.push(rows1[0][i]);
    }

    const rows2 = await promisePool.query("SELECT TeamName FROM stack."+target+"_regular_team ORDER BY `Rank`");
    var teams={
      rank1:rows2[0][0].TeamName,
      rank2:rows2[0][1].TeamName,
      rank3:rows2[0][2].TeamName,
      rank4:rows2[0][3].TeamName,
      rank5:rows2[0][4].TeamName,
      rank6:rows2[0][5].TeamName
    }
    promisePool.end();

    result = date.concat(teams);
    return result;
  }
}
module.exports = PlayOffDB;



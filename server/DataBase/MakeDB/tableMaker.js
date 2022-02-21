var mysql = require('mysql2');
var port = require('../port/pololPort');

const makeTable = async (target) => {
  try{
    var connection = mysql.createPool(
      port
    );

    try{
      const promisePool = connection.promise();

      var sql1 = "CREATE TABLE IF NOT EXIST `history`."+target+" "(
        +"`Month` tinyint unsigned NOT NULL,"
        +"`Day` tinyint unsigned NOT NULL,"
        +"`Lteam1` varchar(5) DEFAULT NULL,"
        +"`Lscore1` tinyint unsigned DEFAULT NULL,"
        +"`Rteam1` varchar(5) DEFAULT NULL,"
        +"`Rscore1` tinyint unsigned DEFAULT NULL,"
        +"`Lteam2` varchar(5) DEFAULT NULL,"
        +"`Lscore2` tinyint unsigned DEFAULT NULL,"
        +"`Rteam2` varchar(5) DEFAULT NULL,"
        +"`Rscore2` tinyint unsigned DEFAULT NULL,"
        +"PRIMARY KEY (`Month`, `Day`)");
  
      promisePool.query(sql1, sql2, function(err){
        if (err) throw err;
        console.log("Table1 Create Success")
      });
  
      var sql2 = "CREATE TABLE IF NOT EXIST `stack`."+target+"_playoff_player"+" "(
        +"`Name` varchar(20) NOT NULL,"
        +"`KoreaName` varchar(5) DEFAULT NULL,"
        +"`Team` varchar(5) DEFAULT NULL,"
        +"`Position` varchar(4) DEFAULT NULL,"
        +"`Kill` smallint DEFAULT NULL,"
        +"`Death` smallint DEFAULT NULL,"
        +"`Assist` smallint DEFAULT NULL,"
        +"`Win` tinyint unsigned DEFAULT NULL,"
        +"`Lose` tinyint unsigned DEFAULT NULL,"
        +"PRIMARY KEY (`Name`)");
  
  
      promisePool.query(sql2, function(err){
        if (err) throw err;
        console.log("Table2 Create Success")
      });
  
      var sql3 = "CREATE TABLE IF NOT EXIST `stack`."+target+"_playoff_team"+" "(
        +"`TeamName` varchar(5) NOT NULL,"
        +"`Win` tinyint unsigned DEFAULT NULL,"
        +"`Lose` tinyint unsigned DEFAULT NULL,"
        +"`KDA` float DEFAULT NULL,"
        +"`Kill` smallint unsigned DEFAULT NULL,"
        +"`Death` smallint unsigned DEFAULT NULL,"
        +"`Assist` smallint unsigned DEFAULT NULL,"
        +"`Rank` tinyint unsigned DEFAULT NULL,"
        +"PRIMARY KEY (`TeamName`)");
  
      promisePool.query(sql3, function(err){
        if (err) throw err;
        console.log("Table3 Create Success")
      });
  
      var sql4 = "CREATE TABLE IF NOT EXIST `stack`."+target+"_regular_player"+" "(
        +"`Name` varchar(20) NOT NULL,"
        +"`KoreaName` varchar(5) DEFAULT NULL,"
        +"`Team` varchar(5) DEFAULT NULL,"
        +"`Position` varchar(4) DEFAULT NULL,"
        +"`Kill` smallint unsigned DEFAULT NULL,"
        +"`Death` smallint unsigned DEFAULT NULL,"
        +"`Assist` smallint unsigned DEFAULT NULL,"
        +"`Win` tinyint unsigned DEFAULT NULL,"
        +"`Lose` tinyint unsigned DEFAULT NULL,"
        +"`Birth` varchar(15) DEFAULT NULL,"
        +"`Main` tinyint unsigned DEFAULT NULL,"
        +"`Pic` varchar(200) DEFAULT NULL,"
        +"PRIMARY KEY (`Name`)");
      promisePool.query(sql4, function(err){
        if (err) throw err;
        console.log("Table4 Create Success")
      });
  
      var sql5 = "CREATE TABLE IF NOT EXIST `stack`."+target+"_regular_team"+" "(
        +"`TeamName` varchar(5) NOT NULL,"
        +"`Win` tinyint unsigned DEFAULT NULL,"
        +"`Lose` tinyint unsigned DEFAULT NULL,"
        +"`Difference` tinyint DEFAULT NULL,"
        +"`KDA` float DEFAULT NULL,"
        +"`Kill` smallint unsigned DEFAULT NULL,"
        +"`Death` smallint unsigned DEFAULT NULL,"
        +"`Assist` smallint unsigned DEFAULT NULL,"
        +"`Rank` tinyint unsigned DEFAULT NULL,"
        +"`Rate` varchar(5) DEFAULT NULL,"
        +"PRIMARY KEY (`TeamName`)"); 
  
      promisePool.query(sql5, function(err){
        if (err) throw err;
        console.log("Table5 Create Success")
      });

      promisePool.end();
    }catch(err){
      console.log(err);
    }
  }catch(err){
    console.log(err);
  }

  
}

module.exports = {MK : makeTable};
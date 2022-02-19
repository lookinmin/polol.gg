const axios = require("axios");
const cheerio = require("cheerio");
const DB = require("../ReadDB");
var mysql = require('mysql2');
const port = require('../port/pololPort');

const SplitScore = (score) => {
  const newScore = score.split(" - ");
  return newScore;
}

const getTeam = async () => {
  try {
    var teamRank = [];

    var nowRank = [];


    const teamTable = await axios.get('https://lol.fandom.com/wiki/LCK/2022_Season/Spring_Season');
    const $ = cheerio.load(teamTable.data);

    for (let i = 2; i < $('table.standings > tbody > tr').length; i++) {
      let score = SplitScore($(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(3)`).text());
      teamRank.push({
        rank: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text(),
        teamName: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span.team > span.teamname`).text(),
        win: score[0],
        lose: score[1],
        rate: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text(),
        difference: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text()
      });

      nowRank.push({
        rank: parseInt($(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text()),
        Name: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span.team > span.teamname`).text()
      })
    }

    nowRank.push({season : ($(`h1#firstHeading`).text()).replace(/(\r\n\t|\n|\r|\t|)/gm, "")})

    var BRO = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var DK = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var DRX = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var GEN = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var HLE = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var KDF = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var KT = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var LSB = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var NS = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };
    var T1 = {
      Kill: 0,
      Death: 0,
      Assist: 0
    };

    const Players = new DB();
    const players = await Players.getPlayer();

    players.forEach((e) => {
      switch (e.Team) {
        case "BRO":
          BRO.Kill += e.Kill;
          BRO.Death += e.Death;
          BRO.Assist += e.Assist;
          break;
        case "DK":
          DK.Kill += e.Kill;
          DK.Death += e.Death;
          DK.Assist += e.Assist;
          break;
        case "DRX":
          DRX.Kill += e.Kill;
          DRX.Death += e.Death;
          DRX.Assist += e.Assist;
          break;
        case "GEN":
          GEN.Kill += e.Kill;
          GEN.Death += e.Death;
          GEN.Assist += e.Assist;
          break;
        case "HLE":
          HLE.Kill += e.Kill;
          HLE.Death += e.Death;
          HLE.Assist += e.Assist;
          break;
        case "KDF":
          KDF.Kill += e.Kill;
          KDF.Death += e.Death;
          KDF.Assist += e.Assist;
          break;
        case "KT":
          KT.Kill += e.Kill;
          KT.Death += e.Death;
          KT.Assist += e.Assist;
          break;
        case "LSB":
          LSB.Kill += e.Kill;
          LSB.Death += e.Death;
          LSB.Assist += e.Assist;
          break;
        case "NS":
          NS.Kill += e.Kill;
          NS.Death += e.Death;
          NS.Assist += e.Assist;
          break;
        case "T1":
          T1.Kill += e.Kill;
          T1.Death += e.Death;
          T1.Assist += e.Assist;
          break;
        default:
          break;
      }
    });
    teamRank.forEach((e) => {
      switch (e.teamName) {
        case 'Gen.G':
          e.teamName = 'GEN';
          e.Kill = GEN.Kill;
          e.Death = GEN.Death;
          e.Assist = GEN.Assist;
          e.KDA = ((GEN.Kill + GEN.Assist) / GEN.Death).toFixed(2);
          break;
        case 'T1':
          e.teamName = 'T1';
          e.Kill = T1.Kill;
          e.Death = T1.Death;
          e.Assist = T1.Assist;
          e.KDA = ((T1.Kill + T1.Assist) / T1.Death).toFixed(2);
          break;
        case 'Nongshim RedForce':
          e.teamName = 'NS';
          e.Kill = NS.Kill;
          e.Death = NS.Death;
          e.Assist = NS.Assist;
          e.KDA = ((NS.Kill + NS.Assist) / NS.Death).toFixed(2);
          break;
        case 'DWG KIA':
          e.teamName = 'DK';
          e.Kill = DK.Kill;
          e.Death = DK.Death;
          e.Assist = DK.Assist;
          e.KDA = ((DK.Kill + DK.Assist) / DK.Death).toFixed(2);
          break;
        case 'KT Rolster':
          e.teamName = 'KT';
          e.Kill = KT.Kill;
          e.Death = KT.Death;
          e.Assist = KT.Assist;
          e.KDA = ((KT.Kill + KT.Assist) / KT.Death).toFixed(2);
          break;
        case 'DRX':
          e.teamName = 'DRX';
          e.Kill = DRX.Kill;
          e.Death = DRX.Death;
          e.Assist = DRX.Assist;
          e.KDA = ((DRX.Kill + DRX.Assist) / DRX.Death).toFixed(2);
          break;
        case 'Hanwha Life Esports':
          e.teamName = 'HLE';
          e.Kill = HLE.Kill;
          e.Death = HLE.Death;
          e.Assist = HLE.Assist;
          e.KDA = ((HLE.Kill + HLE.Assist) / HLE.Death).toFixed(2);
          break;
        case 'Liiv SANDBOX':
          e.teamName = 'LSB';
          e.Kill = LSB.Kill;
          e.Death = LSB.Death;
          e.Assist = LSB.Assist;
          e.KDA = ((LSB.Kill + LSB.Assist) / LSB.Death).toFixed(2);
          break;
        case 'Fredit BRION':
          e.teamName = 'BRO';
          e.Kill = BRO.Kill;
          e.Death = BRO.Death;
          e.Assist = BRO.Assist;
          e.KDA = ((BRO.Kill + BRO.Assist) / BRO.Death).toFixed(2);
          break;
        case 'Kwangdong Freecs':
          e.teamName = 'KDF';
          e.Kill = KDF.Kill;
          e.Death = KDF.Death;
          e.Assist = KDF.Assist;
          e.KDA = ((KDF.Kill + KDF.Assist) / KDF.Death).toFixed(2);
          break;
        default:
          break;
      }
    })

    var connection = await mysql.createPool(
      port
    );

    nowRank.sort(function(a, b){
      if (a.rank > b.rank) {
        return 1;
      }
      if (a.rank < b.rank) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })


    const changeName =(e) => {
      var result;
      switch (e){
        case "T1":
          result = "T1";
          break;
        case "Gen.G":
          result = "GEN";
          break;
        case "DRX":
          result = "DRX";
          break;
        case "DWG KIA":
          result = "DK";
          break;
        case "KT Rolster":
          result = "KT";
          break;
        case "Fredit BRION":
          result = "BRO";
          break;
        case "Nongshim RedForce":
          result = "NS";
          break;
        case "Kwangdong Freecs":
          result = "KDF";
          break;
        case "Liiv SANDBOX":
          result = "LSB";
          break;
        case "Hanwha Life Esports":
          result = "HLE";
          break;
      }
      return result;
    }

    for (let i of nowRank){
      i.Name = changeName(i.Name);
    }

    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query('SELECT * FROM stack.spring22_regular_team');

      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < teamRank.length; j++) {
          if (rows[i].TeamName === teamRank[j].teamName) {
            let sql = "UPDATE `stack`.`spring22_regular_team` SET `win`=?, `lose`=?, `difference`=?, `KDA`=?, `Kill`=?, `Death`=?, `Assist`=?, `rank`=?, `rate`=? WHERE `TeamName` = '" + rows[i].TeamName + "'";
            await promisePool.query(sql, [teamRank[j].win, teamRank[j].lose, teamRank[j].difference
              , teamRank[j].KDA, teamRank[j].Kill, teamRank[j].Death, teamRank[j].Assist
              , teamRank[j].rank, teamRank[j].rate],
              function (err, rows, field) {
                if (err) {
                  console.log('dbwrite: ' + err);
                }
                else {
                  console.log("data inserted");
                }
              })
          }
        }

      }
   

      let sqls = "UPDATE `polol`.`playoff` SET `rank1`=?, `rank2`=?, `rank3`=?, `rank4`=?, `rank5`=?, `rank6`=?, `season`=?";
      await promisePool.query(sqls, [nowRank[0].Name, nowRank[1].Name, nowRank[2].Name, nowRank[3].Name, nowRank[4].Name, nowRank[5].Name, nowRank[10].season],
        function (err, rows, field) {
          if (err) {
            console.log('dbwrite: ' + err);
          }
          else {
            console.log("data inserted22");
          }
        }
      )
      
      
        
      promisePool.end();
    } catch (error) {
      console.log(error);
    }


  } catch (error) {
    console.error(error);
  }
}

getTeam();
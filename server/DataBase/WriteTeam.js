
const axios = require("axios");
const cheerio = require("cheerio");
const DB = require("./ReadDB");
var mysql = require('mysql2');
const port = require('./port/SQLport');

const SplitScore = (score) => {
  const newScore = score.split(" - ");
  return newScore;
}

const getTeam = async () => {
  try {
    var teamRank = [];
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
    }

    var BRO = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var DK = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var DRX = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var GEN = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var HLE = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var KDF = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var KT = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var LSB = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var NS = {
      kill: 0,
      death: 0,
      assist: 0
    };
    var T1 = {
      kill: 0,
      death: 0,
      assist: 0
    };

    const Players = new DB();
    const players = await Players.getPlayer();

    players.forEach((e) => {
      switch (e.team) {
        case "BRO":
          BRO.kill += e.kill;
          BRO.death += e.death;
          BRO.assist += e.assist;
          break;
        case "DK":
          DK.kill += e.kill;
          DK.death += e.death;
          DK.assist += e.assist;
          break;
        case "DRX":
          DRX.kill += e.kill;
          DRX.death += e.death;
          DRX.assist += e.assist;
          break;
        case "GEN":
          GEN.kill += e.kill;
          GEN.death += e.death;
          GEN.assist += e.assist;
          break;
        case "HLE":
          HLE.kill += e.kill;
          HLE.death += e.death;
          HLE.assist += e.assist;
          break;
        case "KDF":
          KDF.kill += e.kill;
          KDF.death += e.death;
          KDF.assist += e.assist;
          break;
        case "KT":
          KT.kill += e.kill;
          KT.death += e.death;
          KT.assist += e.assist;
          break;
        case "LSB":
          LSB.kill += e.kill;
          LSB.death += e.death;
          LSB.assist += e.assist;
          break;
        case "NS":
          NS.kill += e.kill;
          NS.death += e.death;
          NS.assist += e.assist;
          break;
        case "T1":
          T1.kill += e.kill;
          T1.death += e.death;
          T1.assist += e.assist;
          break;
        default:
          break;
      }
    });

    teamRank.forEach((e) => {
      switch (e.teamName) {
        case 'Gen.G':
          e.teamName = 'GEN';
          e.kill = GEN.kill;
          e.death = GEN.death;
          e.assist = GEN.assist;
          e.KDA = ((GEN.kill + GEN.assist) / GEN.death).toFixed(2);
          break;
        case 'T1':
          e.teamName = 'T1';
          e.kill = T1.kill;
          e.death = T1.death;
          e.assist = T1.assist;
          e.KDA = ((T1.kill + T1.assist) / T1.death).toFixed(2);
          break;
        case 'Nongshim RedForce':
          e.teamName = 'NS';
          e.kill = NS.kill;
          e.death = NS.death;
          e.assist = NS.assist;
          e.KDA = ((NS.kill + NS.assist) / NS.death).toFixed(2);
          break;
        case 'DWG KIA':
          e.teamName = 'DK';
          e.kill = DK.kill;
          e.death = DK.death;
          e.assist = DK.assist;
          e.KDA = ((DK.kill + DK.assist) / DK.death).toFixed(2);
          break;
        case 'KT Rolster':
          e.teamName = 'KT';
          e.kill = KT.kill;
          e.death = KT.death;
          e.assist = KT.assist;
          e.KDA = ((KT.kill + KT.assist) / KT.death).toFixed(2);
          break;
        case 'DRX':
          e.teamName = 'DRX';
          e.kill = DRX.kill;
          e.death = DRX.death;
          e.assist = DRX.assist;
          e.KDA = ((DRX.kill + DRX.assist) / DRX.death).toFixed(2);
          break;
        case 'Hanwha Life Esports':
          e.teamName = 'HLE';
          e.kill = HLE.kill;
          e.death = HLE.death;
          e.assist = HLE.assist;
          e.KDA = ((HLE.kill + HLE.assist) / HLE.death).toFixed(2);
          break;
        case 'Liiv SANDBOX':
          e.teamName = 'LSB';
          e.kill = LSB.kill;
          e.death = LSB.death;
          e.assist = LSB.assist;
          e.KDA = ((LSB.kill + LSB.assist) / LSB.death).toFixed(2);
          break;
        case 'Fredit BRION':
          e.teamName = 'BRO';
          e.kill = BRO.kill;
          e.death = BRO.death;
          e.assist = BRO.assist;
          e.KDA = ((BRO.kill + BRO.assist) / BRO.death).toFixed(2);
          break;
        case 'Kwangdong Freecs':
          e.teamName = 'KDF';
          e.kill = KDF.kill;
          e.death = KDF.death;
          e.assist = KDF.assist;
          e.KDA = ((KDF.kill + KDF.assist) / KDF.death).toFixed(2);
          break;
        default:
          break;
      }
    })

    var connection = await mysql.createPool(
      port
    );


    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query('SELECT * FROM polol.team');

      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < teamRank.length; j++) {
          if (rows[i].TeamName === teamRank[j].teamName) {
            let sql = "UPDATE `polol`.`team` SET `win`=?, `lose`=?, `difference`=?, `KDA`=?, `kill`=?, `death`=?, `assist`=?, `rank`=?, `rate`=? WHERE `TeamName` = '" + rows[i].TeamName + "'";
            await promisePool.query(sql, [teamRank[j].win, teamRank[j].lose, teamRank[j].difference
              , teamRank[j].KDA, teamRank[j].kill, teamRank[j].death, teamRank[j].assist
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

      promisePool.end();
    } catch (error) {
      console.log(error);
    }


  } catch (error) {
    console.error(error);
  }
}

getTeam();


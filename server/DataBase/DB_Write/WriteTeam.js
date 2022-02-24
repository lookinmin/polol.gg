const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');

const getTeam = async (str) => {
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
  const SplitScore = (score) => {
    const newScore = score.split(" - ");
    return newScore;
  }
  var BRO = {
    Kill: 0,
    Death: 0,
    Assist: 0,
    KDA:0
  };
  var DK = {
    Kill: 0,
    Death: 0,
    Assist: 0,
    KDA:0
  };
  var DRX = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var GEN = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var HLE = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var KDF = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var KT = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var LSB = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var NS = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  var T1 = {
    Kill:0,
    Death:0,
    Assist:0,
    KDA:0
  };
  const changeName = (e) => {
    var result;
    switch (e) {
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
  try {
    var teamRank = [BRO, DK, DRX, GEN, KT, LSB, HLE, T1, KDF, NS];

    var nowRank = [];


    let [year,season]=get_season_name(str);
    const teamTable = await axios.get('https://lol.fandom.com/wiki/LCK/20'+year+'_Season/'+season+'_Season');
    const $ = cheerio.load(teamTable.data);

    for (let i = 2; i < $('table.standings > tbody > tr').length; i++) {
      let score = SplitScore($(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(3)`).text());
      switch ($(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span.team > span.teamname`).text()) {
        case 'Gen.G':
          GEN.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          GEN.win = score[0];
          GEN.lose = score[1];
          GEN.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          GEN.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          GEN.title = "GEN"
          break;
        case 'T1':
          T1.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          T1.win = score[0];
          T1.lose = score[1];
          T1.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          T1.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          T1.title = "T1"
          break;
        case 'Nongshim RedForce':
          NS.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          NS.win = score[0];
          NS.lose = score[1];
          NS.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          NS.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          NS.title = "NS"
          break;
        case 'DWG KIA':
          DK.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          DK.win = score[0];
          DK.lose = score[1];
          DK.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          DK.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          DK.title = "DK"
          break;
        case 'KT Rolster':
          KT.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          KT.win = score[0];
          KT.lose = score[1];
          KT.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          KT.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          KT.title = "KT"
          break;
        case 'DRX':
          DRX.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          DRX.win = score[0];
          DRX.lose = score[1];
          DRX.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          DRX.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          DRX.title = "DRX"
          break;
        case 'Hanwha Life Esports':
          HLE.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          HLE.win = score[0];
          HLE.lose = score[1];
          HLE.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          HLE.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          HLE.title = "HLE"
          break;
        case 'Liiv SANDBOX':
          LSB.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          LSB.win = score[0];
          LSB.lose = score[1];
          LSB.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          LSB.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          LSB.title = "LSB"
          break;
        case 'Fredit BRION':
          BRO.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          BRO.win = score[0];
          BRO.lose = score[1];
          BRO.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          BRO.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          BRO.title = "BRO"
          break;
        case 'Kwangdong Freecs':
          KDF.rank = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text();
          KDF.win = score[0];
          KDF.lose = score[1];
          KDF.rate = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text();
          KDF.difference = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text();
          KDF.title = "KDF"
          break;
        default:
          break;
      }
    }



    const team_all_KDA = await axios.get('https://lol.fandom.com/wiki/LCK/20'+year+'_Season/'+season+'_Season/Player_Statistics');
    const team_KDA = cheerio.load(team_all_KDA.data);

    for (let i = 5; i < team_KDA('table.spstats  tbody  tr').length; i++) {
      let teamname_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td a')[0].attribs.title;
      let gamecount_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(3)').text();
      let kill_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(7)').text() * gamecount_data);
      let death_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(8)').text() * gamecount_data);
      let assist_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(9)').text() * gamecount_data);
      switch (teamname_data) {
        case 'Gen.G':
          GEN.Kill += kill_data;
          GEN.Death += death_data;
          GEN.Assist += assist_data;
          break;
        case 'T1':
          T1.Kill += kill_data;
          T1.Death += death_data;
          T1.Assist += assist_data;
          break;
        case 'Nongshim RedForce':
          NS.Kill += kill_data;
          NS.Death += death_data;
          NS.Assist += assist_data;
          break;
        case 'DWG KIA':
          DK.Kill += kill_data;
          DK.Death += death_data;
          DK.Assist += assist_data;
          break;
        case 'KT Rolster':
          KT.Kill += kill_data;
          KT.Death += death_data;
          KT.Assist += assist_data;
          break;
        case 'DRX':
          DRX.Kill += kill_data;
          DRX.Death += death_data;
          DRX.Assist += assist_data;
          break;
        case 'Hanwha Life Esports':
          HLE.Kill += kill_data;
          HLE.Death += death_data;
          HLE.Assist += assist_data;
          break;
        case 'Liiv SANDBOX':
          LSB.Kill += kill_data;
          LSB.Death += death_data;
          LSB.Assist += assist_data;
          break;
        case 'Fredit BRION':
          BRO.Kill += kill_data;
          BRO.Death += death_data;
          BRO.Assist += assist_data;
          break;
        case 'Kwangdong Freecs':
          KDF.Kill += kill_data;
          KDF.Death += death_data;
          KDF.Assist += assist_data;
          break;
        default:
          break;
      }
    }
    GEN.KDA = ((GEN.Kill + GEN.Assist) / GEN.Death).toFixed(2);
    T1.KDA = ((T1.Kill + T1.Assist) / T1.Death).toFixed(2);
    NS.KDA = ((NS.Kill + NS.Assist) / NS.Death).toFixed(2);
    DK.KDA = ((DK.Kill + DK.Assist) / DK.Death).toFixed(2);
    KT.KDA = ((KT.Kill + KT.Assist) / KT.Death).toFixed(2);
    DRX.KDA = ((DRX.Kill + DRX.Assist) / DRX.Death).toFixed(2);
    HLE.KDA = ((HLE.Kill + HLE.Assist) / HLE.Death).toFixed(2);
    LSB.KDA = ((LSB.Kill + LSB.Assist) / LSB.Death).toFixed(2);
    BRO.KDA = ((BRO.Kill + BRO.Assist) / BRO.Death).toFixed(2);
    KDF.KDA = ((KDF.Kill + KDF.Assist) / KDF.Death).toFixed(2);

    for (let k = 0; k < 10; k++) {}

    var connection = await mysql.createPool(
      port
    );

    nowRank.sort(function (a, b) {
      if (a.rank > b.rank) {
        return 1;
      }
      if (a.rank < b.rank) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
    for (let i of nowRank) {
      i.Name = changeName(i.Name);
    }

    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query('SELECT * FROM stack.'+str+'_regular_team');

      for (let j = 0; j < teamRank.length; j++) {
        let sql = "UPDATE `stack`.`"+str+"_regular_team` SET `Win`=?, `Lose`=?, `Difference`=?, `KDA`=?, `Kill`=?, `Death`=?, `Assist`=?, `Rank`=?, `Rate`=? WHERE `TeamName` = '" + teamRank[j].title + "'";
        await promisePool.query(sql, [teamRank[j].win, teamRank[j].lose, teamRank[j].difference, teamRank[j].KDA, teamRank[j].Kill, teamRank[j].Death, teamRank[j].Assist, teamRank[j].rank, teamRank[j].rate],
          function (err, rows, field) {
            if (err) {
              console.log('dbwrite: ' + err);
            } else {
              console.log("data inserted");
            }
          })
      }
      promisePool.end();
    } catch (error) {
      console.log(error);
    }


  } catch (error) {
    console.log(error);
  }
  console.log(str+"team update")
}

module.exports = {
  getTeam: getTeam
};
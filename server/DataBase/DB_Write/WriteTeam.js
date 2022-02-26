const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql2');
const port = require('../port/pololPort');
const teamname_matching = (teamname) => { //팀풀네임과 줄임말 매칭
  const is_shortcut = (word1, word2) => {
    let i = 0
    word:
      for (let temp of word1) {
        for (; i < word2.length; i++) {
          if (temp == word2[i]) {
            i = i + 1;
            continue word;
          }
        }
        return false;
      }
    return true;
  }
  let lower_words = {
    short: [],
    full: []
  }
  for (let temp of teamname.short) {
    lower_words.short.push(temp.toLowerCase());
  }
  for (let temp of teamname.full) {
    lower_words.full.push(temp.toLowerCase());
  }
  let result = [];
  for (let short = 0; short < lower_words.short.length; short++) {
    let temp = {
      name: teamname.short[short],
      maybe: []
    }
    for (let full = 0; full < lower_words.full.length; full++) {
      if (is_shortcut(lower_words.short[short], lower_words.full[full])) {
        temp.maybe.push(teamname.full[full])
      }
    }
    result.push(temp);
  }
  var map = new Map()
  var overlaped = [];
  for (let temp of result) {
    if (temp.maybe.length == 1) {
      map.set(temp.maybe[0], temp.name);
    } else {
      overlaped.push(temp);
    }
  }
  for (let temp of overlaped) {
    for (let tmp of temp.maybe) {
      if (!map.has(tmp)) {
        map.set(tmp, temp.name);
      }
    }
  }
  return map;
}
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

  try {
    var teamRank = [];

    let [year, season] = get_season_name(str);
    const teamTable = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Season');
    const $ = cheerio.load(teamTable.data);

    for (let i = 2; i < $('table.standings > tbody > tr').length; i++) {
      let score = $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(3)`).text().split(" - ");
      teamRank.push({
        rank: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`).text(),
        win: score[0],
        lose: score[1],
        rate: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(4)`).text(),
        difference: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(7)`).text(),
        title: $(`table.standings > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span.team > span.teamname`).text(),
        Kill :0,
        Death : 0,
        Assist : 0,
        KDA:0
      })
    }


    const team_all_KDA = await axios.get('https://lol.fandom.com/wiki/LCK/20' + year + '_Season/' + season + '_Season/Player_Statistics');
      const team_KDA = cheerio.load(team_all_KDA.data);

      for (let i = 5; i < team_KDA('table.spstats  tbody  tr').length; i++) {
        let teamname_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td a')[0].attribs.title;
        let gamecount_data = team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(3)').text();
        let kill_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(7)').text() * gamecount_data);
        let death_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(8)').text() * gamecount_data);
        let assist_data = Math.round(team_KDA('table.spstats  tbody  tr:nth-child(' + i + ') td:nth-child(9)').text() * gamecount_data);
        switch (teamname_data) {
          case teamRank[0].title:
            teamRank[0].Kill += kill_data;
          teamRank[0].Death += death_data;
          teamRank[0].Assist += assist_data;
          break;
          case teamRank[1].title:
            teamRank[1].Kill += kill_data;
          teamRank[1].Death += death_data;
          teamRank[1].Assist += assist_data;
          break;
          case teamRank[2].title:
            teamRank[2].Kill += kill_data;
          teamRank[2].Death += death_data;
          teamRank[2].Assist += assist_data;
          break;
          case teamRank[3].title:
            teamRank[3].Kill += kill_data;
          teamRank[3].Death += death_data;
          teamRank[3].Assist += assist_data;
          break;
          case teamRank[4].title:
            teamRank[4].Kill += kill_data;
          teamRank[4].Death += death_data;
          teamRank[4].Assist += assist_data;
          break;
          case teamRank[5].title:
            teamRank[5].Kill += kill_data;
          teamRank[5].Death += death_data;
          teamRank[5].Assist += assist_data;
          break;
          case teamRank[6].title:
            teamRank[6].Kill += kill_data;
          teamRank[6].Death += death_data;
          teamRank[6].Assist += assist_data;
          break;
          case teamRank[7].title:
            teamRank[7].Kill += kill_data;
          teamRank[7].Death += death_data;
          teamRank[7].Assist += assist_data;
          break;
          case teamRank[8].title:
            teamRank[8].Kill += kill_data;
          teamRank[8].Death += death_data;
          teamRank[8].Assist += assist_data;
          break;
          case teamRank[9].title:
            teamRank[9].Kill += kill_data;
          teamRank[9].Death += death_data;
          teamRank[9].Assist += assist_data;
          break;
          default:
          break;
        }
      }
      let temp_teamfullname = [];
    for (let team_name of teamRank) {
      if(team_name.Death==0){
        team_name.Death=0.9
      }
      team_name.KDA=((team_name.Kill + team_name.Assist) / team_name.Death).toFixed(2);
      temp_teamfullname.push(team_name.title);
    }
    try {
      var connection = await mysql.createPool(
        port
      );
      const promisePool = connection.promise();
      const [rows] = await promisePool.query('SELECT TeamName FROM stack.' + str + '_regular_team');
      let temp_teamshortname=[];
      for (let team_name of rows) {
        temp_teamshortname.push(team_name.TeamName);
      }
      

      let fullname2short = teamname_matching({
        short: temp_teamshortname,
        full: temp_teamfullname
      })
      console.log(fullname2short)
      for (let j = 0; j < teamRank.length; j++) {
        let sql = "UPDATE `stack`.`"+str+"_regular_team` SET `Win`=?, `Lose`=?, `Difference`=?, `KDA`=?, `Kill`=?, `Death`=?, `Assist`=?, `Rank`=?, `Rate`=? WHERE `TeamName` = '" + fullname2short.get(teamRank[j].title) + "'";
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
  console.log(str + "team update")
}

module.exports = {
  getTeam: getTeam
};
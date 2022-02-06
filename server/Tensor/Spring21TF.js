console.log('21Spring start');
const axios = require("axios");
const cheerio = require("cheerio");

var teamData = [];
var playerData = [];

const Tower = (kill, lost) => {
  return (Number(kill) / Number(lost)).toFixed(2);
}

const getTeamData = async () => {
  try {
    return await axios.get('https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCK%20Spring%202021/');
  } catch (error) {
    throw error;
  }
}

getTeamData()
  .then((html) => {
    const $ = cheerio.load(html.data);
    for (let i = 1; i <= 10; i++) {
      teamData.push({
        name: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text(),
        winRate: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text(),
        KD: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text(),
        GDM: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text(),
        tower: Tower($(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(12)`).text(),
          $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(13)`).text()),
        DRA: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(17)`).text(),
        GD15: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(22)`).text(),
        NASH: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(24)`).text(),
        CSM: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(25)`).text(),
        DPM: $(`table.table_list > tbody > tr:nth-child(${i}) > td:nth-child(26)`).text(),
      })
    }
  })

const getPlayerData = async () => {
  try {
    return await axios.get('https://gol.gg/players/list/season-ALL/split-ALL/tournament-LCK%20Spring%202021/');
  } catch (error) {
    throw error;
  }
}

getPlayerData()
  .then((html) => {
    const $ = cheerio.load(html.data);
    for (let i = 0; i < $(`table.table_list > tbody > tr`).length; i++) {
      playerData.push({
        name: $(`table.table_list > tbody > tr:nth-child(${i + 1}) 
        > td:nth-child(1)`).text(),
        position: $(`table.table_list > tbody > tr:nth-child(${i}) 
        > td:nth-child(3)`).text(),
        games: $(`table.table_list > tbody > tr:nth-child(${i + 1}) 
        > td:nth-child(4)`).text(),
        winRate: $(`table.table_list > tbody > tr:nth-child(${i + 1}) 
        > td:nth-child(5)`).text(),
        KDA: $(`table.table_list > tbody > tr:nth-child(${i + 1}) 
        > td:nth-child(6)`).text(),
        KP: $(`table.table_list > tbody > tr:nth-child(${i + 1}) 
        > td:nth-child(12)`).text(),
      })
    }
  })
  .then(() => {
    // console.log(playerData[0]);
  })

const spring21 = {
  team: teamData,
  player: playerData
}

module.exports = {
  spring21: spring21
}
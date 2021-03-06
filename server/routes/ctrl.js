const DB = require('../DataBase/ReadDB');
const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
const WriteTeam = require('../DataBase/DB_Write/WriteTeam.js');
const WritePlayer = require('../DataBase/DB_Write/WritePlayer.js');
const Champions = require('../DataBase/Crawling/Champions');


const output = {

  home: async (req,res) => {
    const read = new DB();
    const Data = await read.getHistory();
    const champion = await read.getChampions();
    const rank = await read.getRank();
    const Playoff = await read.getPlayOff();
    res.send({
      data: Data,
      champion: champion,
      Rank : rank,
      Playoff : Playoff
    });
  },

  playoff: async (req,res) => {
    const read = new DB();
    const Data = await read.getPlayOff();
    res.send({
      data: Data
    });
  },

  rank: async (req,res) => {
    const read = new DB();
    const Data = await read.getTeam();
    const Data2 = await read.getPlayer();
 
    res.send({
      Team: Data,
      Player : Data2,
    });
  },

  team: async (req,res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    const Data2 = await read.getCoach();

    const final = Data.concat(Data2);
    res.send(final);
  },

  players: async (req,res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    res.send(Data);
  }
};

module.exports = { output };
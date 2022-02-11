const DB = require('../DataBase/ReadDB');
const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
const WriteTeam = require('../DataBase/DB_Write/WriteTeam.js');
const WritePlayer = require('../DataBase/DB_Write/WritePlayer.js');


const output = {

  home: async (req,res) => {
    const read = new DB();
    const Data = await read.getHistory();
    res.send({
      data: Data
    });
  },

  tournament: async (req,res) => {
    res.send("HI");
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
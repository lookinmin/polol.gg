const Player21Spring = require("../DataBase/Crawling/Player21Spring");
const Player21Summer = require("../DataBase/Crawling/Player21Summer");
const DB = require('../DataBase/ReadDB');
// const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
// const WriteTeam = require('../DataBase/DB_Write/WriteTeam.js');
// const WritePlayer = require('../DataBase/DB_Write/WritePlayer.js');
const Spring22TF = require('../Tensor/Spring22TF');
const Summer21TF = require('../Tensor/Summer21TF');
const Spring21TF = require('../Tensor/Spring21TF');

const output = {

  home: async (req,res) => {
    const read = new DB();
    const Data = await read.getHistory();
    const spring22 = Spring22TF.spring22;
    const summer21 = Summer21TF.summer21;
    const spring21 = Spring21TF.spring21;
    
    res.send({
      data: Data,
      spring22: spring22,
      summer21: summer21,
      spring21: spring21
    });
  },

  predict: async (req,res) => {
    const read = new DB();
    const Data = await read.getMatch();
    const Data2 = await read.getTeam();

    const final = Data.concat(Data2);
    res.send(final);
  },

  rank: async (req,res) => {
    const read = new DB();
    const Data = await read.getTeam();
    const Data2 = await read.getSpring2021();
    const Data3 = await read.getSummer2021();
    const Data4 = await read.getPlayer();
    const player21Spring = Player21Spring.player21SpringData;
    const player21Summer = Player21Summer.player21SummerData;

    res.send({
      Team: Data,
      Spring2021: Data2,
      Summer2021: Data3,
      Player : Data4,
      Spring21: player21Spring,
      Summer21: player21Summer
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
  },
};

module.exports = { output };
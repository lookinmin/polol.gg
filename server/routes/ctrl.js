const Player21Spring = require("../DataBase/Player21Spring");
const Player21Summer = require("../DataBase/Player21Summer");
const DB = require('../DataBase/ReadDB');

const output = {
  main: (req, res) => {
    res.send({
      Player21Spring: Player21Spring.player21SpringData,
      Player21Summer: Player21Summer.player21SummerData
    });
  },

  home: async (req,res) => {
    const read = new DB();
    const Data = await read.getMatch();
    res.send(Data);
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

    const final = Data.concat(Data2, Data3);
    res.send(final);
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
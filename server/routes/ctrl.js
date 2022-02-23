const DB = require('../DataBase/ReadDB');
const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
const WriteTeam = require('../DataBase/DB_Write/WriteTeam');
const WritePlayer = require('../DataBase/DB_Write/WritePlayer');
//const WriteBanPick = require('../DataBase/DB_Write/WriteBanPick');
//const WritePlayOff = require("../DataBase/DB_Write/WritePlayoff");
const tableMaker = require('../DataBase/MakeDB/tableMaker');
const { Dropdown } = require('react-bootstrap');

const output = {
  home: async (req, res) => {
    const read = new DB();
    const Data = await read.getHistory();
    const champion = await read.getChampions();
    const rank = await read.getRank();
    const Playoff = await read.getPlayOff();
    res.send({
      data: Data,
      champion: champion,
      Rank: rank,
      Playoff: Playoff
    });
  },

  playoff: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayOff();
    res.send({
      data: Data
    });
  },

  rank: async (req, res) => {
    const read = new DB();
    const Data = await read.getTeam();
    const Data2 = await read.getPlayer();

    res.send({
      Team: Data,
      Player: Data2,
    });
  },

  team: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    const Data2 = await read.getCoach();

    const final ={
      Player:Data,
      Coach:Data2
    }
    res.send(final);
  },

  players: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    res.send(Data);
  }
};

const process = {
  manage: async (req, res) => {
    const make = new tableMaker();
    if (req.body.case === 1) {
      await make.makeTable(req.body.data);
    } else if (req.body.case === 2) {
      await make.addNewCoach(req.body.data);
    } else if (req.body.case === 3) {
      await make.deleteCoach(req.body.data);
    }
  }

}
module.exports = { output, process };
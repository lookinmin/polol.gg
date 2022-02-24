const DB = require('../DataBase/ReadDB');
const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
const WriteTeam = require('../DataBase/DB_Write/WriteTeam');
const WritePlayer = require('../DataBase/DB_Write/WritePlayer');
const WriteBanPick = require('../DataBase/DB_Write/WriteBanPick');
const WritePlayOff = require("../DataBase/DB_Write/WritePlayoff");
const tableMaker = require('../DataBase/MakeDB/tableMaker');

var targetData;

const output = {
  home: async (req, res) => {
    const read = new DB();
    const Data = await read.getHistory();
    const champion = await read.getChampions();
    const rank = await read.getRank();
    const Playoff = await read.getPlayOff();
    const Season = await read.getSeason();
    res.send({
      data: Data,
      champion: champion,
      Rank: rank,
      Playoff: Playoff,
      Season: Season
    });
  },

  playoff: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayOff();
    const Season = await read.getSeason();
    res.send({
      data: Data,
      Season: Season
    });
  },

  rank: async (req, res) => {
    const read = new DB();
    const Data = await read.getTeam('spring22');
    const Data2 = await read.getPlayer('spring22');
    const Season = await read.getSeason();
    // res.send({
    //   Team: Data,
    //   Player: Data2,
    //   Season : Season
    // });
  },

  team: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    const Data2 = await read.getCoach();
    const Season = await read.getSeason();
    const final = {
      Player: Data,
      Coach: Data2,
      Season: Season
    }
    res.send(final);
  },

  players: async (req, res) => {
    const read = new DB();
    const Data = await read.getPlayer();
    const Season = await read.getSeason();
    res.send({
      Data: Data,
      Season: Season
    });
  }
};

const process = {
  manage: async (req, res) => {
    const make = new tableMaker();
    const BanPick = new WriteBanPick();
    const PlayOff = new WritePlayOff();

    console.log("funck you");

    switch (req.body.case) {
      case 1:     //새로운 DB 이름 (계절 + 년도)
        await make.makeTable(req.body.data);
        await PlayOff.changePODB(req.body.data);
        break;
      case 2:     //새로 추가되는 Coach
        await make.addNewCoach(req.body.data);
        break;
      case 3:     //Coach DB에서 delete
        await make.deleteCoach(req.body.data);
        break;
      case 4:     //챔피언 밴픽 시즌 리로딩
        targetData = req.body.data;
        await BanPick.getAllBanChampions(targetData);
        break;
      case 5:     //이번시즌 플레이오프 match History URL
        await PlayOff.changePlayOff(req.body.data);
        break;
      default:
        break;
    }
  },
  rank: async (req, res) => {
    const dbName = makeDBName(req.body.url);
    const read = new DB();
    const Data = await read.getTeam(dbName);
    const Data2 = await read.getPlayer(dbName);
    const Season = await read.getSeason();
    res.send({
      Team: Data,
      Player: Data2,
      Season: Season
    });
  }
}

const makeDBName = (name) => {
  const newName = name.split(" ");
  const num = newName[0];
  const newNum = String(num[2])+String(num[3]);
  const eng = newName[2].toLowerCase();
  return eng + newNum;
}

module.exports = { output, process };
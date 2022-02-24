const DB = require('../DataBase/ReadDB');
const WriteMatchResult = require('../DataBase/DB_Write/WriteMatchResult');
const WriteTeam = require('../DataBase/DB_Write/WriteTeam');
const WritePlayer = require('../DataBase/DB_Write/WritePlayer');
const WriteBanPick = require('../DataBase/DB_Write/WriteBanPick');
const WritePlayOff = require("../DataBase/DB_Write/WritePlayoff");
const tableMaker = require('../DataBase/MakeDB/tableMaker');
const WriteRegularPlayer = require('../DataBase/MakeDB/RegularPlayer_team');
const match_schedule = require('../DataBase/MakeDB/match_schedule');
const schedule = require('node-schedule');

const Lowest = require('../DataBase/DB_Read/lowest/DBName');

var targetData;
const updatematch=new WriteMatchResult();
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
    var ON = new Lowest();
    var BB = await ON.Submit();
    
    var num = BB.length-1;

    const sliceString =(e)=> {
      var First = e.split('_');
      var F_str = First[0];
      return F_str;
    }

    var target = sliceString(BB[num]);
    const read = new DB();
    const Data = await read.getTeam(target);
    const Data2 = await read.getPlayer(target);
    const Season = await read.getSeason(target);
    res.send({
      Team: Data,
      Player: Data2,
      Season : Season
    });
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

    console.log("funck you minsu ㅋ");

    switch(req.body.case){
      case 1:{     //새로운 DB 이름 (계절 + 년도)
        // await make.makeTable(req.body.data);//테이블 생성
        // await PlayOff.changePODB(req.body.data);
        // await WriteRegularPlayer.MPD(req.body.data);//정규시즌 선수, 팀 프레임 생성
        let match_period=await match_schedule.ms(req.body.data);//매치 일정 프레임 생성
        let period="00 0,30 0-1,17-23 * "+match_period.start+"-"+match_period.end+" 0,3-6"
        updatematch.getMatchResult(req.body.data);
        // WriteTeam.getTeam(req.body.data);
        // WritePlayer.getPlayer(req.body.data);
        console.log(period);
        schedule.gracefulShutdown();
        schedule.scheduleJob(period, function(date){
          updatematch.getMatchResult(req.body.data);
          console.log("시간 됐다");
        });
        break;
      }
      case 2:     //새로 추가되는 Coach
        await make.addNewCoach(req.body.data);
        break;
      case 3:     //Coach DB에서 delete
        await make.deleteCoach(req.body.data);
        break;
      case 5:     //이번시즌 플레이오프 match History URL
        await PlayOff.changePlayOff(req.body.data);
        break;
      case 6:     //플옵 플레이어
        break;
      case 7:     //플옵 팀
        break;
      default:
        break;
    }
  },

  rank: async (req, res) => {
    console.log(req.body.url);
    if(req.body.url === undefined){
      let target;
      var ON = new Lowest();
      var BB = await ON.Submit();
      const read = new DB();
      const tmpData = await read.getTeam(BB[0]);
      if(tmpData.length === 0){
        target = BB[1];
      }else{
        target = BB[0];
      }
      const Data = await read.getTeam(target);
      const Data2 = await read.getPlayer(target);
      const Season = await read.getSeason(target);
      res.send({
        Team: Data,
        Player: Data2,
        Season : Season
      });
    }else {
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
}

const makeDBName = (name) => {
  const newName = name.split(" ");
  if (newName.length === 3) {
    const num = newName[0];
    const newNum = String(num[2]) + String(num[3]);
    const eng = newName[2].toLowerCase();
    return eng + newNum + "_regular";
  } else if (newName.length === 4) {
    const num = newName[0];
    const newNum = String(num[2]) + String(num[3]);
    const eng = newName[2].toLowerCase();
    return eng + newNum + "_playoff";
  }
}

module.exports = { output, process };
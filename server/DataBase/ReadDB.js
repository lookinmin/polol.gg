"use strict"

const CoachDB = require("./DB_Read/CoachDB");
const TeamDB = require("./DB_Read/TeamDB");
const PlayerDB = require("./DB_Read/PlayerDB");
const HistoryDB = require("./DB_Read/HistoryDB");
const PlayOffDB = require("./DB_Read/PlayOffDB");
const ChampionsDB = require('./DB_Read/ChampionsDB');
//각 DB 받아오는 부분 여기까지 FIX

class ReadDB{
  async getCoach(){
    const DB = new CoachDB();
    const RD = await DB.Get_CoachInfo();
    return RD;
  }

  async getPlayer(){
    const DB = new PlayerDB();
    const RD = await DB.Get_PlayerInfo();
    return RD;
  }

  async getTeam(){
    const DB = new TeamDB();
    const RD = await DB.Get_TeamInfo();
    return RD;
  }

  async getRank(){
    const DB = new TeamDB();
    const RD = await DB.Get_TeamRank();
    return RD;
  }

  async getHistory(){
    const DB = new HistoryDB();
    const RD = await DB.Get_HistoryInfo();
    return RD;
  }

  async getPlayOff(){
    const DB = new PlayOffDB();
    const RD = await DB.Get_PlayOffInfo();
    return RD;
  }

  async getChampions(){
    const DB = new ChampionsDB();
    const RD = await DB.Get_ChampionsInfo();
    return RD;
  }
}

module.exports = ReadDB;
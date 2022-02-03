"use strict"

const CoachDB = require("./DB_Read/CoachDB");
const TeamDB = require("./DB_Read/TeamDB");
const PlayerDB = require("./DB_Read/PlayerDB");
const MatchDB = require("./DB_Read/matchDB");
const HistoryDB = require("./DB_Read/HistoryDB");
const spring2021 = require("./DB_Read/spring2021");
const summer2021 = require("./DB_Read/summer2021");

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

  async getMatch(){
    const DB = new MatchDB();
    const RD = await DB.Get_MatchInfo();
    return RD;
  }

  async getTeam(){
    const DB = new TeamDB();
    const RD = await DB.Get_TeamInfo();
    return RD;
  }

  async getHistory(){
    const DB = new HistoryDB();
    const RD = await DB.Get_HistoryInfo();
    return RD;
  }

  async getSpring2021(){
    const DB = new spring2021();
    const RD = await DB.Get_Spring2021();
    return RD;
  }

  async getSummer2021(){
    const DB = new summer2021();
    const RD = await DB.Get_Summer2021();
    return RD;
  }
}

module.exports =  ReadDB;
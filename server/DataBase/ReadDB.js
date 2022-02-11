"use strict"

const CoachDB = require("./DB_Read/CoachDB");
const TeamDB = require("./DB_Read/TeamDB");
const PlayerDB = require("./DB_Read/PlayerDB");
const MatchDB = require("./DB_Read/matchDB");
const HistoryDB = require("./DB_Read/HistoryDB");
const spring2021 = require("./DB_Read/spring2021");
const summer2021 = require("./DB_Read/summer2021");
const TF_Sp22 = require("./DB_Read/TFDB_22Spring");
const TF_Sp21 = require("./DB_Read/TFDB_21Spring");
const TF_Su22 = require("./DB_Read/TFDB_21Summer");

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

  async get22Sp(){
    const DB = new TF_Sp22();
    const RD = await DB.Get_DataInfo();
    return RD;
  }

  async get22Sp_Split(){
    const DB = new TF_Sp22();
    const splitByRole = await DB.SplitByRole();
    return splitByRole;
  }

  async get21Sp(){
    const DB = new TF_Sp21();
    const RD = await DB.Get_DataInfo();
    return RD;
  }

  async get21Sp_Split(){
    const DB = new TF_Sp21();
    const splitByRole = await DB.SplitByRole();
    return splitByRole;
  }

  async get22Su(){
    const DB = new TF_Su22();
    const RD = await DB.Get_DataInfo();
    return RD;
  }

  async get22Su_Split(){
    const DB = new TF_Su22();
    const splitByRole = await DB.SplitByRole();
    return splitByRole;
  }
}

module.exports = ReadDB;
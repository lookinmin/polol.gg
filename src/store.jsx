import { createStore } from "redux";
import axios from "axios";

export default createStore((state, action) => {
  var LCK = {
    TeamName : "",
    TeamRate : "",
    TeamUrl : "",
  }

  if(state === undefined){
    LCK.TeamName = "LCK";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://thefutureoflck.com/"
  }
  if(action.type === "T1"){
    LCK.TeamName = "T1";
    LCK.TeamRate ="";
    LCK.TeamUrl = "https://t1.gg/"
  }
  if(action.type === "DK"){
    LCK.TeamName = "DWG KIA";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://dwgkia.gg/"
  }
  if(action.type === "GEN"){
    LCK.TeamName = "GEN.G";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://geng.gg/"
  }
  if(action.type === "NS"){
    LCK.TeamName = "NS REDFORCE";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://ns-esports.com/"
  }
  if(action.type === "LSB"){
    LCK.TeamName = "Liiv SB";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://www.sandbox.co.kr/esports"
  }
  if(action.type === "KDF"){
    LCK.TeamName = "KD Freecs";
    LCK.TeamRate = "";
    LCK.TeamUrl = "http://freecs.gg/main/main.html"
  }
  if(action.type === "KT"){
    LCK.TeamName = "KT Rolster";
    LCK.TeamRate = "";
    LCK.TeamUrl = "http://kt-sports.co.kr/sports/site/esports/rolster/bi.do"
  }
  if(action.type === "HLE"){
    LCK.TeamName = "Hanwha Life Esports";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://hle.kr/"
  }
  if(action.type === "BRO"){
    LCK.TeamName = "Fredit BRION";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://brionesports.gg/"
  }
  if(action.type === "DRX"){
    LCK.TeamName = "DRX";
    LCK.TeamRate = "";
    LCK.TeamUrl = "https://drx.gg/"
  }
  return LCK;
})
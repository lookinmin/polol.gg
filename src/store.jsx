import { createStore } from "redux";

export default createStore((state, action) => {
  var LCK = {
    TeamName : "",
    TeamImg : "",
    TeamUrl : "",

  }
  if(state === undefined){
    LCK.TeamName = "LCK";
    LCK.TeamImg = "img/LCK_whitesmoke.png";
    LCK.TeamUrl = "https://thefutureoflck.com/"
  }
  if(action.type === "T1"){
    LCK.TeamName = "T1";
    LCK.TeamImg = "img/T1.png";
    LCK.TeamUrl = "https://t1.gg/"
  }
  if(action.type === "DK"){
    LCK.TeamName = "DWG KIA";
    LCK.TeamImg = "img/DWG.png";
    LCK.TeamUrl = "https://dwgkia.gg/"
  }
  if(action.type === "GEN"){
    LCK.TeamName = "GEN.G";
    LCK.TeamImg = "img/GENG.png";
    LCK.TeamUrl = "https://geng.gg/"
  }
  if(action.type === "NS"){
    LCK.TeamName = "NS REDFORCE";
    LCK.TeamImg = "img/NS.png";
    LCK.TeamUrl = "https://ns-esports.com/"
  }
  if(action.type === "LSB"){
    LCK.TeamName = "Liiv SB";
    LCK.TeamImg = "img/LSB.png";
    LCK.TeamUrl = "https://www.sandbox.co.kr/esports"
  }
  if(action.type === "KDF"){
    LCK.TeamName = "KD Freecs";
    LCK.TeamImg = "img/AF.png";
    LCK.TeamUrl = "http://freecs.gg/main/main.html"
  }
  if(action.type === "KT"){
    LCK.TeamName = "KT Rolster";
    LCK.TeamImg = "img/KT.png";
    LCK.TeamUrl = "http://kt-sports.co.kr/sports/site/esports/rolster/bi.do"
  }
  if(action.type === "HLE"){
    LCK.TeamName = "Hanwha Life Esports";
    LCK.TeamImg = "img/HLE.png";
    LCK.TeamUrl = "https://hle.kr/"
  }
  if(action.type === "BRO"){
    LCK.TeamName = "Fredit BRION";
    LCK.TeamImg = "img/FB.png";
    LCK.TeamUrl = "https://brionesports.gg/"
  }
  if(action.type === "DRX"){
    LCK.TeamName = "DRX";
    LCK.TeamImg = "img/DRX.png";
    LCK.TeamUrl = "https://drx.gg/"
  }


  return LCK;
})
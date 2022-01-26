import React, { useEffect, useState } from "react";
import "./CSS/Table.css";
import axios from "axios";
import { CircleTable } from "./CircleTable";

export const Table = (TEAM) => {

  var playerPic = new Array();
  var T1s = new Array();
  var DKs = new Array();
  var GENs = new Array();
  var NSs = new Array();
  var LSBs = new Array();
  var KDFs = new Array();
  var KTs = new Array();
  var HLEs = new Array();
  var BROs = new Array();
  var DRXs = new Array();

  const [T1, setT1] = useState([]);
  const [DK, setDK] = useState([]);
  const [GEN, setGEN] = useState([]);
  const [NS, setNS] = useState([]);
  const [LSB, setLSB] = useState([]);
  const [KDF, setKDF] = useState([]);
  const [KT, setKT] = useState([]);
  const [HLE, setHLE] = useState([]);
  const [BRO, setBRO] = useState([]);
  const [DRX, setDRX] = useState([]);

  const [teamT1, setTeamT1] = useState([]);
  const [teamDK, setTeamDK] = useState([]);
  const [teamGEN, setTeamGEN] = useState([]);
  const [teamNS, setTeamNS] = useState([]);
  const [teamLSB, setTeamLSB] = useState([]);
  const [teamKDF, setTeamKDF] = useState([]);
  const [teamKT, setTeamKT] = useState([]);
  const [teamHLE, setTeamHLE] = useState([]);
  const [teamBRO, setTeamBRO] = useState([]);
  const [teamDRX, setTeamDRX] = useState([]);


  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/table");
      makeData(res.data.Team, res.data.Player);
    }

    var final = [];

    const makeData = (items, players) => {

      //팀이름 풀네임으로 바꿔주는 함수
      const makeTeamName = (e) => {
        var sult;
        switch (e) {
          case "T1":
            sult = "T1";
            break;
          case "DK":
            sult = "DWG KIA";
            break;
          case "GEN":
            sult = "GEN.G Esports";
            break;
          case "NS":
            sult = "NongShim RED Force";
            break;
          case "LSB":
            sult = "Liiv SANDBOX";
            break;
          case "KDF":
            sult = "KwangDong Freecs";
            break;
          case "KT":
            sult = "KT Rolster";
            break;
          case "HLE":
            sult = "Hanwha Life Esports";
            break;
          case "BRO":
            sult = "Fredit BRION";
            break;
          case "DRX":
            sult = "DRX";
            break;
          default:
            break;
        }
        return sult;
      }

      //각 선수의 사진 할당하는 함수
      const setPicture = (e) => {
        var reesult;
        switch (e) {
          case "T1":
            reesult = "img/0.PNG";
            break;
          case "DK":
            reesult = "img/1.PNG";
            break;
          case "GEN":
            reesult = "img/2.PNG";
            break;
          case "NS":
            reesult = "img/3.PNG";
            break;
          case "LSB":
            reesult = "img/4.PNG";
            break;
          case "KDF":
            reesult = "img/5.PNG";
            break;
          case "KT":
            reesult = "img/6.PNG";
            break;
          case "HLE":
            reesult = "img/7.PNG";
            break;
          case "BRO":
            reesult = "img/8.PNG";
            break;
          case "DRX":
            reesult = "img/9.PNG";
            break;
          default:
            break;
        }
        return reesult;
      };

      //각 선수의 포지션 마다 맞는 사진 배치하는 함수
      const positionPic = (e) => {
        var result;
        switch(e){
          case "TOP" : 
            result = "img/positions/TOP.png";
            break;
          case "JG" :
            result = "img/positions/JGL.png";
            break;
          case "MID" :
            result = "img/positions/MID.png";
            break;
          case "ADC" :
            result = "img/positions/AD.png";
            break;
          case "SPT" :
            result = "img/positions/SPT.png";
            break;
        }
        return result;
      }

      //득실차 앞에 +, - 찍는 함수
      const show_diff = (e) => {
        var show;
        if(e > 0){
          show = "+" + e;
        }
        else{
          show = e;
        }
        return show;
      }
      

      // 선수를 각 팀에 맞게 분류하는 함수
      const classify = () => {
        for(let i = 0; i < 62 ; i ++ ){
          playerPic[i] = ("img/"+players[i].team+"/"+players[i].Name+".png");
          switch(players[i].team){
            case "T1":
              T1s.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "DK":
              DKs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "GEN":
              GENs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "NS":
              NSs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "LSB":
              LSBs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "KDF":
              KDFs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "KT":
              KTs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "HLE":
              HLEs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "BRO":
              BROs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "DRX":
              DRXs.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
          }
        }
      }



      // 각 팀 데이터 할당
      for(let i = 0 ; i < 10 ; i ++){
        final[i] = {
          TeamName : makeTeamName(items[i].TeamName),
          TeamPic : setPicture(items[i].TeamName),
          win : items[i].win,
          lose : items[i].lose,
          difference : show_diff(items[i].difference),
          KDA : items[i].KDA,
          kill : items[i].kill,
          death : items[i].death,
          assist : items[i].assist,
          rank : items[i].rank,
          rate : items[i].rate,
          preRate : items[i].predictrate
        }
      }
      
      classify();

      for(let i = 0 ; i < 10 ; i++){
        switch(items[i].TeamName){
          case "T1" :
            setT1(final[i]);
            break;
          case "DK" :
            setDK(final[i]);
            break;
          case "GEN" :
            setGEN(final[i]);
            break;
          case "NS" :
            setNS(final[i]);
            break;
          case "LSB" :
            setLSB(final[i]);
            break;
          case "KDF" :
            setKDF(final[i]);
            break;
          case "KT" :
            setKT(final[i]);
            break;
          case "HLE" :
            setHLE(final[i]);
            break;
          case "BRO" :
            setBRO(final[i]);
            break;
          case "DRX" :
            setDRX(final[i]);
            break;
        }

        setTeamT1(T1s);
        setTeamDK(DKs);
        setTeamGEN(GENs);
        setTeamNS(NSs);
        setTeamLSB(LSBs);
        setTeamKDF(KDFs);
        setTeamHLE(HLEs);
        setTeamKT(KTs);
        setTeamBRO(BROs);
        setTeamDRX(DRXs);
      }
    }

    callApi();
  }, []);

  var select;
  var teamMem;


  //넘어오는 props 값에 따라 render할 팀 정함
  switch (TEAM){
    case "T1" :
      select = T1;
      teamMem = teamT1;
      break;
    case "DK" :
      select = DK;
      teamMem = teamDK;
      break;
    case "GEN" :
      select = GEN;
      teamMem = teamGEN;
      break;
    case "NS" :
      select = NS;
      teamMem = teamNS;
      break;
    case "LSB" :
      select = LSB;
      teamMem = teamLSB;
      break;
    case "KT" :
      select = KT;
      teamMem = teamKT;
      break;
    case "KDF" :
      select = KDF;
      teamMem = teamKDF;
      break;
    case "HLE" :
      select = HLE;
      teamMem = teamHLE;
      break;
    case "BRO" :
      select = BRO;
      teamMem = teamBRO;
      break;
    case "DRX" :
      select = DRX;
      teamMem = teamDRX;
      break;
  }

  select = T1;
  teamMem = teamT1;

  var renderMem = teamMem.map((num) => {
    return(
      <div className="S_PlayerInfo" key={num.Name}>
        <img src={num.pic} id="S_4_pic" width="auto" height="70px"/>
        <div className="S_4_under">
          <div className="S_POS">
            <img src={num.pos} id="S_4_pos" width="auto" height="20px"/>
          </div>
          <h2 className="S_name">{num.Name}</h2>
        </div>
      </div>
    )
  })
  
  return (
    <div className="T_BG">
      <div className="T_Screen">
        <div className="Screen_1">
          <div className="S_1_left">
            <img src={select.TeamPic} width="auto" height="100px" id="T_teamPic"/>
            <h2 className="T_teamName">{select.TeamName}</h2>
          </div>
          <div className="S_1_right">
            <h2 className="S_Rank">정규시즌 {select.rank}위</h2>
          </div>
        </div>

        <div className="Screen_2">
          <div className="S_2_left">
            <h2 className="S_Txt" id="S_win">{select.win}승</h2>
            <h2 className="S_Txt" id="S_lose">{select.lose}패</h2>
            <h2 className="S_Txt" id="S_diff">{select.difference}</h2>
            <h2 className="S_Txt" id="S_rate">승률 : {select.rate}%</h2>
          </div>

          <div className="S_2_right">
            <h2 className="S_Txt" id="S_preRate">예상 승률 : {select.preRate}%</h2>
          </div>
        </div>

        <div className="Screen_3">
          <div className="S_3_left">
            <h2 className="S_Txt2" id="S_KDA">KDA : {select.KDA}</h2>
            <h2 className="S_Txt2" id="S_kill">{select.kill} Kill</h2>
            <h2 className="S_Txt2" id="S_death">{select.death} Death</h2>
            <h2 className="S_Txt2" id="S_assist">{select.assist} Assist</h2>
          </div>

          <div className="S_3_right">
            <h2 className="S_Txt2" id="S_preRank">예상 최종순위 : 2위</h2>
          </div>
        </div>

        <div className="Screen_4">
          {renderMem}
        </div>

      </div>


      <div className="T_Circle">
        <CircleTable/>
      </div>

      <div className="underForPredict">
        <h2 id="underPolo">POLOL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id="explanation1">
              AI를 활용한 LCK 경기 결과 예측 프로그램입니다.
            </p>
            <p id="explanation2">상업적 이용을 금합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
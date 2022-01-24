import React, { useEffect, useState } from "react";
import "./CSS/Table.css";
import axios from "axios";
import { CircleTable } from "./CircleTable";

export const Table = () => {

  var playerPic = new Array();
  var T1 = new Array();
  var DK = new Array();
  var GEN = new Array();
  var NS = new Array();
  var LSB = new Array();
  var KDF = new Array();
  var KT = new Array();
  var HLE = new Array();
  var BRO = new Array();
  var DRX = new Array();

  const [selectTeam, setSelectTeam] = useState([]);
  const [nowTeam, setnowTeam] = useState([{
    teamT1 : [],
    teamDK : [],
    teamGEN : [],
    teamNS : [],
    teamLSB : [],
    teamKDF : [],
    teamKT : [],
    teamHLE : [],
    teamBRO : [],
    teamDRX : []
  }]);

  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/table");
      makeData(res.data.Team, res.data.Player);
    }

    var TableInfo = [];
    var final = [];

    const makeData = (items, players) => {
      for(let i = 0 ; i < 10 ; i ++){
        TableInfo[i] = {
          TeamName : items[i].TeamName,
          win : items[i].win,
          lose : items[i].lose,
          difference : items[i].difference,
          KDA : items[i].KDA,
          preRate : items[i].predictrate,
        }
      }

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


      const classify = () => {
        for(let i = 0; i < 62 ; i ++ ){
          playerPic[i] = ("img/"+players[i].team+"/"+players[i].Name+".png");
          switch(players[i].team){
            case "T1":
              T1.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "DK":
              DK.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "GEN":
              GEN.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "NS":
              NS.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "LSB":
              LSB.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "KDF":
              KDF.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "KT":
              KT.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "HLE":
              HLE.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "BRO":
              BRO.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
            case "DRX":
              DRX.push({
                Name : players[i].Name,
                pos : positionPic(players[i].position),
                pic : playerPic[i]
              })
              break;
          }
        }
      }

      for(let i = 0 ; i < 10 ; i ++){
        final[i] = {
          TeamName : TableInfo[i].TeamName,
          TeamPic : setPicture(TableInfo[i].TeamName),
          win : TableInfo[i].win,
          lose : TableInfo[i].lose,
          difference : TableInfo[i].difference,
          KDA : TableInfo[i].KDA,
          preRate : TableInfo[i].preRate
        }
      }
      
      classify();
      setnowTeam({
        teamT1 : T1,
        teamDK : DK,
        teamGEN : GEN,
        teamNS : NS,
        teamLSB : LSB,
        teamKDF : KDF,
        teamKT : KT,
        teamHLE : HLE,
        teamBRO : BRO,
        teamDRX : DRX
      })
      setSelectTeam(final);
    }

    callApi();
  }, []);


  return (
    <div className="T_BG">
      <div className="T_Screen">
        <div className="Screen_1">
          <div className="S_1_left">
            <img src="img/1.png" width="auto" height="100px" id="T_teamPic"/>
            <h2 className="T_teamName">DWG KIA</h2>
          </div>
          <div className="S_1_right">
            <h2 className="S_Rank">정규시즌 3위</h2>
          </div>
        </div>

        <div className="Screen_2">
          <div className="S_2_left">
            <h2 className="S_Txt" id="S_win">5승</h2>
            <h2 className="S_Txt" id="S_lose">2패</h2>
            <h2 className="S_Txt" id="S_diff">+8</h2>
            <h2 className="S_Txt" id="S_rate">승률 : 70%</h2>
          </div>

          <div className="S_2_right">
            <h2 className="S_Txt" id="S_preRate">예상 승률 : 77%</h2>
          </div>
        </div>

        <div className="Screen_3">
          <div className="S_3_left">
            <h2 className="S_Txt2" id="S_KDA">KDA : 3.14</h2>
            <h2 className="S_Txt2" id="S_kill">159 Kill</h2>
            <h2 className="S_Txt2" id="S_death">39 Death</h2>
            <h2 className="S_Txt2" id="S_assist">478 Assist</h2>
          </div>

          <div className="S_3_right">
            <h2 className="S_Txt2" id="S_preRank">예상 최종순위 : 2위</h2>
          </div>
        </div>

        <div className="Screen_4">
          {/* map으로 선수 띄워야 됨 */}
          <div className="S_PlayerInfo">
            <img src="img/DK/Burdol.png" id="S_4_pic" width="auto" height="70px"/>
            <div className="S_4_under">
              <div className="S_POS">
                <img src="img/positions/TOP.png" id="S_4_pos" width="auto" height="20px"/>
              </div>
              <h2 className="S_name">Burdol</h2>
            </div>
          </div>
        </div>

      </div>


      <div className="T_Circle">
        {/* <Seasons nowSeason={nowSeason} /> */}
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
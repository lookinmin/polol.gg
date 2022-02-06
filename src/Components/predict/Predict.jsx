import React, { useState, useEffect } from "react";
import "./PredictCSS.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { PreSchedule } from "./PreSchedule";

export const Predict = () => {

  const [Match1, setMatch1] = useState([
    { Team1: "", Team2: "", Rate1: "", Rate2: "" },
  ]);

  const [Match2, setMatch2] = useState([
    { Team1: "", Team2: "", Rate1: "", Rate2: "" },
  ]);

  const [matchResult1, setMatchResult1] = useState("");
  const [matchResult2, setMatchResult2] = useState("");
  const [matchResult3, setMatchResult3] = useState("");
  const [matchResult4, setMatchResult4] = useState("");

  const [pic1, setPic1] = useState([{ Team1: "", Team2: "" }]);

  const [pic2, setPic2] = useState([{ Team1: "", Team2: "" }]);

  const [finalRanking, setFinalRanking] = useState([
    { TeamRank: 1, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 2, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 3, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 4, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 5, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 6, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 7, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 8, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 9, TP : "", TeamName: "", winRate: "" + "%" },
    { TeamRank: 10, TP : "", TeamName: "", winRate: "" + "%" },
  ]);

  const [upComing, setUpComing] = useState(-1);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/predict");
      makeData(res.data);
    };
    var TimeLine = [];
    var exFilter = [];
    var TodayMatch = [];
    var TName = [];
    var ChTName = [{ CT: "", PR: "" }];

    let today = new Date();

    let month = today.getMonth() + 1;
    let date = today.getDate();

    const makeData = (items) => {
      for (let i = 0; i < 45; i++) {
        TimeLine[i] = {
          MD: items[i].month,
          DD: items[i].day,
          mat1Left: items[i].Lteam1,
          mat1Right: items[i].Rteam1,
          rate1Left: items[i].Lrate1,
          rate1Right: items[i].Rrate1,
          mat2Left: items[i].Lteam2,
          mat2Right: items[i].Rteam2,
          rate2Left: items[i].Lrate2,
          rate2Right: items[i].Rrate2,
        };
      }

      //-------------------------------------------TODAY MATCHUP----------------------------------------
      
      const UpComingDate = (month, day) => {
        const Month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        if(day <= 9){
          day = "0"+day
        }
        setUpComing(Month[Number(month)-1]+"."+day)
      }

      for (let i = 0; i < 45; i++) {
        if (TimeLine[i].MD * 100 + TimeLine[i].DD >= month * 100 + date) {
          for (let j = i; j < 45; j++) {
            exFilter[j] = {
              mat1Left: TimeLine[j].mat1Left,
              mat1Right: TimeLine[j].mat1Right,
              rate1Left: TimeLine[j].rate1Left,
              rate1Right: TimeLine[j].rate1Right,
              mat2Left: TimeLine[j].mat2Left,
              mat2Right: TimeLine[j].mat2Right,
              rate2Left: TimeLine[j].rate2Left,
              rate2Right: TimeLine[j].rate2Right,
            };
          }
          UpComingDate(TimeLine[i].MD, TimeLine[i].DD);
          break;
        }
      }

      TodayMatch = exFilter.filter((element, i) => element !== undefined);

      const setPicture = (e) => {
        var result;
        switch (e) {
          case "T1":
            result = "img/0.PNG";
            break;
          case "DK":
            result = "img/1.PNG";
            break;
          case "GEN":
            result = "img/2.PNG";
            break;
          case "NS":
            result = "img/3.PNG";
            break;
          case "LSB":
            result = "img/4.PNG";
            break;
          case "KDF":
            result = "img/5.PNG";
            break;
          case "KT":
            result = "img/6.PNG";
            break;
          case "HLE":
            result = "img/7.PNG";
            break;
          case "BRO":
            result = "img/8.PNG";
            break;
          case "DRX":
            result = "img/9.PNG";
            break;
          default:
            break;
        }
        return result;
      };

      const checkWin = (e1, e2) => {
        if(e1 > e2){
          return 1;
        }
        else{
          return 0;
        }
      }

      setMatch1([
        {
          Team1: TodayMatch[0].mat1Left,
          Team2: TodayMatch[0].mat1Right,
          Rate1: TodayMatch[0].rate1Left + " %",
          Rate2: TodayMatch[0].rate1Right + " %",
        },
      ]);

      setMatch2([
        {
          Team1: TodayMatch[0].mat2Left,
          Team2: TodayMatch[0].mat2Right,
          Rate1: TodayMatch[0].rate2Left + " %",
          Rate2: TodayMatch[0].rate2Right + " %",
        },
      ]);

      setPic1([
        {
          Team1: setPicture(TodayMatch[0].mat1Left),
          Team2: setPicture(TodayMatch[0].mat1Right),
        },
      ]);

      setPic2([
        {
          Team1: setPicture(TodayMatch[0].mat2Left),
          Team2: setPicture(TodayMatch[0].mat2Right),
        },
      ]);

      if(checkWin(TodayMatch[0].rate1Left, TodayMatch[0].rate1Right) === 1){
        setMatchResult1("WIN");
        setMatchResult2("LOSE");
      }
      else{
        setMatchResult1("LOSE");
        setMatchResult2("WIN");
      }

      if(checkWin(TodayMatch[0].rate2Left, TodayMatch[0].rate2Right) === 1){
        setMatchResult3("WIN");
        setMatchResult4("LOSE");
      }
      else{
        setMatchResult3("LOSE");
        setMatchResult4("WIN");
      }



      //-------------------------------------------TODAY MATCHUP----------------------------------------

      //-------------------------------------------최종 순위표-------------------------------------------
      for (let i = 45; i < 55; i++) {
        TName[i - 45] = {
          TN: items[i].TeamName,
          preRate: items[i].predictrate,
        };
      }


      const ChangeName = (input) => {
        var result;
        switch (input) {
          case "T1":
            result = "T1";
            break;
          case "DK":
            result = "DWG KIA";
            break;
          case "GEN":
            result = "GEN.G Esports";
            break;
          case "NS":
            result = "NongShim RED FORCE";
            break;
          case "LSB":
            result = "Liiv SANDBOX";
            break;
          case "KDF":
            result = "KwangDong Freecs";
            break;
          case "DRX":
            result = "DRX";
            break;
          case "BRO":
            result = "Fredit BRION";
            break;
          case "KT":
            result = "KT Rolster";
            break;
          case "HLE":
            result = "Hanhwa Life Esports";
            break;
          default:
            break;
        }
        return result;
      };

      var teamPic = [];

      for (let i = 0; i < 10; i++) {
        ChTName[i] = {
          CT: ChangeName(TName[i].TN),
          PR: TName[i].preRate,
        };
        teamPic[i] = setPicture(TName[i].TN);
      }

      setFinalRanking([
        { TeamRank: 1, TP : teamPic[0], TeamName: ChTName[0].CT, winRate: ChTName[0].PR + "%" },
        { TeamRank: 2, TP : teamPic[1], TeamName: ChTName[1].CT, winRate: ChTName[1].PR + "%" },
        { TeamRank: 3, TP : teamPic[2], TeamName: ChTName[2].CT, winRate: ChTName[2].PR + "%" },
        { TeamRank: 4, TP : teamPic[3], TeamName: ChTName[3].CT, winRate: ChTName[3].PR + "%" },
        { TeamRank: 5, TP : teamPic[4], TeamName: ChTName[4].CT, winRate: ChTName[4].PR + "%" },
        { TeamRank: 6, TP : teamPic[5], TeamName: ChTName[5].CT, winRate: ChTName[5].PR + "%" },
        { TeamRank: 7, TP : teamPic[6], TeamName: ChTName[6].CT, winRate: ChTName[6].PR + "%" },
        { TeamRank: 8, TP : teamPic[7], TeamName: ChTName[7].CT, winRate: ChTName[7].PR + "%" },
        { TeamRank: 9, TP : teamPic[8], TeamName: ChTName[8].CT, winRate: ChTName[8].PR + "%" },
        { TeamRank: 10, TP : teamPic[9], TeamName: ChTName[9].CT, winRate: ChTName[9].PR + "%" },
      ]);
    };

    //-------------------------------------------최종 순위표-------------------------------------------

    //-------------------------------------남은 경기 결과 예측 코드-------------------------------------

    callApi();
  }, []);

  //div rendering 코드

  var renderRank = finalRanking.map((team) => {
    return (
      <tr key={team.TeamRank}>
        <td className="rOrder">
          <h2 id="tRanked">{team.TeamRank}</h2>
        </td>
        <td className="tName"><img src={team.TP} id="rankTeamImg" width="auto" height="25px"/>{team.TeamName}</td>
        <td className="percent">{team.winRate}</td>
      </tr>
    );
  });

  const renderMatch1UP = (
    <div className="TmatchInfo">
      <div className="team1">
        <div className="resultBox">
          <h2 className="resultValue" style={(matchResult1 === "WIN") ? {color : 'blue'} : {color : 'red'} }>{matchResult1}</h2>
          <h2 className="rate">{Match1[0].Rate1}</h2>
        </div>
        <div className="teamBox">
          <img src={pic1[0].Team1} width="auto" height="70px" className="tPic"></img>
          <h2 className="teamTitle">{Match1[0].Team1}</h2>
        </div>
      </div>

      <h2 className="versus">VS</h2>

      <div className="team2">
        <div className="teamBox">
          <img src={pic1[0].Team2} width="auto" height="70px" className="tPic"></img>
          <h2 className="teamTitle">{Match1[0].Team2}</h2>
        </div>
        <div className="resultBox">
          <h2 className="resultValue" style={(matchResult2 === "WIN") ? {color : 'blue'} : {color : 'red'} }>{matchResult2}</h2>
          <h2 className="rate">{Match1[0].Rate2}</h2>
        </div>
        
      </div>
    </div>
  );

  const renderMatch2UP = (
    <div className="TmatchInfo">
      <div className="team1">
        <div className="resultBox">
          <h2 className="resultValue" style={(matchResult3 === "WIN") ? {color : 'blue'} : {color : 'red'}} >{matchResult3}</h2>
          <h2 className="rate">{Match2[0].Rate1}</h2>
        </div>
        <div className="teamBox">
          <img
            src={pic2[0].Team1}
            width="auto"
            height="70px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match2[0].Team1}</h2>
        </div>
      </div>

      <h2 className="versus">VS</h2>

      <div className="team2">
        <div className="teamBox">
          <img
            src={pic2[0].Team2}
            width="auto"
            height="70px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match2[0].Team2}</h2>
        </div>
        <div className="resultBox">
          <h2 className="resultValue" style={(matchResult4 === "WIN") ? {color : 'blue'} : {color : 'red'}} >{matchResult4}</h2>
          <h2 className="rate">{Match2[0].Rate2}</h2>
        </div>
      </div>
    </div>
  );


  return (
    <div className="Prewrapper">
      <div className="aboveForPredict">
        <div className="nowMatch">
          <h2 id="todayResult">{upComing}&nbsp;&nbsp;&nbsp;Match UP</h2>
          <div className="matchBoxforPredict">
            <div className="box1">
              <div className="timeline">
                <h3 className="txt1">MATCH 1</h3>
                <h3 className="times">17 : 00</h3>
              </div>

              {renderMatch1UP}
            </div>

            <div className="box1">
              <div className="timeline">
                <h3 className="txt1">MATCH 2</h3>
                <h3 className="times">20 : 00</h3>
              </div>
              {renderMatch2UP}
            </div>
          </div>
        </div>

        <div className="finalRank">
          <h2 id="finalResult">LCK 2022 Spring 최종 순위 예측</h2>
          <Table striped bordered hover className="tbRanked">
            <thead>
              <tr className="tabHead">
                <th className="ranking">RANK</th>
                <th className="teamN">TEAM NAME</th>
                <th className="predictRate">Win Rate</th>
              </tr>
            </thead>
            <tbody>{renderRank}</tbody>
          </Table>
        </div>
      </div>

      <div className="belowForPredict">
        <PreSchedule />
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
import React, { useState, useEffect } from "react";
import "./HomeCSS.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Schedule } from "./Schedule";

export const Home = () => {
  const [Match1, setMatch1] = useState([
    { Team1: "", Team2: "", Lscore: "", Rscore: "" },
  ]);

  const [Match2, setMatch2] = useState([
    { Team1: "", Team2: "", Lscore: "", Rscore: "" },
  ]);

  const [pic1, setPic1] = useState([{ Team1: "", Team2: "" }]);

  const [pic2, setPic2] = useState([{ Team1: "", Team2: "" }]);

  const [upComing, setUpComing] = useState(-1);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data);
    };
    var TimeLine = [];
    var exFilter = [];
    var TodayMatch = [];

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
          score1Left: items[i].Lscore1,
          score1Right: items[i].Rscore1,
          mat2Left: items[i].Lteam2,
          mat2Right: items[i].Rteam2,
          score2Left: items[i].Lscore2,
          score2Right: items[i].Rscore2,
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
              score1L: TimeLine[j].score1Left,
              score1R: TimeLine[j].score1Right,
              mat2Left: TimeLine[j].mat2Left,
              mat2Right: TimeLine[j].mat2Right,
              score2L: TimeLine[j].score2Left,
              score2R: TimeLine[j].score2Right,
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

      setMatch1([
        {
          Team1: TodayMatch[0].mat1Left,
          Team2: TodayMatch[0].mat1Right,
          Lscore: TodayMatch[0].score1L,
          Rscore: TodayMatch[0].score1R,
        },
      ]);

      setMatch2([
        {
          Team1: TodayMatch[0].mat2Left,
          Team2: TodayMatch[0].mat2Right,
          Lscore: TodayMatch[0].score2L,
          Rscore: TodayMatch[0].score2R,
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
    };
    callApi();
  }, []);

  const renderMatchUP1 = (
    <div className="TmatchInfo">
      <div className="team1">
        <div className="teamBox">
          <img
            src={pic1[0].Team1}
            width="auto"
            height="60px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match1[0].Team1}</h2>
        </div>
        <h2 className="score">{Match1[0].Lscore}</h2>
      </div>

      <h2 className="versus"> {Match1[0].Rscore === null ? "VS" : ":" } </h2>

      <div className="team2">
        <h2 className="score">{Match1[0].Rscore}</h2>
        <div className="teamBox">
          <img
            src={pic1[0].Team2}
            width="auto"
            height="60px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match1[0].Team2}</h2>
        </div>
      </div>
    </div>
  );

  const renderMatchUP2 = (
    <div className="TmatchInfo">
      <div className="team1">
        <div className="teamBox">
          <img
            src={pic2[0].Team1}
            width="auto"
            height="60px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match2[0].Team1}</h2>
        </div>
        <h2 className="score">{Match2[0].Lscore}</h2>
      </div>

      <h2 className="versus"> {Match2[0].Rscore === null ? "VS" : ":" } </h2>

      <div className="team2">
        <h2 className="score">{Match2[0].Rscore}</h2>
        <div className="teamBox">
          <img
            src={pic2[0].Team2}
            width="auto"
            height="60px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match2[0].Team2}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="above">
        <div className="Welcome">
          <div className="welcome_act_1">
            <h2 className="action_title">Predict</h2>
          </div>
          <div className="welcome_act_2">
            <h2 className="action_title">OF</h2>
          </div>
          <div className="welcome_act_3">
            <h2 className="action_title">League</h2>
          </div>
          <div className="welcome_act_4">
            <h2 className="action_title">OF</h2>
          </div>
          <div className="welcome_act_5">
            <h2 className="action_title">Legends</h2>
          </div>
        </div>

        <div className="match">
          <p id="match_title">{upComing}&nbsp;&nbsp;&nbsp;Match UP</p>
        </div>

        <div className="today_match">
          <div className="matchBox">
            <div className="mat_top">
              <p className="ti" id="m1">
                Match 1
              </p>
              <p className="time" id="t1">
                17 : 00
              </p>
            </div>
            {renderMatchUP1}
          </div>

          <div className="matchBox">
            <div className="mat_top">
              <p className="ti" id="m2">
                Match 2
              </p>
              <p className="time" id="t2">
                20 : 00
              </p>
            </div>
            {renderMatchUP2}
          </div>
        </div>

        <div className="date-title">
          <a href="https://thefutureoflck.com/">
            <img src="img/LCK_MARK.png" width="70px" height="auto" />
          </a>
          <p id="calendar-title">LCK </p>
          <p id="small-title">TimeLine</p>
        </div>

        <div className="calendar">
          <Schedule />
        </div>
      </div>

      <div className="under">
        <h2 className="undertitle" id="POLOL">
          POLOL.GG
        </h2>

        <div className="expla">
          <p id="ex">
            POLOL.GG는 머신러닝을 통해 LCK 경기 결과 및 순위를 예측하는
            WebSite입니다.
          </p>
        </div>

        <div className="menuList">
          <NavLink className="lists" to="/predict" title="예측 페이지 이동">
            AI PREDICT
          </NavLink>
          <NavLink className="lists" to="/table" title="순위 페이지 이동">
            RANK
          </NavLink>
          <NavLink className="lists" to="/team" title="팀 정보 페이지 이동">
            TEAM
          </NavLink>
          <NavLink
            className="lists"
            to="/players"
            title="선수 정보 페이지 이동"
          >
            PLAYERS
          </NavLink>
        </div>
        <div className="images">
          <a href="https://github.com/lookinmin/polol.gg" target="_blank">
            <img
              src="img/github.png"
              width="45px"
              height="45px"
              title="개발자 GitHub"
            />
          </a>

          <img
            src="img/gmail.png"
            width="45px"
            height="45px"
            title="개발자 email : sncalphs@gmail.com"
          />

          <a href="https://www.instagram.com/lookin_min/" target="_blank">
            <img
              src="img/instagram.png"
              width="45px"
              height="45px"
              title="개발자 Instagram"
            ></img>
          </a>
        </div>

        <div className="Copyright">
          <p id="copy1">@Copyright 2021 M&G Company</p>
          <p id="copy2">All Rights Reserved </p>
        </div>
      </div>
    </div>
  );
};

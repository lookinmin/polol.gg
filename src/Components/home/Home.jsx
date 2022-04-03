import React, { useState, useEffect } from "react";
import "../playoff/PlayoffCSS.css";
import "./HomeCSS.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Schedule } from "./UnderLayer/Schedule";
import { Champions } from "./TopLayer/Champions";
import { TeamRank } from "./TopLayer/TeamRank";
import { UpcomingMatch } from "./TopLayer/UpcomingMatch";
import { UpcomingPlayoff } from "./TopLayer/UpcomingPlayoff";
import { useMediaQuery } from "react-responsive";

export const Home = () => {
  const limitWidth = useMediaQuery({ minWidth: 1300 });
  const matchWidth = useMediaQuery({ minWidth: 1400 });
  const actWidth = useMediaQuery({ maxWidth: 1399.99 });

  const [isPlayoff, setIsPlayoff] = useState(false);
  const [playoffDate, setPlayoffDate] = useState(1);

  var catchMonth;
  var catchDay;

  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.data);
    };

    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    const makeData = (items) => {
      let i = 0;
      while (true){
        if(items[i].Lteam2 === null && ((100*items[i].Month + items[i].Day) !== (100*items[i-1].Month + items[i-1].Day))){
          catchMonth = parseInt(items[i].Month);
          catchDay = parseInt(items[i].Day);
          break;
        }
        i++;
      }

      setPlayoffDate(100*catchMonth + catchDay);

      if((100*month + date) > (100*catchMonth + catchDay)){
        setIsPlayoff(true);
      }
    }

    callApi();
  }, [playoffDate])

  const basicChampAndRank = (
    <>
      <div className="champAndRank">
        <Champions/>
        <TeamRank />
      </div>
    </>
  );

  const actChampAndRank = (
    <>
      <div className="champAndRank2">
        <Champions/>
        <TeamRank />
      </div>
    </>
  );

  return (
    <div className="wrapper">
      <div className="above">
        <div className="Welcome">
          <div className="welcome_act_1">
            <h2 className="action_title">Information</h2>
          </div>
          <div className="welcome_act_2">
            <h2 className="action_title">Of</h2>
          </div>
          <div className="welcome_act_3">
            <h2 className="action_title">LCK</h2>
          </div>
          <div className="welcome_act_4">
            <h2 className="action_title">Match</h2>
          </div>
          <div className="welcome_act_5">
            <h2 className="action_title">History</h2>
          </div>
        </div>

        {isPlayoff ? <UpcomingPlayoff/> : <UpcomingMatch/> }

        {matchWidth && basicChampAndRank}

        {actWidth && actChampAndRank}

        <div className="date-title">
          <a href="https://thefutureoflck.com/">
            <img src="img/LCK_MARK.png" width="70px" height="auto" />
          </a>
          <p id="calendar-title">LCK </p>
          <p id="small-title">TimeLine</p>
        </div>

        <div className="calendar">
          <Schedule isPlayOff={playoffDate}/>
        </div>
      </div>

      <div className="under">
        <h2 className="undertitle" id="POLOL">
          KILL.GG
        </h2>

        <div className="expla">
          <p id="ex">KILL.GG는 LCK Match History를 보여주는 WebSite입니다.</p>
        </div>

        <div className="menuList">
          <NavLink className="lists" to="/playoff" title="플레이오프 페이지 이동"> PlayOffs</NavLink>
          <NavLink className="lists" to="/table" title="순위 페이지 이동">
            RANK
          </NavLink>
          <NavLink className="lists" to="/team" title="팀 정보 페이지 이동">
            TEAM
          </NavLink>
          <NavLink className="lists" to="/players" title="선수 정보 페이지 이동" >PLAYERS</NavLink>     
        </div>
        {limitWidth && (
          <div className="images">
            <a href="https://github.com/lookinmin/polol.gg" target="_blank">
              <img src="img/github.png" width="35px" height="35px" title="개발자 GitHub"/>
            </a>
            <img
              src="img/gmail.png"
              width="35px"
              height="35px"
              title="개발자 email : sncalphs@gmail.com"
            />

            <a href="https://www.instagram.com/lookin_min/" target="_blank">
              <img
                src="img/instagram.png"
                width="35px"
                height="35px"
                title="개발자 Instagram"
              ></img>
            </a>
          </div>
        )}

        {limitWidth && (
          <div className="Copyright">
            <p id="copy1">@Copyright 2021 M&G Company</p>
            <p id="copy2">All Rights Reserved </p>
          </div>
        )}
      </div>
    </div>
  );
};

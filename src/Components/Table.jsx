import React, { useEffect, useState } from "react";
import "./CSS/Table.css";
import { CircleTable } from "./CircleTable";
import { Seasons } from "./Seasons";

export const Table = () => {
  const [season, setSeason] = useState("2022 LCK 서머");

  const nowSeason = (season) => {
    setSeason(season);
  };

  const [state, setState] = useState(false);

  const tableSort = () => {
    if (state === false) {
      document.querySelector(".tableSortDiv").style.visibility = "visible";
      document.querySelector(".tableSortDiv").className =
        "tableSortDiv tableSortAni2";
    } else {
      document.querySelector(".tableSortDiv").className =
        "tableSortDiv tableSortAni";
    }
    setState(!state);
  };

  const [sort, setSort] = useState("승");
  const Sorting = (e) => {
    setSort(e.target.innerHTML);
  };

  const [teamInfo, setTeamInfo] = useState({});
  const [players, setPlayers] = useState([{
    Name: "name",
    pic: "img/0.png",
    pos: "img/1.png"
  }]);


  const showTeamInfo = (data) => {
    console.log(data);
    setTeamInfo(data.team);
    setPlayers(data.players);
  };

  var renderMem = players.map((num) => {
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
            <img src="" width="auto" height="100px" id="T_teamPic" />
            <h2 className="T_teamName">{teamInfo.TeamName}</h2>
          </div>
          <div className="S_1_right">
            <h2 className="S_Rank">정규시즌 {teamInfo.rank}위</h2>
          </div>
        </div>

        <div className="Screen_2">
          <div className="S_2_left">
            <h2 className="S_Txt" id="S_win">
              {teamInfo.win}승
            </h2>
            <h2 className="S_Txt" id="S_lose">
              {teamInfo.lose}패
            </h2>
            <h2 className="S_Txt" id="S_diff">
              {teamInfo.difference}
            </h2>
            <h2 className="S_Txt" id="S_rate">
              승률 : {teamInfo.rate}
            </h2>
          </div>

          <div className="S_2_right">
            <h2 className="S_Txt" id="S_preRate">
              예상 승률 : {teamInfo.preRate}%
            </h2>
          </div>
        </div>

        <div className="Screen_3">
          <div className="S_3_left">
            <h2 className="S_Txt2" id="S_KDA">
              KDA : {teamInfo.KDA}
            </h2>
            <h2 className="S_Txt2" id="S_kill">
              {teamInfo.kill} Kill
            </h2>
            <h2 className="S_Txt2" id="S_death">
              {teamInfo.death} Death
            </h2>
            <h2 className="S_Txt2" id="S_assist">
              {teamInfo.assist} Assist
            </h2>
          </div>

          <div className="S_3_right">
            <h2 className="S_Txt2" id="S_preRank">
              예상 최종순위 : 2위
            </h2>
          </div>
        </div>

        <div className="Screen_4">
          {renderMem}
        </div>

      </div>

      <div className="T_Circle">
        <div>
          <Seasons nowSeason={nowSeason} />
        </div>
        <div>
          <CircleTable
            season={season}
            showTeamInfo={showTeamInfo}
            sorting={sort}
            key={season}
          />
        </div>
        <div className="tableSort">
          <div className="tableSortContainer">
            <div className="tableSortDiv">
              <div className="sort" onClick={Sorting}>
                승
              </div>
              <div className="sort" onClick={Sorting}>
                패
              </div>
              <div className="sort" onClick={Sorting}>
                득실차
              </div>
              <div className="sort" onClick={Sorting}>
                KDA
              </div>
              <div className="sort" onClick={Sorting}>
                킬
              </div>
              <div className="sort" onClick={Sorting}>
                데스
              </div>
              <div className="sort" onClick={Sorting}>
                어시스트
              </div>
              <div className="sort" onClick={Sorting}>
                예상 승률
              </div>
            </div>
            <div className="tableSortBtn" onClick={tableSort}>
              {sort}
            </div>
          </div>
        </div>
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
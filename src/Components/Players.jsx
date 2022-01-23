import React, { useState, useEffect } from "react";
import { PlayersRankTable } from "./PlayersRankTable";
import { Positions } from "./Positions";
import "./CSS/Player.css";
import { useSelector } from "react-redux";
import axios from "axios";

var moreTable1 = <tr />;
var moreTable2 = <tr />;
var moreTable3 = <tr />;
var moreTable4 = <tr />;

export const Players = () => {
  const [times, setTimes] = useState(1);
  const [click, setClick] = useState(0);
  const [position, setPosition] = useState("ALL");
  const [sort, setSort] = useState("승");

  const [spring21, SetSpring21] = useState({
    All: [],
    Top: [],
    Jgl: [],
    Mid: [],
    Ad: [],
    Spt: [],
  });

  const [summer21, SetSummer21] = useState({
    All: [],
    Top: [],
    Jgl: [],
    Mid: [],
    Ad: [],
    Spt: [],
  });

  const choosePosition = (pick) => {
    setPosition(pick);
  };

  const ShowPosition = () => {
    if (position !== "ALL") {
      moreTable1 = <tr />;
      moreTable2 = <tr />;
      moreTable3 = <tr />;
      moreTable4 = <tr />;
    } else {
      switch (click) {
        case 1:
          moreTable1 = Array.from({ length: 14 }, (v, i) => (
            <PlayersRankTable rank={times + i} key={i + 1} />
          ));
          break;
        case 2:
          moreTable2 = Array.from({ length: 14 }, (v, i) => (
            <PlayersRankTable rank={times + i} key={i + 1} />
          ));
          break;
        case 3:
          moreTable3 = Array.from({ length: 14 }, (v, i) => (
            <PlayersRankTable rank={times + i} key={i + 1} />
          ));
          break;
        case 4:
          moreTable4 = Array.from({ length: 14 }, (v, i) => (
            <PlayersRankTable rank={times + i} key={i + 1} />
          ));
          break;
        default:
          break;
      }
    }
  };

  const MatchPosition = (data) => {
    var dataArr = [];
    for (let i = 0; i < data.playerName.length; i++) {
      dataArr.push({
        playerTeam: data.playerTeam[i],
        playerName: data.playerName[i],
        playerWin: data.playerWin[i],
        playerLose: data.playerLose[i],
        playerKill: data.playerKill[i],
        playerDeath: data.playerDeath[i],
        playerAssist: data.playerAssist[i],
        playerKDA: data.playerKDA[i],
        playerKillRate: data.playerKillRate[i],
      });
    }
    return dataArr;
  };

  const MatchSeason = (data, season) => {
    if(season === "Spring21"){
      SetSpring21({
        All: MatchPosition(data.All, 0, season),
        Top: MatchPosition(data.Top, 1, season),
        Jgl: MatchPosition(data.Jgl, 2, season),
        Mid: MatchPosition(data.Mid, 3, season),
        Ad: MatchPosition(data.Ad, 4, season),
        Spt: MatchPosition(data.Spt, 5, season)
      });
    } else if(season === "Summer21"){
      SetSummer21({
        All: MatchPosition(data.All, 0, season),
        Top: MatchPosition(data.Top, 1, season),
        Jgl: MatchPosition(data.Jgl, 2, season),
        Mid: MatchPosition(data.Mid, 3, season),
        Ad: MatchPosition(data.Ad, 4, season),
        Spt: MatchPosition(data.Spt, 5, season)
      });
    }
  }

  const MatchData = (data) => {
    MatchSeason(data.Spring21, "Spring21")
    MatchSeason(data.Summer21, "Summer21");
  }

  const apiData = async () => {
    const res = await axios.get("http://localhost:3002/main");
    MatchData(res.data);
  };

  useEffect(() => {
    ShowPosition();
    apiData();  
  }, [])

  const addTable = () => {
    setTimes(times + 14);
    setClick(click + 1);
    if (times > 56) {
      setTimes(56);
    }
  };

  const moreBtn =
    position === "ALL" ? (
      <button className="Morebtn btn" onClick={addTable}>
        더보기
      </button>
    ) : (
      <div></div>
    );

  const SortTable = (e) => {};

  return (
    <div style={{ background: "#dadada" }}>
      <div style={{ padding: "3% 15%" }}>
        <Positions choosePosition={choosePosition} />
        <table className="table table-striped">
          <thead className="table-dark playerTableThead">
            <tr className="playerTableTr">
              <th scope="col" className="rank">
                <div>순위</div>
                <div></div>
              </th>
              <th scope="col" className="playerTableTh">
                포지션
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                승
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                패
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                킬
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                데스
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                어시
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                KDA
              </th>
              <th scope="col" className="playerTableTh" onClick={SortTable}>
                소속팀
              </th>
            </tr>
          </thead>
          <tbody>
            <PlayersRankTable data={summer21}/>
            {/* {Array.from({ length: 14 }, (v, i) => (
              <PlayersRankTable rank={i + 1} key={i + 1} data={playerSpt.Summer21} />
            ))}
            {moreTable1}
            {moreTable2}
            {moreTable3}
            {moreTable4} */}
          </tbody>
        </table>
        {moreBtn}
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

import React, { useEffect, useState } from "react";
import { TeamRankTable } from "./TeamRankTable";
import "./CSS/Table.css";
import { Seasons } from "./Seasons";
import axios from "axios";
import { TeamCard } from "./TeamCard";

export const Table = () => {
  const [season, setSeason] = useState("2022 LCK 서머");

  const [team, setTeam] = useState([
    {
      teamName: "teamName",
      teamImg: "img",
      win: 2,
      lose: 2,
      diff: 1,
      winRate: 9,
      kda: 0,
      preRank: 4,
      preWinRate: 8,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 4,
      lose: 4,
      diff: 3,
      winRate: 8,
      kda: 8,
      preRank: 5,
      preWinRate: 9,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 5,
      lose: 6,
      diff: 5,
      winRate: 7,
      kda: 6,
      preRank: 6,
      preWinRate: 0,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 8,
      lose: 8,
      diff: 7,
      winRate: 6,
      kda: 4,
      preRank: 7,
      preWinRate: 1,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 0,
      lose: 0,
      diff: 9,
      winRate: 5,
      kda: 2,
      preRank: 8,
      preWinRate: 2,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 1,
      lose: 1,
      diff: 2,
      winRate: 4,
      kda: 9,
      preRank: 9,
      preWinRate: 3,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 6,
      lose: 3,
      diff: 4,
      winRate: 3,
      kda: 7,
      preRank: 0,
      preWinRate: 4,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 3,
      lose: 5,
      diff: 6,
      winRate: 2,
      kda: 5,
      preRank: 1,
      preWinRate: 5,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 2,
      lose: 7,
      diff: 0,
      winRate: 1,
      kda: 3,
      preRank: 2,
      preWinRate: 7,
    },
    {
      teamName: "teamName",
      teamImg: "img",
      win: 6,
      lose: 9,
      diff: 8,
      winRate: 0,
      kda: 1,
      preRank: 3,
      preWinRate: 6,
    },
  ]);

  const [cnt, setCnt] = useState(0);

  const [sort, setSort] = useState("승");

  const MatchTeamImg = (teamName) => {
    switch (teamName) {
      case "T1":
        return "img/0.PNG";
      case "DK":
        return "img/1.PNG";
      case "GEN":
        return "img/2.PNG";
      case "NS":
        return "img/3.PNG";
      case "LSB":
        return "img/4.PNG";
      case "KDF":
        return "img/5.PNG";
      case "KT":
        return "img/6.PNG";
      case "HLE":
        return "img/7.PNG";
      case "BRO":
        return "img/8.PNG";
      case "DRX":
        return "img/9.PNG";
      default:
        return "img/github.png"
    }
  };

  const MatchData = (data) => {
    setTeam([
      {
        teamImg: MatchTeamImg(data[0].TeamName),
        teamName: data[0].TeamName,
        win: data[0].win,
        lose: data[0].lose,
        diff: data[0].difference,
        winRate: data[0].winrate,
        kda: data[0].KDA,
        preRank: data[0].win,
        preWinRate: data[0].winrate,
      },
      {
        teamImg: MatchTeamImg(data[1].TeamName),
        teamName: data[1].TeamName,
        win: data[1].win,
        lose: data[1].lose,
        diff: data[1].difference,
        winRate: data[1].winrate,
        kda: data[1].KDA,
        preRank: data[1].win,
        preWinRate: data[1].winrate,
      },
      {
        teamImg: MatchTeamImg(data[2].TeamName),
        teamName: data[2].TeamName,
        win: data[2].win,
        lose: data[2].lose,
        diff: data[2].difference,
        winRate: data[2].winrate,
        kda: data[2].KDA,
        preRank: data[2].win,
        preWinRate: data[2].winrate,
      },
      {
        teamImg: MatchTeamImg(data[3].TeamName),
        teamName: data[3].TeamName,
        win: data[3].win,
        lose: data[3].lose,
        diff: data[3].difference,
        winRate: data[3].winrate,
        kda: data[3].KDA,
        preRank: data[3].win,
        preWinRate: data[3].winrate,
      },
      {
        teamImg: MatchTeamImg(data[4].TeamName),
        teamName: data[4].TeamName,
        win: data[4].win,
        lose: data[4].lose,
        diff: data[4].difference,
        winRate: data[4].winrate,
        kda: data[4].KDA,
        preRank: data[4].win,
        preWinRate: data[4].winrate,
      },
      {
        teamImg: MatchTeamImg(data[5].TeamName),
        teamName: data[5].TeamName,
        win: data[5].win,
        lose: data[5].lose,
        diff: data[5].difference,
        winRate: data[5].winrate,
        kda: data[5].KDA,
        preRank: data[5].win,
        preWinRate: data[5].winrate,
      },
      {
        teamImg: MatchTeamImg(data[6].TeamName),
        teamName: data[6].TeamName,
        win: data[6].win,
        lose: data[6].lose,
        diff: data[6].difference,
        winRate: data[6].winrate,
        kda: data[6].KDA,
        preRank: data[6].win,
        preWinRate: data[6].winrate,
      },
      {
        teamImg: MatchTeamImg(data[7].TeamName),
        teamName: data[7].TeamName,
        win: data[7].win,
        lose: data[7].lose,
        diff: data[7].difference,
        winRate: data[7].winrate,
        kda: data[7].KDA,
        preRank: data[7].win,
        preWinRate: data[7].winrate,
      },
      {
        teamImg: MatchTeamImg(data[8].TeamName),
        teamName: data[8].TeamName,
        win: data[8].win,
        lose: data[8].lose,
        diff: data[8].difference,
        winRate: data[8].winrate,
        kda: data[8].KDA,
        preRank: data[8].win,
        preWinRate: data[8].winrate,
      },
      {
        teamImg: MatchTeamImg(data[9].TeamName),
        teamName: data[9].TeamName,
        win: data[9].win,
        lose: data[9].lose,
        diff: data[9].difference,
        winRate: data[9].winrate,
        kda: data[9].KDA,
        preRank: data[9].win,
        preWinRate: data[9].winrate,
      },
    ]);
  };

  const apiData = async () => {
    const res = await axios.get("http://localhost:3002/table");
    const spring21 = res.data.Spring2021;
    const summer21 = res.data.Summer2021;
    const table22 = res.data.Team;

    switch (season) {
      case "2022 LCK 서머":
        console.log("2022 서머 데이터 없음");
        break;
      case "2022 LCK 스프링":
        console.log("2022 스프링 데이터 없음");
        break;
      case "2021 LCK 서머":
        MatchData(summer21);
        break;
      case "2021 LCK 스프링":
        MatchData(spring21);
        break;
      default:
        break;
    }
  };

  const nowSeason = (data) => {
    setSeason(data);
  };

  useEffect(() => {
    apiData();
  }, [season]);

  const SortTable = (e) => {
    setCnt(cnt + 1);
    setSort(e.target.innerHTML);
    switch (e.target.innerHTML) {
      case "승":
        setTeam(
          team.sort((a, b) => {
            return b.win - a.win;
          })
        );
        break;
      case "패":
        setTeam(
          team.sort((a, b) => {
            return b.lose - a.lose;
          })
        );
        break;
      case "득실차":
        setTeam(
          team.sort((a, b) => {
            return b.diff - a.diff;
          })
        );
        break;
      case "승률":
        setTeam(
          team.sort((a, b) => {
            return b.winRate - a.winRate;
          })
        );
        break;
      case "KDA":
        setTeam(
          team.sort((a, b) => {
            return b.kda - a.kda;
          })
        );
        break;
      case "예상 순위":
        setTeam(
          team.sort((a, b) => {
            return b.preRank - a.preRank;
          })
        );
        break;
      case "예상 승률":
        setTeam(
          team.sort((a, b) => {
            return b.preWinRate - a.preWinRate;
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ background: "#dadada" }}>
      <div style={{ padding: "3% 15%" }}>
        <Seasons nowSeason={nowSeason} />
        <table className="table table-striped">
          <thead className="table-dark teamTableThead">
            <tr className="teamTableTr">
              <th scope="col" className="rankLogo">
                <div>순위</div>
                <div></div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  승
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  패
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  득실차
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  승률
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  KDA
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  예상 순위
                </div>
              </th>
              <th scope="col" className="teamTableTh">
                <div className="tableSortTableClick" onClick={SortTable}>
                  예상 승률
                </div>
              </th>
            </tr>
          </thead>
          <TeamCard sort={sort} data={team}/>
          {/* <tbody>
            <TeamRankTable rank={"1"} data={team[0]} />
            <TeamRankTable rank={"2"} data={team[1]} />
            <TeamRankTable rank={"3"} data={team[2]} />
            <TeamRankTable rank={"4"} data={team[3]} />
            <TeamRankTable rank={"5"} data={team[4]} />
            <TeamRankTable rank={"6"} data={team[5]} />
            <TeamRankTable rank={"7"} data={team[6]} />
            <TeamRankTable rank={"8"} data={team[7]} />
            <TeamRankTable rank={"9"} data={team[8]} />
            <TeamRankTable rank={"10"} data={team[9]} />
          </tbody> */}
        </table>
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

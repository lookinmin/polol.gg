import React, { useEffect, useState } from "react";
import { TeamRankTable } from "./TeamRankTable";
import "./CSS/Table.css";
import { Seasons } from "./Seasons";

export const Table = () => {

  const [team, setTeam] = useState([
    { win: 2, lose: 2, diff: 1, winRate: 9, kda: 0, preRank: 4, preWinRate: 8 },
    { win: 4, lose: 4, diff: 3, winRate: 8, kda: 8, preRank: 5, preWinRate: 9 },
    { win: 5, lose: 6, diff: 5, winRate: 7, kda: 6, preRank: 6, preWinRate: 0 },
    { win: 8, lose: 8, diff: 7, winRate: 6, kda: 4, preRank: 7, preWinRate: 1 },
    { win: 0, lose: 0, diff: 9, winRate: 5, kda: 2, preRank: 8, preWinRate: 2 },
    { win: 1, lose: 1, diff: 2, winRate: 4, kda: 9, preRank: 9, preWinRate: 3 },
    { win: 6, lose: 3, diff: 4, winRate: 3, kda: 7, preRank: 0, preWinRate: 4 },
    { win: 3, lose: 5, diff: 6, winRate: 2, kda: 5, preRank: 1, preWinRate: 5 },
    { win: 2, lose: 7, diff: 0, winRate: 1, kda: 3, preRank: 2, preWinRate: 7 },
    { win: 6, lose: 9, diff: 8, winRate: 0, kda: 1, preRank: 3, preWinRate: 6 },
  ]);


  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    console.log(cnt);
  }, [cnt]);

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
  //   document.title = `You clicked ${count} times`;
  // });

  // return (
  //   <div>
  //     <p>You clicked {count} times</p>
  //     <button onClick={() => setCount(count + 1)}>
  //       Click me
  //     </button>
  //   </div>
  // );

  const SortTable = (e) => {
    setCnt(cnt+1);
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
        <Seasons />
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
          <tbody>
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
          </tbody>
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

import React from 'react'
import { TeamRankTable } from './TeamRankTable'
import './CSS/Table.css'
import { Seasons } from './Seasons'


export const Table = () => {

  var team = {
    team1: [1, 2, 3, 4, 5, 6, 7, 8 ],
    team2: [4, 1, 5, 7, 6, 8, 10, 9],
    team3: [3, 6, 1, 2, 8, 9, 10, 4],
    team4: [8, 2, 10, 3, 6, 9, 5, 4],
    team5: [2, 5, 3, 8, 7, 9, 10, 4],
    team6: [10, 9, 2, 4, 6, 7, 4, 8],
    team7: [8, 10, 2, 6, 3, 5, 7, 8],
    team8: [1, 5, 3, 7, 4, 10, 2, 9],
    team9: [2, 6, 10, 8, 5, 7, 9, 1],
    team10: [9, 7, 5, 3, 1, 10, 8, 6]
  }

  var game = {
    win: [team.team1[0], team.team2[0], team.team3[0], team.team4[0], team.team5[0],
    team.team6[0], team.team7[0], team.team8[0], team.team9[0], team.team10[0]],

    lose: [team.team1[1], team.team2[1], team.team3[1], team.team4[1], team.team5[1],
    team.team6[1], team.team7[1], team.team8[1], team.team9[1], team.team10[1]],

    diff: [team.team1[2], team.team2[2], team.team3[0], team.team4[0], team.team5[0],
    team.team6[2], team.team7[2], team.team8[2], team.team9[2], team.team10[2]],

    winProb: [team.team1[3], team.team2[3], team.team3[3], team.team4[3], team.team5[3],
    team.team6[3], team.team7[3], team.team8[3], team.team9[3], team.team10[3]],

    KDA: [team.team1[4], team.team2[4], team.team3[4], team.team4[4], team.team5[4],
    team.team6[4], team.team7[4], team.team8[4], team.team9[4], team.team10[4]],

    kill: [team.team1[5], team.team2[5], team.team3[5], team.team4[5], team.team5[5],
    team.team6[5], team.team7[5], team.team8[5], team.team9[5], team.team10[5]],

    death: [team.team1[6], team.team2[6], team.team3[6], team.team4[6], team.team5[6],
    team.team6[6], team.team7[6], team.team8[6], team.team9[6], team.team10[6]],

    assist: [team.team1[7], team.team2[7], team.team3[7], team.team4[7], team.team5[7],
    team.team6[7], team.team7[7], team.team8[7], team.team9[7], team.team10[7]],
  }

  const NumSort = (a, b) => {
    return a - b;
  }
  //api받을 때 숫자로 오면 sort 함수 이렇게 만들어야함
  //.sort는 문자열 기준으로 실행




  const SortTable = (e) => {
    console.log(e.target.abbr);
    switch(e.target.abbr){
      case "win":

        break;
      default:
        break;
    }

  }

  return (
    <div style={{ background: "whitesmoke" }}>
      <div style={{ padding: "3% 15%" }}>
        <Seasons />
        <table className="table table-striped">
          <thead className="table-dark teamTableThead">
            <tr className='teamTableTr'>
              <th scope="col" className='rankLogo'>
                <div>순위</div>
                <div></div>
              </th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick'  onClick={SortTable}>승</div></th>
              <th scope="col" className='teamTableTh'><div className='tableSortTableClick' onClick={SortTable}>패</div></th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick' onClick={SortTable}>득실차</div></th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick' onClick={SortTable}>승률</div></th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick' onClick={SortTable}>KDA</div></th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick' onClick={SortTable}>예상 승률</div></th>
              <th scope="col" className='teamTableTh' ><div className='tableSortTableClick' onClick={SortTable}>예상 순위</div></th>
            </tr>
          </thead>
          <tbody>
            <TeamRankTable rank={"1"} />
            <TeamRankTable rank={"2"} />
            <TeamRankTable rank={"3"} />
            <TeamRankTable rank={"4"} />
            <TeamRankTable rank={"5"} />
            <TeamRankTable rank={"6"} />
            <TeamRankTable rank={"7"} />
            <TeamRankTable rank={"8"} />
            <TeamRankTable rank={"9"} />
            <TeamRankTable rank={"10"} />
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
  )
}
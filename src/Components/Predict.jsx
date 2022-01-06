import React,{useState} from 'react'
import "./CSS/PredictCSS.css"

export const Predict = () => {

  const finalRanking = [
    { TeamRank : 1, TeamName : 'T1', winRate:20+'%'},
    { TeamRank : 2, TeamName : 'DWG KIA', winRate:20+'%'},
    { TeamRank : 3, TeamName : 'GEN.G', winRate:20+'%'},
    { TeamRank : 4, TeamName : 'Liiv SandBox', winRate:20+'%'},
    { TeamRank : 5, TeamName : 'HLE', winRate:20+'%'},
    { TeamRank : 6, TeamName : 'DRX', winRate:20+'%'},
    { TeamRank : 7, TeamName : 'Fredit BRION', winRate:20+'%'},
    { TeamRank : 8, TeamName : 'KDF', winRate:20+'%'},
    { TeamRank : 9, TeamName : 'NS RedForce', winRate:20+'%'},
    { TeamRank : 10, TeamName : 'KT Rolster', winRate:20+'%'},
  ]

  const renderRank = finalRanking.map(team => {
    return(
      <tr key={team.TeamName}>
        <th scope="row">{team.TeamRank}</th>
        <td colSpan="2" className="tName">{team.TeamName}</td>
        <td className='percent'>{team.winRate}</td>
      </tr>
    );
  })
  return (
    <div className='Prewrapper'>
      <div className="left">

        <div className="nowMatch">
          <h2 id="todayResult">TODAY MATCH 예측</h2>
          <div className="matchBox">
            <div className="box1">
              <h3 className="txt1">MATCH 1st</h3>

            </div>

            <div className="box1">
              <h3 className="txt1">MATCH 2nd</h3>
              
            </div>
          </div>
        </div>

        <div className="finalRank">
          <h2 id="finalResult">LCK 최종 순위 예측</h2>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">TEAM</th>
                <th scope="col"></th>
                <th scope="col">예상 승률</th>
              </tr>
            </thead>
            <tbody>
              {renderRank}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right">


      </div>
    </div>
  )
}

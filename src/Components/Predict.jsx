import React,{useState, useEffect} from 'react'
import "./CSS/PredictCSS.css"
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table'
import {
  Link,
  NavLink
} from "react-router-dom";
import axios from 'axios';

export const Predict = () => {

  
  const [finalRanking,setFinalRanking] = useState([
    { TeamRank : 1, TeamName : "", winRate:""+'%'},
    { TeamRank : 2, TeamName : "", winRate:""+'%'},
    { TeamRank : 3, TeamName : "", winRate:""+'%'},
    { TeamRank : 4, TeamName : "", winRate:""+'%'},
    { TeamRank : 5, TeamName : "", winRate:""+'%'},
    { TeamRank : 6, TeamName : "", winRate:""+'%'},
    { TeamRank : 7, TeamName : "", winRate:""+'%'},
    { TeamRank : 8, TeamName : "", winRate:""+'%'},
    { TeamRank : 9, TeamName : "", winRate:""+'%'},
    { TeamRank : 10, TeamName : "", winRate:""+'%'}
  ]);

  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/predict");
      makeData(res.data);
    }
    var TName = [];

    const makeData = (items)=> {
      for(let i = 45; i < 55; i++){
        TName[i-45] = {
          TN : items[i].TeamName,
          preRate : items[i].predictrate
        }
      }

      setFinalRanking([
        { TeamRank : 1, TeamName : TName[0].TN, winRate:TName[0].preRate+'%'},
        { TeamRank : 2, TeamName : TName[1].TN, winRate:TName[1].preRate+'%'},
        { TeamRank : 3, TeamName : TName[2].TN, winRate:TName[2].preRate+'%'},
        { TeamRank : 4, TeamName : TName[3].TN, winRate:TName[3].preRate+'%'},
        { TeamRank : 5, TeamName : TName[4].TN, winRate:TName[4].preRate+'%'},
        { TeamRank : 6, TeamName : TName[5].TN, winRate:TName[5].preRate+'%'},
        { TeamRank : 7, TeamName : TName[6].TN, winRate:TName[6].preRate+'%'},
        { TeamRank : 8, TeamName : TName[7].TN, winRate:TName[7].preRate+'%'},
        { TeamRank : 9, TeamName : TName[8].TN, winRate:TName[8].preRate+'%'},
        { TeamRank : 10, TeamName : TName[9].TN, winRate:TName[9].preRate+'%'}
      ]);
    }
    
    callApi();
  }, [])

  var renderRank = finalRanking.map(team => {
    return(
      <tr key={team.TeamRank}>
        <td className='rOrder'>{team.TeamRank}</td>
        <td className="tName">{team.TeamName}</td>
        <td className='percent'>{team.winRate}</td>
      </tr>
    );
  });


  //여기까지 최종순위 예측 코드


  //여기서부터 남은 경기 결과 예측 코드

  

  const renderNav = (
    <NavLink className="nav-link" activeClassName="active" to="/">
      <h2 id='toHomeTxt'>More Schedule</h2>
      <img src='img/right.png' width="40px"></img>
    </NavLink>
  )

  return (
    <div className='Prewrapper'>
      <div className="aboveForPredict">
        <div className="nowMatch">
          <h2 id="todayResult">TODAY MATCH UP 예측</h2>
          <div className="matchBox">
            <div className="box1">
              <h3 className="txt1">1st MATCH</h3>

            </div>

            <div className="box1">
              <h3 className="txt1">2nd MATCH</h3>
              
            </div>
          </div>
        </div>

        <div className="finalRank">
          <h2 id="finalResult">LCK 최종 순위 예측</h2>
          <Table striped bordered hover className='tbRanked'>
            <thead>
              <tr className='tabHead'>
                <th className='ranking'>RANK</th>
                <th className='teamN'>TEAM NAME</th>
                <th className='predictRate'>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {renderRank}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="belowForPredict">


      </div>
      
      <div className="underForPredict">
        <h2 id='underPolo'>POLOL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id='explanation1'>AI를 활용한 LCK 경기 결과 예측 프로그램입니다.</p>
            <p id='explanation2'>상업적 이용을 금합니다.</p>
          </div>
          
        </div>
      </div>   
    </div>
  )
}

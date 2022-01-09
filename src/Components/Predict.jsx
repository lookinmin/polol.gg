import React,{useState, useEffect} from 'react'
import "./CSS/PredictCSS.css"
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table'
import {
  Link,
  NavLink
} from "react-router-dom";

export const Predict = () => {

  const RateValue = useSelector(state => state.RateValue);
  const TeamName = useSelector(state => state.TeamName);

  const [tName, setName] = useState({
    n1 : "",
    n2 : "",
    n3 : "",
    n4 : "",
    n5 : "",
    n6 : "",
    n7 : "",
    n8 : "",
    n9 : "",
    n10 : "",
  });

  const [tRate, setRate] = useState({
    r1 : "",
    r2 : "",
    r3 : "",
    r4 : "",
    r5 : "",
    r6 : "",
    r7 : "",
    r8 : "",
    r9 : "",
    r10 : "",
  });


  useEffect(() => {
    const value = 30;
    return () => {
      setName({
        n1 : "",        //여기에 순위대로 팀 명 지정 <- store에서 가져와서
        n2 : "",
        n3 : "",
        n4 : "",
        n5 : "",
        n6 : "",
        n7 : "",
        n8 : "",
        n9 : "",
        n10 : "",
      });
      setRate({
        r1 : value,     //여기에 순위대로 승률 지정
        r2 : value,
        r3 : "",
        r4 : "",
        r5 : "",
        r6 : "",
        r7 : "",
        r8 : "",
        r9 : "",
        r10 : "",
      })
    }
  }, [RateValue]);

  const finalRanking = [
    { TeamRank : 1, TeamName : tName.n1, winRate:tRate.r1+'%'},
    { TeamRank : 2, TeamName : tName.n2, winRate:tRate.r2+'%'},
    { TeamRank : 3, TeamName : tName.n3, winRate:tRate.r3+'%'},
    { TeamRank : 4, TeamName : tName.n4, winRate:tRate.r4+'%'},
    { TeamRank : 5, TeamName : tName.n5, winRate:tRate.r5+'%'},
    { TeamRank : 6, TeamName : tName.n6, winRate:tRate.r6+'%'},
    { TeamRank : 7, TeamName : tName.n7, winRate:tRate.r7+'%'},
    { TeamRank : 8, TeamName : tName.n8, winRate:tRate.r8+'%'},
    { TeamRank : 9, TeamName : tName.n9, winRate:tRate.r9+'%'},
    { TeamRank : 10, TeamName : tName.n10, winRate:tRate.r10+'%'},
  ]

  const renderRank = finalRanking.map(team => {
    return(
      <tr key={team.TeamRank}>
        <td className='rOrder'>{team.TeamRank}</td>
        <td className="tName">{team.TeamName}</td>
        <td className='percent'>{team.winRate}</td>
      </tr>
    );
  })

  //여기까지 최종순위 예측 코드


  //여기서부터 남은 경기 결과 예측 코드


  const MatchPageHead1 = [
    { Order : "0", MatchDay : "01 / 06",TeamLeft : tName.n1, TeamRight : tName.n2, winR1:tRate.r1+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "1", MatchDay : "01 / 16",TeamLeft : tName.n3, TeamRight : tName.n2, winR1:tRate.r2+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "2", MatchDay : "01 / 26",TeamLeft : tName.n5, TeamRight : tName.n2, winR1:tRate.r3+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "3", MatchDay : "02 / 01",TeamLeft : tName.n6, TeamRight : tName.n2, winR1:tRate.r4+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "4", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "5", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "6", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "7", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "8", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "9", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
  ]

  const MatchPageHead2 = [
    { Order : "0", MatchDay : "05 / 06",TeamLeft : tName.n1, TeamRight : tName.n2, winR1:tRate.r1+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "1", MatchDay : "05 / 16",TeamLeft : tName.n3, TeamRight : tName.n2, winR1:tRate.r2+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "2", MatchDay : "05 / 26",TeamLeft : tName.n5, TeamRight : tName.n2, winR1:tRate.r3+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "3", MatchDay : "05 / 01",TeamLeft : tName.n6, TeamRight : tName.n2, winR1:tRate.r4+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "4", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "5", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "6", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "7", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "8", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "9", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
  ]

  const MatchPageHead3 = [
    { Order : "0", MatchDay : "01 / 06",TeamLeft : tName.n1, TeamRight : tName.n2, winR1:tRate.r1+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "1", MatchDay : "01 / 16",TeamLeft : tName.n3, TeamRight : tName.n2, winR1:tRate.r2+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "2", MatchDay : "01 / 26",TeamLeft : tName.n5, TeamRight : tName.n2, winR1:tRate.r3+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "3", MatchDay : "02 / 01",TeamLeft : tName.n6, TeamRight : tName.n2, winR1:tRate.r4+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "4", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "5", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "6", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "7", MatchDay : "01 / 06",TeamLeft : tName.n7, TeamRight : tName.n2, winR1:tRate.r5+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "8", MatchDay : "01 / 06",TeamLeft : tName.n8, TeamRight : tName.n2, winR1:tRate.r6+'%', winR2:(100-tRate.r1)+'%'},
    { Order : "9", MatchDay : "01 / 06",TeamLeft : tName.n10, TeamRight : tName.n2, winR1:tRate.r7+'%', winR2:(100-tRate.r1)+'%'},
  ]
  

  const renderFirstArcodian = MatchPageHead1.map(num => {
    return(
      <Accordion.Item  eventKey={num.Order} key={num.Order}>
        <Accordion.Header><div className='Mdate'>{num.MatchDay}</div><div className='le'>{num.TeamLeft}VS{num.TeamRight}</div></Accordion.Header>
        <Accordion.Body>
          
        </Accordion.Body>
      </Accordion.Item> 
    );
  });

  const renderSecondArcodian = MatchPageHead2.map(num => {
    return(
      <Accordion.Item  eventKey={num.Order} key={num.Order}>
        <Accordion.Header><div className='Mdate'>{num.MatchDay}</div><div className='le'>{num.TeamLeft}VS{num.TeamRight}</div></Accordion.Header>
        <Accordion.Body>
          
        </Accordion.Body>
      </Accordion.Item> 
    );
  });

  const renderThirdArcodian = MatchPageHead3.map(num => {
    return(
      <Accordion.Item  eventKey={num.Order} key={num.Order}>
        <Accordion.Header><div className='Mdate'>{num.MatchDay}</div><div className='le'>{num.TeamLeft}VS{num.TeamRight}</div></Accordion.Header>
        <Accordion.Body>
          
        </Accordion.Body>
      </Accordion.Item> 
    );
  });

  const renderNav = (
    <NavLink className="nav-link" activeClassName="active" to="/">
      <h2 id='toHomeTxt'>More Schedule</h2>
      <img src='img/right.png' width="40px"></img>
    </NavLink>
  )

  // const renderUnder = (

  // )



  return (
    <div className='Prewrapper'>
      <div className="aboveForPredict">
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
            <Table striped bordered hover className='tbRanked'>
              <thead>
                <tr className='tabHead'>
                  <th className='ranking'>RANK</th>
                  <th className='teamN'>TEAM NAME</th>
                  <th className='predictRate'>예상 승률</th>
                </tr>
              </thead>
              <tbody>
                {renderRank}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="right">
          <h2 id="nextMatch">남은 경기 결과 예측</h2>
          <div className="matchHistory">
          {/* <Carousel interval={null}>

          </Carousel> */}
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" >
              <div className="btn_prev">
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"><img src='img/prev.png' width='30px' height="auto"></img></span>
                  <span className="visually-hidden">Previous</span>
                </button>
              </div>
              
              <div className="inner">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Accordion>
                      {renderFirstArcodian}
                    </Accordion>
                  </div>
                  <div className="carousel-item">
                    <Accordion>
                      {renderSecondArcodian}
                    </Accordion>
                  </div>
                  <div className="carousel-item">
                    <Accordion>
                      {renderThirdArcodian}
                    </Accordion>
                  </div>
                </div>
              </div>

              <div className="btn_right">
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"><img src='img/next.png' width='30px' height="auto"></img></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
                
          <div className="rBottom">
            {renderNav}
          </div>
        </div>
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

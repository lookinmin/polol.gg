import React, { useState, useEffect } from 'react'
import "./CSS/teamCSS.css"
import { CardFlip } from './CardFlip';
import axios from 'axios';

export const Team = () => {
  const [curteamdatail,setcurteamdatail]=useState({});
  var teamdetail = [
    { teamname: "T1", player: [], other: [] },
    { teamname: "DK", player: [], other: [] },
    { teamname: "GEN", player: [], other: [] },
    { teamname: "NS", player: [], other: [] },
    { teamname: "LSB", player: [], other: [] },
    { teamname: "KDF", player: [], other: [] },
    { teamname: "KT", player: [], other: [] },
    { teamname: "HLE", player: [], other: [] },
    { teamname: "BRO", player: [], other: [] },
    { teamname: "DRX", player: [], other: [] }
  ];
  const teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [curteam, setcurteam] = useState("0");
  const teamicon = teams.map((teamname, index) => {
    const teamaddres = "img/" + index + ".png";
    return <img onClick={(e) => {
      setcurteam(e.target.id+"");
    }} key={index} src={teamaddres} id={index} />
  });

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/team");
      makeData(res.data);
    }
    const makeData = (items) => {
      for (let i = 0; i < 62; i++) {
        switch (items[i].team) {
          case "T1":
            teamdetail[0].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "DK":
            teamdetail[1].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "GEN":
            teamdetail[2].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "NS":
            teamdetail[3].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "LSB":
            teamdetail[4].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "KDF":
            teamdetail[5].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "KT":
            teamdetail[6].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "HLE":
            teamdetail[7].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "BRO":
            teamdetail[8].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
          case "DRX":
            teamdetail[9].player.push({ name: items[i].Name, Kname: items[i].koreaName, pos: items[i].position, born: items[i].birth, pic: items[i].pic, main: items[i].main });
            break;
        }
      }
      for (let i = 62; i < 94; i++) {
        switch (items[i].Team) {
          case "T1":
            teamdetail[0].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "DK":
            teamdetail[1].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "GEN":
            teamdetail[2].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "NS":
            teamdetail[3].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "LSB":
            teamdetail[4].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "KDF":
            teamdetail[5].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "KT":
            teamdetail[6].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "HLE":
            teamdetail[7].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "BRO":
            teamdetail[8].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
          case "DRX":
            teamdetail[9].other.push({ name: items[i].Name, Kname: items[i].koreanName, role: items[i].role, born: items[i].birth, pic: items[i].pic });
            break;
        }
      }
    }
    const ssibal=()=>{
      setcurteamdatail("시발");
      console.log(teamdetail);
      console.log(curteamdatail);
    }
    callApi();
    ssibal();
    
  }, []);
  
  
  const Makeicon = ({ player }) => {
    const Makesvg = ({ position }) => {
      switch (position) {
        case "TOP":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path fillOpacity="0.3" d="M11.11 100l16.67-16.67h55.55V27.78L100 11.11V100z"></path>
              <path fillOpacity="0.3" d="M38.94 38.94v22.24h22.24V38.94z"></path>
              <path d="M0 0v88.89l16.67-16.67V16.67h55.55L88.89 0z"></path>
            </svg>
          )
        case "MID":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M16.67 100L100 16.67V0H83.33L0 83.33V100z"></path>
              <path fillOpacity="0.3" d="M83.33 50L100 33.33V100H33.33L50 83.33h33.33zM66.67 0L50 16.67H16.67V50L0 66.67V0z"></path>
            </svg>
          )
        case "JG":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M81.82 0a124.75 124.75 0 00-27.27 36.36 160.53 160.53 0 014.54 22.73S63.6 50 63.64 50c0-13.25 18.18-50 18.18-50zM31.82 59.09c-5.54-14.94-12.45-20-27.27-27.27C18.07 43 22.73 72.73 22.73 72.73S39.16 79.68 50 100C66 63 38.2 23.47 18.18 0c9.34 23.47 13.64 34 13.64 59.09zM63.64 72.73v13.63l18.18-18.18c0-15.1.11-29.71 13.63-40.91C77 36.33 63.64 62.09 63.64 72.73z"></path>
            </svg>
          )
        case "ADC":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M11.11 100l16.67-16.67h55.55V27.78L100 11.11V100z"></path>
              <path fillOpacity="0.3" d="M38.94 38.94v22.24h22.24V38.94z"></path>
              <path fillOpacity="0.3" d="M0 0v88.89l16.67-16.67V16.67h55.55L88.89 0z"></path>
            </svg>
          )
        case "SPT":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" type="ICON" className='icon'>
              <path d="M90.4 2.11c0 27.3-25.4 36.63-25.4 36.63L60.94 61a8.39 8.39 0 00-.48 2.39 6.95 6.95 0 0013.89 0 6.7 6.7 0 00-5.75-6.7c6.71-11.5 16.29-6 16.29-6 1.43-1.44 2.63-2.88 3.83-4.07l-7.19-2.88h9.34a38.5 38.5 0 005.75-11.25L87 28.69h10.3a33 33 0 00-6.9-26.58M35.32 38.74S9.93 29.41 9.93 2.11c0 0-9.82 10.77-7.42 26.1h10.3L3.23 32a41.09 41.09 0 004.07 8.9h11l-8.61 3.59a39.83 39.83 0 005.27 6s9.58-5.51 16.29 6a6.7 6.7 0 00-5.75 6.7 6.95 6.95 0 1013.41-2.39zM45.14 22.7l2.63-6.7h4.79l2.63 6.94-5 13.89zm-1-16l-7 16 10.15 25.38v23.71l-5 16 5 10H53l5-10-5-16V48.08L63.1 22.7l-7-16z"></path>
            </svg>
          )
      }
    }
    return (
      <div className={player.pos}>
        <img className='playerphoto' src={player.pic} />
        <Makesvg position={player.pos} />
        <p className='playername'>
          {player.name}
        </p>
      </div>
    )
  };
  

  return (
    <>
      <div>
        { }
      </div>
      <div id="container">
        <div className='selecTeam'>
          {teamicon}
        </div>
        <div className="map">
          <div className='teamname'>
            <img src={"img/"+curteam+".png"} />
          </div>
        </div>
        <div className='detailbox' >
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
    </>
  )
}
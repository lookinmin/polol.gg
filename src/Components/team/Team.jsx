import React, { useState, useEffect, useRef  } from 'react'
import "./teamCSS.css"
import { CardFlip } from './CardFlip';
import axios from 'axios';

export const Team = () => {
  const ref = useRef(null);
  const [teamstate,setteamstate]=useState();
  const [card,setcard]=useState(<></>);
  const [icons,seticons]=useState(<></>);
  const [curteam,setcurteam]=useState(0);
  const teamdetail = [
    { teamname: "T1", player: [], other: [] ,color:"#e4002b"},
    { teamname: "DK", player: [], other: [] ,color:"#0ec7b5"},
    { teamname: "GEN", player: [], other: [] ,color: "#aa8a00"},
    { teamname: "NS", player: [], other: [] ,color: "#de2027"},
    { teamname: "LSB", player: [], other: [] ,color: "#ffc900"},
    { teamname: "KDF", player: [], other: [] ,color: "#e73312"},
    { teamname: "KT", player: [], other: [] ,color: "#FF0A07"},
    { teamname: "HLE", player: [], other: [] ,color: "#ff6b01"},
    { teamname: "BRO", player: [], other: [] ,color: "#ffffff"},
    { teamname: "DRX", player: [], other: [] ,color: "#5a8dff"}
  ];
  const teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const teamicon = teams.map((teamname, index) => {
    const teamaddres = "img/" + index + ".png";
    return <img className={(index==0||index==7)?"ture":"false"} onClick={(e) => {
      setcurteam(e.target.id);
      seticons(makeicons(teamstate[e.target.id].player,teamstate[e.target.id].color));
      setcard(makecard(teamstate[e.target.id]));
    }} key={index} src={teamaddres} id={index} alt=''/>
  });

  const makecard=(Team)=>{
    const temp1=Team.player.map((ply)=><CardFlip key={ply.name} player1={ply} teamname={Team.teamname} color1={Team.color}/>);
    const temp2=Team.other.map((ply)=><CardFlip key={ply.name} player1={ply} teamname={Team.teamname} color1={Team.color}/>);
    return temp1.concat(temp2);
  }
  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/team");
      makeData(res.data);
    }
    const makeData = (items) => {
      for (let i = 0; i < items.Player.length; i++) {
        let count=null;
        if(items.Player[i].Win==null){
          count=0;
        }
        else{
          count=items.Player[i].Win+items.Player[i].Lose;
        }
        let [month,day,year]=items.Player[i].Birth.split(" ")
        let birth = month.slice(0,3)+" "+day.slice(0,day.length-1)+ ", "+ year;
        switch (items.Player[i].Team) {
          case "T1":
            teamdetail[0].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "DK":
            teamdetail[1].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "GEN":
            teamdetail[2].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "NS":
            teamdetail[3].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "LSB":
            teamdetail[4].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "KDF":
            teamdetail[5].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "KT":
            teamdetail[6].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "HLE":
            teamdetail[7].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "BRO":
            teamdetail[8].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          case "DRX":
            teamdetail[9].player.push({ name: items.Player[i].Name, Kname: items.Player[i].KoreaName, pos: items.Player[i].Position, born: birth, pic:items.Player[i].Pic , Game_count:count});
            break;
          default:
            break;
        }
      }
      for (let i = 0; i < items.Coach.length; i++) {
        let [month,day,year]=items.Player[i].Birth.split(" ")
        let birth = month.slice(0,3)+" "+day.slice(0,day.length-1)+ ", "+ year;
        switch (items.Coach[i].Team) {
          case "T1":
            teamdetail[0].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "DK":
            teamdetail[1].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "GEN":
            teamdetail[2].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "NS":
            teamdetail[3].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "LSB":
            teamdetail[4].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "KDF":
            teamdetail[5].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "KT":
            teamdetail[6].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "HLE":
            teamdetail[7].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "BRO":
            teamdetail[8].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          case "DRX":
            teamdetail[9].other.push({ name: items.Coach[i].Name, Kname: items.Coach[i].KoreaName, pos: items.Coach[i].Role, born: birth, pic:items.Coach[i].Pic  });
            break;
          default:
            break;
        }
      }
      setteamstate([...teamdetail]);
    }    
    callApi();
    
    
  }, []);

  
  useEffect(()=>{
    if(teamstate!==undefined){
     seticons(makeicons(teamstate[curteam].player,teamstate[curteam].color));
     setcard(makecard(teamstate[curteam]));
    }
  },[teamstate])

  const makeicons=(icon_team,teamcolor)=>{
    const Makeicon = ({ player }) => {
      const Makesvg = ({ Position }) => {
        switch (Position) {
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
          default:
            break;
        }
      }
      return (
        <div onClick={()=>{ref.current.scrollIntoView({  behavior: 'smooth' })}} style={{ fill:teamcolor}} className={player.pos+" player"}>
          <img className='playerphoto' src={player.pic} alt=''/>
          <p style={{color:teamcolor}} className='playername'>
            <Makesvg Position={player.pos}/>
            <span>{player.name}</span>
            
          </p>
        </div>
      )
    };
    var temp=[];
    let overlap={
      TOP:null,
      MID:null,
      ADC:null,
      SPT:null,
      JG:null
    }
    for(let i=0;i<icon_team.length;i++){
      
      switch (icon_team[i].pos) {
        case "TOP":
          if(overlap.TOP==null){
            overlap.TOP=(icon_team[i]);
          }
          else{
            if(icon_team[i].Game_count>overlap.TOP.Game_count)
              overlap.TOP=icon_team[i];
          }
          break;
        case "MID":
          if(overlap.MID==null){
            overlap.MID=(icon_team[i]);
          }
          else{
            if(icon_team[i].Game_count>overlap.MID.Game_count)
              overlap.MID=icon_team[i];
          }
          break;
        case "ADC":
          if(overlap.ADC==null){
            overlap.ADC=(icon_team[i]);
          }
          else{
            if(icon_team[i].Game_count>overlap.ADC.Game_count)
              overlap.ADC=icon_team[i];
          }
          break;
        case "SPT":
          if(overlap.SPT==null){
            overlap.SPT=(icon_team[i]);
          }
          else{
            if(icon_team[i].Game_count>overlap.SPT.Game_count)
              overlap.SPT=icon_team[i];
          }
          break;
        case "JG":
          if(overlap.JG==null){
            overlap.JG=(icon_team[i]);
          }
          else{
            if(icon_team[i].Game_count>overlap.JG.Game_count)
              overlap.JG=icon_team[i];
          }
          break;
      }
    }
    temp.push(<Makeicon key={1} player={overlap.TOP}/>)
    temp.push(<Makeicon key={2} player={overlap.MID}/>)
    temp.push(<Makeicon key={3} player={overlap.SPT}/>)
    temp.push(<Makeicon key={4} player={overlap.ADC}/>)
    temp.push(<Makeicon key={5} player={overlap.JG}/>)
    return temp;
  }

  return (
    <>
      <div id="container">
        <div>2022 spring seaon</div>
        <div className='selecTeam'>
          {teamicon}
        </div>
        <div className="map">
          <div className='teamname'>
            <img src={"img/"+curteam+".png"} alt=''/>
          </div>
          {icons}
        </div>
        <div ref={ref} className='detailbox' >
          {card}
        </div>

        <div className="underForPredict">
          <h2 id='underPolo'>KILL.GG</h2>
          <div className="exp">
            <div className="space"></div>
            <div className="space1">
              <p id='explanation1'>LCK Match History는</p>
              <p id='explanation2'>KILL.GG</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
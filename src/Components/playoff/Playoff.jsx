import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
export const Playoff = () => {
  const [shadow,setshadow]=useState([,,,,])
  const [loading,setloading]=useState(true);
  const [pos, setpos] = useState([,"vs36", "vs45", "rank3", "rank4", "rank5", "rank6"]);
  const [rank_bypic,setrank_bypic]=useState([,
    {pic: "img/LCK_null.png"},
    {pic: "img/LCK_null.png"},
    {pic: "img/LCK_null.png"},
    {pic: "img/LCK_null.png"},
    {pic: "img/LCK_null.png"},
    {pic: "img/LCK_null.png"}])
  const match_data = useRef(null);

  const callApi = async () => {
    const res = await axios.get("http://localhost:3002/playoff");
    makeData(res.data.data);
    setTimeout(() => {
      setloading(false);
      animation();
    }, 100);
  };

  const makeData = (items) => {
    var progress_match;//매치 진행정도
    let ranking;//정규시즌 랭킹
    if(items.length==0){//정규시즌 중 
      ranking=null;
      progress_match=-1;
      match_data.current={progress_match:progress_match};
    }
    else{//정규시즌 끝나고 랭킹집계 완료
      ranking=items[items.length-1];
      progress_match = items.length - 1;//매치 진행정도
      const calc_rank=(teamname)=> {//팀과 랭킹 매핑
        switch(teamname){
          case ranking.rank1:
            return 1;
          case ranking.rank2:
            return 2;
          case ranking.rank3:
            return 3;
          case ranking.rank4:
            return 4;
          case ranking.rank5:
            return 5;
            case ranking.rank6:
            return 6;
          default:
            return null;
        }
      }
      const clac_matchs = (items) => {//각 경기 데이터 처리
        let winner;
        if (items.LScore > items.RScore)
          winner = items.Lteam
        else
          winner = items.Rteam
        return {
          team1: calc_rank(items.Lteam),
          team2: calc_rank(items.Rteam),
          win: calc_rank(winner),
        }
      }
      
      let temp = {
        progress_match:progress_match
      }
      switch(progress_match){
        case 5:
          temp.game5=clac_matchs(items[4]);
        case 4:
          temp.game4=clac_matchs(items[3]);
        case 3:{
          temp.game3=clac_matchs(items[2]);
          let copy=[...rank_bypic]
          copy[1].pic=setPicture(ranking.rank1);
          copy[2].pic=setPicture(ranking.rank2);
          setrank_bypic(copy);
        }
        case 2:
          temp.game2=clac_matchs(items[1]);
        case 1:
          temp.game1=clac_matchs(items[0]);
          try{
            if(temp.game1.win==temp.game3.team1||temp.game1.win==temp.game3.team2){
              setpos((chgpos) => {
                chgpos[1] = "vs36"
                chgpos[2] = "vs45"
                return chgpos;
              })
            }
            else {
              setpos((chgpos) => {
                chgpos[1] = "vs45"
                chgpos[2] = "vs36"
                return chgpos;
              })
            }
          }
          catch{
          }
        case 0:{
          let copy=[...rank_bypic]
          copy[3].pic=setPicture(ranking.rank3);
          copy[4].pic=setPicture(ranking.rank4);
          copy[5].pic=setPicture(ranking.rank5);
          copy[6].pic=setPicture(ranking.rank6);
          setrank_bypic(copy);
          match_data.current=temp;
        }
          break;
        default:
          break;
      }
    }
  }

  const setPicture = (e) => {
    var result;
    switch (e) {
      case "T1":
        result = "img/0.PNG";
        break;
      case "DK":
        result = "img/1.PNG";
        break;
      case "GEN":
        result = "img/2.PNG";
        break;
      case "NS":
        result = "img/3.PNG";
        break;
      case "LSB":
        result = "img/4.PNG";
        break;
      case "KDF":
        result = "img/5.PNG";
        break;
      case "KT":
        result = "img/6.PNG";
        break;
      case "HLE":
        result = "img/7.PNG";
        break;
      case "BRO":
        result = "img/8.PNG";
        break;
      case "DRX":
        result = "img/9.PNG";
        break;
      default:
        result = "img/LCK_null.png";
    }
    return result;
  };

  const animation=()=>{
    let workspace=[...pos]
    switch(match_data.current.progress_match){
      case 4:
      case 3:{
        if(workspace[1]=="vs45"){
          workspace[1]=workspace[1]+ " ani45"
        }
        else{
          workspace[1]=workspace[1]+ " anivs36"
        }
      }
      case 2:{
        workspace[4]=workspace[4]+ " ani4"
        workspace[5]=workspace[5]+ " ani5"
      }
      case 1:{
        workspace[3]=workspace[3]+ " ani3"
        workspace[6]=workspace[6]+ " ani6"
        setpos(workspace);
      }
      default:
    }
  }

  const animation45=()=>{
    if(match_data.current.progress_match==3){
      let workspace = [...pos]
      let save=workspace[match_data.current.game2.win].split(' ',1)
      let shadow_temp=[...shadow];
      if(shadow_temp[1]==undefined){
        shadow_temp[1]=(<div key={save} style={{opacity:"0.2"}} className={"playoffTeam "+save} ><img className='tImg' src={rank_bypic[match_data.current.game2.win].pic}></img></div>)
        setshadow(shadow_temp);
      }
      workspace[match_data.current.game2.win] = "win45"
      workspace[match_data.current.game1.win] = workspace[match_data.current.game1.win]+" ani36"
      setpos(workspace);
    }
    else{
      let workspace = [...pos]
      let save=workspace[match_data.current.game2.win].split(' ',1)
      let shadow_temp=[...shadow];
      if(shadow_temp[1]==undefined){
        shadow_temp[1]=(<div key={save} style={{opacity:"0.2"}} className={"playoffTeam "+save} ><img className='tImg' src={rank_bypic[match_data.current.game2.win].pic}></img></div>)
        setshadow(shadow_temp);
      }
      workspace[match_data.current.game2.win] = "win45"
      setpos(workspace);
    }
    
  }
  
  const animation36=()=>{
    if(match_data.current.progress_match==3&&shadow[0]!==undefined&&shadow[2]!=undefined){
      let workspace = [...pos]
      var save=workspace[match_data.current.game3.win].split(' ',1)
      let shadow_temp=[...shadow];
      if(shadow_temp[2]==undefined){
        shadow_temp[2]=(<div key={save} style={{opacity:"0.2"}} className={"playoffTeam "+save} ><img className='tImg' src={rank_bypic[match_data.current.game3.win].pic}></img></div>)
        setshadow(shadow_temp);
      }
      workspace[match_data.current.game3.win] = "winvs36"
      setpos(workspace);
    }
    else if(shadow[0]==undefined){
      let workspace = [...pos]
      let save=workspace[match_data.current.game1.win].split(' ',1)
      let shadow_temp=[...shadow];
      if(shadow_temp[0]==undefined){
        shadow_temp[0]=(<div key={save} style={{opacity:"0.2"}} className={"playoffTeam "+save} ><img className='tImg' src={rank_bypic[match_data.current.game1.win].pic}></img></div>)
        setshadow(shadow_temp);
      }
      workspace[match_data.current.game1.win] = "win36"
      setpos(workspace);
    }
    
  }


  useEffect(()=>{
    callApi();
  },[])
  const test = () => {
    console.log(match_data)
    console.log(pos)
    console.log(rank_bypic)
  }
  return (
    <>
      {loading ? (
      <div className='POloading'>
        <div className="center" >
          <PulseLoader size={"5vw"} margin={"5vw"} color={"#c6c6ca"}/>
        </div>
      </div>) : match_data.current.progress_match==-1?
      (<div>플레이오프시즌이 아닙니다.</div>):
      (<div className='PlayOFF'>
        <button onClick={test}>test</button>
        <div className={"playoffTeam "+pos[1]} ><img className='tImg' src={rank_bypic[1].pic}></img></div>
        <div className={"playoffTeam "+pos[2]} ><img className='tImg' src={rank_bypic[2].pic}></img></div>
        <div onAnimationEnd={animation36} className={"playoffTeam "+pos[3]} ><img className='tImg' src={rank_bypic[3].pic}></img></div>
        <div onAnimationEnd={animation45} className={"playoffTeam "+pos[4]} ><img className='tImg' src={rank_bypic[4].pic}></img></div>
        <div onAnimationEnd={animation45} className={"playoffTeam "+pos[5]} ><img className='tImg' src={rank_bypic[5].pic}></img></div>
        <div onAnimationEnd={animation36} className={"playoffTeam "+pos[6]} ><img className='tImg' src={rank_bypic[6].pic}></img></div>
        {shadow}
        <img className='trophy' src='img/trophy.png'></img>
      </div>)
      }
    
      <div className="underForPredict">
        <h2 id="underPolo">KILL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id="explanation1">
              LCK Match History는
            </p>
            <p id="explanation2">KILL.GG</p>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react';
import './CSS/card.css';
import axios from 'axios';

export const PlayerCard = ({setmove, Line, move }) => {
  const [TOPplayer, setTOPplayer] = useState([]);
  const [JGLplayer, setJGLplayer] = useState([]);
  const [MIDplayer, setMIDplayer] = useState([]);
  const [ADplayer, setADplayer] = useState([]);
  const [SPTplayer, setSPTplayer] = useState([]);
  const [flag,setflag]=useState([true,[]]);
  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/players");
      makeData(res.data);
    }
    var TopInfo = [];
    var UnderInfo = [];

    const makeData = (items) => {
      for (let i = 0; i < 62; i++) {
        TopInfo[i] = {
          Team: items[i].team,
          Name: items[i].Name,
          POS: items[i].position
        }
        UnderInfo[i] = {
          win: items[i].win,
          lose: items[i].lose,
          kill: items[i].kill,
          death: items[i].death,
          assist: items[i].assist
        }
      }
      var KDAs = [];
      var playerPic = [];

      var TOPp = new Array();
      var JGp = new Array();
      var MIDp = new Array();
      var ADCp = new Array();
      var SPTp = new Array();

      const setPicture = (e) => {
        var reesult;
        switch (e) {
          case "T1":
            reesult = "img/0.PNG";
            break;
          case "DK":
            reesult = "img/1.PNG";
            break;
          case "GEN":
            reesult = "img/2.PNG";
            break;
          case "NS":
            reesult = "img/3.PNG";
            break;
          case "LSB":
            reesult = "img/4.PNG";
            break;
          case "KDF":
            reesult = "img/5.PNG";
            break;
          case "KT":
            reesult = "img/6.PNG";
            break;
          case "HLE":
            reesult = "img/7.PNG";
            break;
          case "BRO":
            reesult = "img/8.PNG";
            break;
          case "DRX":
            reesult = "img/9.PNG";
            break;
          default:
            break;
        }
        return reesult;
      };

      const positionPic = (e) => {
        var result;
        switch (e) {
          case "TOP":
            result = "img/positions/TOP.png";
            break;
          case "JG":
            result = "img/positions/JGL.png";
            break;
          case "MID":
            result = "img/positions/MID.png";
            break;
          case "ADC":
            result = "img/positions/AD.png";
            break;
          case "SPT":
            result = "img/positions/SPT.png";
            break;
        }
        return result;
      }

      for (let i = 0; i < 62; i++) {
        playerPic[i] = ("img/" + TopInfo[i].Team + "/" + TopInfo[i].Name + ".png");
        KDAs[i] = ((UnderInfo[i].kill + UnderInfo[i].assist) / (UnderInfo[i].death)).toFixed(2);

        switch (TopInfo[i].POS) {
          case "TOP":
            TOPp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist
            })
            break;
          case "JG":
            JGp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist
            })
            break;

          case "MID":
            MIDp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist
            })
            break;

          case "ADC":
            ADCp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist
            })
            break;

          case "SPT":
            SPTp.push({
              Name: TopInfo[i].Name,
              Team: setPicture(TopInfo[i].Team),
              pic: playerPic[i],
              position: positionPic(TopInfo[i].POS),
              KDA: KDAs[i],
              win: UnderInfo[i].win,
              lose: UnderInfo[i].lose,
              kill: UnderInfo[i].kill,
              death: UnderInfo[i].death,
              assist: UnderInfo[i].assist
            })
            break;
        }
      }

      TOPp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      JGp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      MIDp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      ADCp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;
      });

      SPTp.sort(function (a, b) {
        return a.KDA < b.KDA ? 1 : a.KDA > b.KDA ? -1 : 0;

      });

      setTOPplayer(TOPp);
      setJGLplayer(JGp);
      setMIDplayer(MIDp);
      setADplayer(ADCp);
      setSPTplayer(SPTp);
    }

    callApi();
  }, []);

  var select;

  switch (Line) {
    case "TOP":
      select = TOPplayer;
      break;
    case "JGL":
      select = JGLplayer;
      break;
    case "MID":
      select = MIDplayer;
      break;
    case "AD":
      select = ADplayer;
      break;
    case "SPT":
      select = SPTplayer;
      break;
    default:
      select = [];
  }

  const hover=(index)=>{
    if(flag[0]){
      
      var temp=move.map((num)=>{
        return {transform:num.transform}
      })
      setflag([false,[...temp]]);
      var dd=(1-window.scrollY/900)*250+50;
      console.log(dd)
      //temp[index]={transform:temp[index].transform+" scale(1.2)"}
      temp[index]={transform:"translate(300%, -"+dd+"%) scale(1.2)", zIndex:"10"}
      setmove(temp);
    }
    else{
      console.log("복구")
      setmove(flag[1]);
      setflag([true,[]]);
    }
    
  }
  var renderCard = select.map((num, index) => {
    return (
      <div style={move[index]} className={'PCard '} key={num.Name}>
        <div className="TOPINFO">
          <div className="C_left">
            <img src={num.Team} width="auto" height="35px" className='C_Team' />
            <h2 className='C_Name'>{num.Name}</h2>
          </div>
          <img src={num.position} width="auto" height="35px" id='C_POS' />
        </div>
        <div className="MIDINFO">
          <div className="C_PlayerPic">
            <img src={num.pic} width="auto" height="110px" id='C_PP' />
          </div>
          <div className="MIs">
            <h2 className='C_KDA'>{num.KDA}</h2>
          </div>
        </div>
        <div className="UNDERINFO">
          <div className="winlose">
            <h2 className='C_WIN'>{num.win}승</h2>
            <h2 className='C_LOSE'>{num.lose}패</h2>
          </div>
          <div className="C_info">
            <h2 className='C_kill'>{num.kill}킬</h2>
            <h2 className='C_death'>{num.death}데스</h2>
            <h2 className='C_assist'>{num.assist}어시</h2>
          </div>
        </div>
        <div onMouseOver={()=>{hover(index)}} onMouseOut={()=>{hover(index)}} className='cover'>
        </div>
      </div>
    )
  })

  return (
    <div onClick={(e) => { e.stopPropagation() }} className="imsi">
      {renderCard}
    </div>
  );
};

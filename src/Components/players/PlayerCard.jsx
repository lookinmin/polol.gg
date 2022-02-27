import React, { useEffect, useState } from 'react';
import './card.css';

export const PlayerCard = ({ position,setmove, move }) => {
  
  const [flag,setflag]=useState([true,[]]);
  const hover=(index)=>{
    if(move[0].transform=="translate(0%,0%) scale(0.8)"||move[4].transform=="translate(0%,0%) scale(0.8)"){
    }
    else{
      
      if(flag[0]){
        var temp=move.map((num)=>{
          return {transform:num.transform}
        })
        setflag([false,[...temp]]);
        var dd=(1-window.scrollY/900)*250+50;
        temp[index]={transform:temp[index].transform+" scale(1.3)", zIndex:"13"}
        //temp[index]={transform:"translate(300%, -"+dd+"%) scale(1.2)", zIndex:"10"}
        setmove(temp);
      }
      else{
        setmove(flag[1]);
        setflag([true,[]]);
      }
    }
  }
  var renderCard = position.map((num, index) => {
    return (
      <div style={move[index]} className={'PCard '} key={num.Name}>
        <div className="TOPINFO">
          <img src={num.Team}/>
          <h2>{num.Name}</h2>
          <img src={num.position}/>
        </div>
        <div className="MIDINFO">
          <div>
            <img src={num.pic} />
          </div>
            <h2>{num.KDA}</h2>
        </div>
        <div className="UNDERINFO">
          <div className="winlose">
            <h2 >{num.win}승</h2>
            <h2 >{num.lose}패</h2>
          </div>
          <div className="C_info">
            <h2 >{num.kill}킬</h2>
            <h2 >{num.death}데스</h2>
            <h2 >{num.assist}어시</h2>
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

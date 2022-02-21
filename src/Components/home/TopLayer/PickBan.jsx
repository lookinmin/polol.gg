import React from "react";
import "./Champions.css";

export const PickBan = ({ data }) => {
  var name = [];
  var url = [];
  var pick = [];
  var ban = [];
  var winRate = [];
  var win = [];
  var lose = [];
  var total = [];

  data.sort((a, b) => {
    if(a.Total === b.Total){
      return b.Win - a.Win;
    }
    return b.Total - a.Total;
  });
  
  for (const e of data) {
    name.push(e.Name);
    url.push(e.Url);
    pick.push(e.Pick);
    ban.push(e.Ban);
    winRate.push(e.Rate);
    win.push(e.Win);
    lose.push(e.Lose);
    total.push(e.Total);
  }

  const pick_col = {
    color : 'blue'
  }

  const ban_col = {
    color : 'red'
  }

  return (
    <>
      <div className="championsWrapper">
        <div className="championsFront championsCard">
          <div className="championsChamp" >
            <div className="championsChampInfo">
                {1}
            </div>
            <div className="championsChampPic">
              <img src={url[0]} height="130px" width="85px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{pick[0]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{ban[0]} BAN</div>
            <div className="backCardWrapper">{win[0]+"-"+lose[0]}</div>
            <div className="backCardWrapper">승률: {winRate[0]}</div>
          </div>
        </div>
      </div>

      <div className="championsWrapper">
        <div className="championsFront championsCard">
          <div className="championsChamp">
            <div className="championsChampInfo">
                {2}
            </div>
            <div className="championsChampPic">
              <img src={url[1]} height="130px" width="85px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{pick[1]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{ban[1]} BAN</div>
            <div className="backCardWrapper">{win[1]+"-"+lose[1]}</div>
            <div className="backCardWrapper">승률: {winRate[1]}</div>
          </div>
        </div>
      </div>

      <div className="championsWrapper">
        <div className="championsFront championsCard">
          <div className="championsChamp">
            <div className="championsChampInfo">
                {3}
            </div>
            <div className="championsChampPic">
              <img src={url[2]} height="130px" width="85px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{pick[2]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{ban[2]} BAN</div>
            <div className="backCardWrapper">{win[2]+"-"+lose[2]}</div>
            <div className="backCardWrapper">승률: {winRate[2]}</div>
          </div>
        </div>
      </div>
    </>
  );
};
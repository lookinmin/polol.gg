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

  for (const e of data) {
    name.push(e.name);
    url.push(e.url);
    pick.push(e.pick);
    ban.push(e.ban);
    winRate.push(e.winRate);
    win.push(e.win);
    lose.push(e.lose);
  }

  return (
    <>
      <div className="championsWrapper">
        <div className="championsFront championsCard">
          <div className="championsChamp">
            <div className="championsChampInfo">
                {1}
            </div>
            <div className="championsChampPic">
              <img src={url[2]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper">픽: {pick[2]}</div>
            <div className="backCardWrapper">밴: {ban[2]}</div>
            <div className="backCardWrapper">승패: {win[2]+"-"+lose[2]}</div>
            <div className="backCardWrapper">승률: {winRate[2]}</div>
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
              <img src={url[1]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper">픽: {pick[1]}</div>
            <div className="backCardWrapper">밴: {ban[1]}</div>
            <div className="backCardWrapper">승패: {win[1]+"-"+lose[1]}</div>
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
              <img src={url[0]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper">픽: {pick[0]}</div>
            <div className="backCardWrapper">밴: {ban[0]}</div>
            <div className="backCardWrapper">승패: {win[0]+"-"+lose[0]}</div>
            <div className="backCardWrapper">승률: {winRate[0]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

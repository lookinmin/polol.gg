import React from "react";
import "./Champions.css";

export const PickBan = ({ data }) => {
  var Name = [];
  var Url = [];
  var Pick = [];
  var Ban = [];
  var Rate = [];
  var Win = [];
  var Lose = [];

  for (const e of data) {
    Name.push(e.Name);
    Url.push(e.Url);
    Pick.push(e.Pick);
    Ban.push(e.Ban);
    Rate.push(e.Rate);
    Win.push(e.Win);
    Lose.push(e.Lose);
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
              <img src={Url[2]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{Pick[2]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{Ban[2]} BAN</div>
            <div className="backCardWrapper">{Win[2]+"-"+Lose[2]}</div>
            <div className="backCardWrapper">승률: {Rate[2]}</div>
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
              <img src={Url[1]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{Pick[1]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{Ban[1]} BAN</div>
            <div className="backCardWrapper">{Win[1]+"-"+Lose[1]}</div>
            <div className="backCardWrapper">승률: {Rate[1]}</div>
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
              <img src={Url[0]} height="130px" width="80px"></img>
            </div>
          </div>
        </div>
        <div className="championsBack championsCard">
          <div className="backCardContainer">
            <div className="backCardWrapper" style={pick_col}>{Pick[0]} PICK</div>
            <div className="backCardWrapper" style={ban_col}>{Ban[0]} BAN</div>
            <div className="backCardWrapper">{Win[0]+"-"+Lose[0]}</div>
            <div className="backCardWrapper">승률: {Rate[0]}</div>
          </div>
        </div>
      </div>
    </>
  );
};
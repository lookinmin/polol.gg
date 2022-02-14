import React from "react";
import "./Champions.css";

export const PickBan = ({ data }) => {
  var name = [];
  var url = [];
  var pick = [];
  var ban = [];
  for (const e of data) {
    name.push(e.name);
    url.push(e.url);
    pick.push(e.pick);
    ban.push(e.ban);
  }

  return (
    <>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[2]} height="100px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBan">Bans: {ban[2]}</div>
          <div className="championsChampPick">Picks: {pick[2]}</div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[1]} height="100px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBan">Bans: {ban[1]}</div>
          <div className="championsChampPick">Picks: {pick[1]}</div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[0]} height="100px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBan">Bans: {ban[0]}</div>
          <div className="championsChampPick">Picks: {pick[0]}</div>
        </div>
      </div>
    </>
  );
};

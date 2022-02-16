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
          <img src={url[2]} height="140px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="banPickNum" style={{ color: "blue" }} title="Picks">
            {pick[2]}
          </div>
          <div style={{ color: "black" }}>/</div>
          <div className="banPickNum" style={{ color: "red" }} title="Bans">
            {ban[2]}
          </div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[1]} height="140px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="banPickNum" style={{ color: "blue" }} title="Picks">
            {pick[1]}
          </div>
          <div style={{ color: "black" }}>/</div>
          <div className="banPickNum" style={{ color: "red" }} title="Bans">
            {ban[1]}
          </div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[0]} height="140px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="banPickNum" style={{ color: "blue" }} title="Picks">
            {pick[0]}
          </div>
          <div style={{ color: "black" }}>/</div>
          <div className="banPickNum" style={{ color: "red" }} title="Bans">
            {ban[0]}
          </div>
        </div>
      </div>
    </>
  );
};
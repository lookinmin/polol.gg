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
          <img src={url[2]} height="120px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Ban.png" width="30px" />
            </div>
            <div className="banPickNum" style={{ color: "red" }}>
              {ban[2]}
            </div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum" style={{ color: "blue" }}>
              {pick[2]}
            </div>
          </div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[1]} height="120px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Ban.png" width="30px" />
            </div>
            <div className="banPickNum" style={{ color: "red" }}>
              {ban[1]}
            </div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum" style={{ color: "blue" }}>
              {pick[1]}
            </div>
          </div>
        </div>
      </div>
      <div className="championsChamp" id="lastBox">
        <div className="championsChampPic">
          <img src={url[0]} height="120px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Ban.png" width="30px" />
            </div>
            <div className="banPickNum" style={{ color: "red" }}>
              {ban[0]}
            </div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum" style={{ color: "blue" }}>
              {pick[0]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

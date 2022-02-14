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
              <img src="img/Ban.png" width="20px" />
            </div>
            <div className="banPickNum">{ban[2]}</div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
            <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum">{pick[2]}</div>
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
              <img src="img/Ban.png" width="20px" />
            </div>
            <div className="banPickNum">{ban[1]}</div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
            <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum">{pick[1]}</div>
          </div>
        </div>
      </div>
      <div className="championsChamp">
        <div className="championsChampPic">
          <img src={url[0]} height="120px" width="auto"></img>
        </div>
        <div className="championsChampInfo">
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Ban.png" width="20px" />
            </div>
            <div className="banPickNum">{ban[0]}</div>
          </div>
          <div className="championsChampBanPick">
            <div className="banPickImg">
              <img src="img/Pick.png" width="25px" />
            </div>
            <div className="banPickNum">{pick[0]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

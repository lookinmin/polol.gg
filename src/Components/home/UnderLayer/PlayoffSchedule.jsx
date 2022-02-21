import React from "react";
import "./PlayoffSchedule.css";

export const PlayoffSchedule = () => {
  return (
    <div className="playoffSchContainer">
      <div className="playoffSchWrapper">
        <div className="playoffSchTimeLine">APR. 06</div>
        <div className="playoffSchMatch">
          <div className="playoffSchTeam">
            <div><img src="img/0.png"/></div>
            <div>T1</div>
          </div>
          <div className="playoffSchVS">
            <div>3</div>
            <div>VS</div>
            <div>2</div>
          </div>
          <div className="playoffSchTeam">
            <div><img src="img/1.png"/></div>
            <div>DK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

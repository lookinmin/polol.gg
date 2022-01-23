import React from "react";
import "./CSS/TeamCard.css";
import { TeamRankCard } from "./TeamRankCard";

export const TeamCard = ({ sort, data }) => {
  console.log(data);
  return (
    <div className="TeamCard-container">
      <div className="TeamCard-teamBox">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">{sort}</div>
            <div className="flip-card-back">
              <img
                src="img/LCK_whitesmoke.PNG"
                style={{ width: "180px", height: "150px" }}
              />
            </div>
          </div>
        </div>
        <TeamRankCard data={data[0]} />
        <TeamRankCard data={data[1]} />
        <TeamRankCard data={data[2]} />
      </div>
      <div className="TeamCard-teamBox">
        <TeamRankCard data={data[3]} />
        <TeamRankCard data={data[4]} />
        <TeamRankCard data={data[5]} />
        <TeamRankCard data={data[6]} />
      </div>
      <div className="TeamCard-teamBox">
        <TeamRankCard data={data[7]} />
        <TeamRankCard data={data[8]} />
        <TeamRankCard data={data[9]} />
        <div class="flip-card">
          <img
            src="img/LCK_whitesmoke.PNG"
            style={{ width: "180px", height: "150px" }}
          />
        </div>
      </div>
    </div>
  );
};

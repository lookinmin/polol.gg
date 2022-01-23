import React from "react";
import "./CSS/TeamCard.css";

export const TeamRankCard = ({data}) => {
  console.log(data);
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src={data.teamImg} style={{ width: "150px", height: "150px" }} />
        </div>
        <div class="flip-card-back">
          <h4>{data.teamName}</h4>
          <div>승: {data.win}</div>
          <div>패: {data.lose}</div>
          <div>득실차: {data.diff}</div>
          <div>승률: {data.winRate}</div>
          <div>KDA: {data.kda}</div>
          <div>예측 순위: {data.preRank}</div>
          <div>예측 승률: {data.preWinRate}</div>
        </div>
      </div>
    </div>
  );
};

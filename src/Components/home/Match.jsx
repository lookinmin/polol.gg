import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { MatchSchedule } from "./MatchSchedule";

export const Match = ({ match, page }) => {
  if (match !== undefined) {
    if (match.length === 0) {
      return <div className="sheduleNoGame">해당 주는<br/> <br/>경기가 없습니다.</div>;
    } else {
      const matchData = match.map((n) => {
        const date = n.matchDate;
        if(page === 1){
          return <MatchSchedule match={n} key={date} />;
        }
        
      });
      return <div>{matchData}</div>;
    }
  } else {
    return <div className="sheduleNoGame">ERROR</div>;
  }

  
};

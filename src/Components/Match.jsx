import React, { useState, useEffect } from "react";
import "./CSS/Schedule.css";
import axios from "axios";
import { MatchSchedule } from "./MatchSchedule";

export const Match = ({ match }) => {
  if (match !== undefined) {
    if (match.length === 0) {
      return <div className="sheduleNoGame">해당 주는<br/> 경기가 없습니다</div>;
    } else {
      const matchData = match.map((n, m) => {
        const date = n.matchDate;
        return <MatchSchedule match={n} key={date} />;
      });
      return <div>{matchData}</div>;
    }
  } else {
    return <div className="sheduleNoGame">해당 주는<br/> 경기가 없습니다</div>;
  }
};

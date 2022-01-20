import React, { useState, useEffect } from "react";
import "./CSS/Schedule.css";
import axios from "axios";
import { MatchSchedule } from "./MatchSchedule";

export const Match = ({ match }) => {
  if (match !== undefined) {
    console.log(match.length);
    if (match.length === 0) {
      return <div>경기 일정이 없습니다</div>;
    } else {
      const matchData = match.map((n, m) => {
        const date = n.month + "-" + n.date;
        return <MatchSchedule match={n} key={date} />;
      });
      return <div>{matchData}</div>;
    }
  } else {
    return <div>경기 일정이 없습니다</div>;
  }
};

import React from "react";
import "./Schedule.css";
import { MatchSchedule } from "./MatchSchedule";
import { PlayoffSchedule } from "./PlayoffSchedule";

export const Match = ({ match, isPlayOff }) => {
  console.log(isPlayOff);
  if (match !== undefined) {
    if (match.length === 0) {
      return (
        <div className="sheduleNoGame">
          해당 주는
          <br /> <br />
          경기가 없습니다.
        </div>
      );
    } else {
      const matchData = match.map((n) => {
        const date = n.matchDate;
        if (isPlayOff === true) {
          return <PlayoffSchedule match={n} key={date} />;
        }
        return <MatchSchedule match={n} key={date} />;
      });
      return <div>{matchData}</div>;
    }
  } else {
    return <div className="sheduleNoGame">ERROR</div>;
  }
};

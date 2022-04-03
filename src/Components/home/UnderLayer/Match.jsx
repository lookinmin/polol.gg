import React from "react";
import "./Schedule.css";
import { MatchSchedule } from "./MatchSchedule";
import { PlayoffSchedule } from "./PlayoffSchedule";

export const Match = ({ match}) => {
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
      let cnt = 0;
      const matchData = match.map((n) => {
        if (n !== undefined) {
          if (n.Lteam2 === null) {
            cnt++;
            return <PlayoffSchedule match={n} key={cnt} />;
          }
          cnt++;
          return <MatchSchedule match={n} key={cnt} />;
        } else {
          cnt++;
          return;
        }
        
      });
      return <div>{matchData}</div>;
    }
  } else {
    return <div className="sheduleNoGame">ERROR</div>;
  }
};

import React from "react";
import "./CSS/Schedule.css";

export const MatchSchedule = ({ match }) => {
  return (
    <div>
        <div className="scheduleGameDiv">
          <div className="scheduleGame1">
            <div className="scheduleTime">{match.month+"-"+match.date} 17:00</div>
            <div className="scheduleMatch">
              <div className="scheduleTeam">
                <div className="scheuleTeamImg">
                  <img src="img/0.png" />
                </div>
                <div className="scheduleTeamName">{match.Lteam1}</div>
              </div>
              <div className="scheduleVS">VS</div>
              <div className="scheduleTeam">
                <div className="scheuleTeamImg">
                  <img src="img/0.png" />
                </div>
                <div className="scheduleTeamName">{match.Rteam1}</div>
              </div>
            </div>
          </div>
          <div className="scheduleGame2">
            <div className="scheduleTime">{match.month+"-"+match.date} 20:00</div>
            <div className="scheduleMatch">
              <div className="scheduleTeam">
                <div className="scheuleTeamImg">
                  <img src="img/0.png" />
                </div>
                <div className="scheduleTeamName">{match.Lteam2}</div>
              </div>
              <div className="scheduleVS">VS</div>
              <div className="scheduleTeam">
                <div className="scheuleTeamImg">
                  <img src="img/0.png" />
                </div>
                <div className="scheduleTeamName">{match.Rteam2}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

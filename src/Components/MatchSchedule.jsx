import React, { useState, useEffect } from "react";
import "./CSS/Schedule.css";

export const MatchSchedule = ({ match }) => {
  const [TeamImgL1, setTeamImgL1] = useState(0);
  const [TeamImgL2, setTeamImgL2] = useState(0);
  const [TeamImgR1, setTeamImgR1] = useState(0);
  const [TeamImgR2, setTeamImgR2] = useState(0);

  const MatchTeamImg = () => {
    switch (match.Lteam1) {
      case "BRO":
        setTeamImgL1(8);
        break;
      case "DK":
        setTeamImgL1(1);
        break;
      case "DRX":
        setTeamImgL1(9);
        break;
      case "GEN":
        setTeamImgL1(2);
        break;
      case "HLE":
        setTeamImgL1(7);
        break;
      case "KDF":
        setTeamImgL1(5);
        break;
      case "KT":
        setTeamImgL1(6);
        break;
      case "LSB":
        setTeamImgL1(4);
        break;
      case "NS":
        setTeamImgL1(3);
        break;
      case "T1":
        setTeamImgL1(0);
        break;
      default:
        break;
    }
    switch (match.Lteam2) {
      case "BRO":
        setTeamImgL2(8);
        break;
      case "DK":
        setTeamImgL2(1);
        break;
      case "DRX":
        setTeamImgL2(9);
        break;
      case "GEN":
        setTeamImgL2(2);
        break;
      case "HLE":
        setTeamImgL2(7);
        break;
      case "KDF":
        setTeamImgL2(5);
        break;
      case "KT":
        setTeamImgL2(6);
        break;
      case "LSB":
        setTeamImgL2(4);
        break;
      case "NS":
        setTeamImgL2(3);
        break;
      case "T1":
        setTeamImgL2(0);
        break;
      default:
        break;
    }
    switch (match.Rteam1) {
      case "BRO":
        setTeamImgR1(8);
        break;
      case "DK":
        setTeamImgR1(1);
        break;
      case "DRX":
        setTeamImgR1(9);
        break;
      case "GEN":
        setTeamImgR1(2);
        break;
      case "HLE":
        setTeamImgR1(7);
        break;
      case "KDF":
        setTeamImgR1(5);
        break;
      case "KT":
        setTeamImgR1(6);
        break;
      case "LSB":
        setTeamImgR1(4);
        break;
      case "NS":
        setTeamImgR1(3);
        break;
      case "T1":
        setTeamImgR1(0);
        break;
      default:
        break;
    }
    switch (match.Rteam2) {
      case "BRO":
        setTeamImgR2(8);
        break;
      case "DK":
        setTeamImgR2(1);
        break;
      case "DRX":
        setTeamImgR2(9);
        break;
      case "GEN":
        setTeamImgR2(2);
        break;
      case "HLE":
        setTeamImgR2(7);
        break;
      case "KDF":
        setTeamImgR2(5);
        break;
      case "KT":
        setTeamImgR2(6);
        break;
      case "LSB":
        setTeamImgR2(4);
        break;
      case "NS":
        setTeamImgR2(3);
        break;
      case "T1":
        setTeamImgR2(0);
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    MatchTeamImg();
  }, []);
  return (
    <div>
      <div className="scheduleGameDiv">
        <div className="scheduleGameInfo">
          <div className="scheduleTime">
            <div className="SheMatchDay">{match.matchDate}</div>
            <div className="SheTime">match 1</div>
          </div>
          <div className="scheduleGame1">
            <div className="scheduleTeam">
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={`img/${TeamImgL1}.png`} />
                </div>
                <div className="scheduleTeamName">{match.Lteam1}</div>
              </div>
              <div className="scheuleTeamScore">5</div>
            </div>
            <div className="scheduleVS">:</div>
            <div className="scheduleTeam">
              <div className="scheuleTeamScore">5</div>
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={`img/${TeamImgR1}.png`} />
                </div>
                <div className="scheduleTeamName">{match.Rteam1}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="CanMak"></div>

        <div className="scheduleGameInfo">
          <div className="scheduleTime">
            <div className="SheMatchDay">{match.matchDate}</div>
            <div className="SheTime">match 2</div>
          </div>
          <div className="scheduleGame1">
            <div className="scheduleTeam">
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={`img/${TeamImgL2}.png`} />
                </div>
                <div className="scheduleTeamName">{match.Lteam2}</div>
              </div>
              <div className="scheuleTeamScore">5</div>
            </div>
            <div className="scheduleVS">:</div>
            <div className="scheduleTeam">
              <div className="scheuleTeamScore">5</div>
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={`img/${TeamImgR2}.png`} />
                </div>
                <div className="scheduleTeamName">{match.Rteam2}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

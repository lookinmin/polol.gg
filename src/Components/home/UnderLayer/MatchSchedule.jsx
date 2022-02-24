import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./Schedule.css";

export const MatchSchedule = ({ match }) => {
  const matchWidth = useMediaQuery({ minWidth: 1100 });
  const actWidth = useMediaQuery({ maxWidth: 1099.99 });

  const [TeamPic, setTeamPic] = useState({
    L1: "",
    R1: "",
    L2: "",
    R2: "",
  });

  var teamArr = [match.Lteam1, match.Rteam1, match.Lteam2, match.Rteam2];
  var result = [];

  const setPicture = () => {
    for (let i = 0; i < 4; i++) {
      switch (teamArr[i]) {
        case "T1":
          result[i] = "img/0.PNG";
          break;
        case "DK":
          result[i] = "img/1.PNG";
          break;
        case "GEN":
          result[i] = "img/2.PNG";
          break;
        case "NS":
          result[i] = "img/3.PNG";
          break;
        case "LSB":
          result[i] = "img/4.PNG";
          break;
        case "KDF":
          result[i] = "img/5.PNG";
          break;
        case "KT":
          result[i] = "img/6.PNG";
          break;
        case "HLE":
          result[i] = "img/7.PNG";
          break;
        case "BRO":
          result[i] = "img/8.PNG";
          break;
        case "DRX":
          result[i] = "img/9.PNG";
          break;
        default:
          break;
      }
    }

    setTeamPic({
      L1: result[0],
      R1: result[1],
      L2: result[2],
      R2: result[3],
    });
  };

  useEffect(() => {
    setPicture();
  }, []);

  const basicMatchSchedule = (
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
                  <img src={TeamPic.L1} />{" "}
                </div>
                <div className="scheduleTeamName">{match.Lteam1}</div>
              </div>
              <div className="scheuleTeamScore">{match.score1L}</div>
            </div>
            <div className="scheduleVS">
              {match.score1R === null ? "VS" : ":"}
            </div>
            <div className="scheduleTeam">
              <div className="scheuleTeamScore">{match.score1R}</div>
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.R1} />
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
                  <img src={TeamPic.L2} />
                </div>
                <div className="scheduleTeamName">{match.Lteam2}</div>
              </div>
              <div className="scheuleTeamScore">{match.score2L}</div>
            </div>
            <div className="scheduleVS">
              {match.score2R === null ? "VS" : ":"}
            </div>
            <div className="scheduleTeam">
              <div className="scheuleTeamScore">{match.score2R}</div>
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.R2} />
                </div>
                <div className="scheduleTeamName">{match.Rteam2}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const actMatchSchedule = (
      <div className="scheduleGameDiv2">
        <div className="scheduleGameInfo2">
          <div className="scheduleTime2">
            <div className="SheMatchDay2">{match.matchDate}</div>
            <div className="SheTime2">match 1</div>
          </div>
          <div className="scheduleGame2">
            <div className="scheduleTeam">
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.L1} />{" "}
                </div>
                <div className="scheuleTeamScore2">{match.score1L}</div>
              </div>
              
            </div>
            <div className="scheduleVS">
              VS
            </div>
            <div className="scheduleTeam">
              
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.R1} />
                </div>
                <div className="scheuleTeamScore2">{match.score1R}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="CanMak2"></div>

        <div className="scheduleGameInfo2">
          <div className="scheduleTime2">
            <div className="SheMatchDay2">{match.matchDate}</div>
            <div className="SheTime2">match 2</div>
          </div>
          <div className="scheduleGame2">
            <div className="scheduleTeam">
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.L2} />
                </div>
                <div className="scheuleTeamScore2">{match.score2L}</div>
              </div>
              
            </div>
            <div className="scheduleVS">
              VS
            </div>
            <div className="scheduleTeam">
              
              <div className="scheTeamInfo">
                <div className="scheuleTeamImg">
                  <img src={TeamPic.R2} />
                </div>
                <div className="scheuleTeamScore2">{match.score2R}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <>
      {matchWidth && basicMatchSchedule}

      {actWidth && actMatchSchedule}
    </>
  );
};

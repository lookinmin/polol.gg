import React, {useState, useEffect} from "react";
import "./PlayoffSchedule.css";

export const PlayoffSchedule = ({ match }) => {
  const [TeamPic, setTeamPic] = useState({
    Lteam: "",
    Rteam: "",
  });

  var teamArr = [match.Lteam1, match.Rteam1];
  var result = [];

  const setPicture = () => {
    for (let i = 0; i < 2; i++) {
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
      Lteam: result[0],
      Rteam: result[1],
    });
  };

  useEffect(() => {
    setPicture();
  }, []);

  return (
    <div className="playoffSchContainer">
      <div className="playoffSchWrapper">
        <div className="playoffSchTimeLine">
          <div className="playoffSchTimeLineDate">{match.matchDate}</div>
          <div className="playoffSchTimeLineRound">{match.round}</div>
        </div>
        <div className="playoffSchMatch">
          <div className="playoffSchTeam">
            <div><img src={TeamPic.Lteam} /></div>
            <div>{match.Lteam1}</div>
          </div>
          <div className="playoffSchVS">
            <div>{match.score1L}</div>
            <div>{parseInt(match.score1L) >= 0 ? ":" : "VS"}</div>
            <div>{match.score1R}</div>
          </div>
          <div className="playoffSchTeam">
            <div><img src={TeamPic.Rteam}/></div>
            <div>{match.Rteam1}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

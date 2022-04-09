import React, { useEffect, useState } from "react";
import "./POTable.css";

export const POTable = ({ season, showTeamInfo, teamInfo }) => {
  const [team, setTeam] = useState([]);
  const [isData, setISData] = useState(false);

  const makeData = (items) => {
    let teamData = [];
    items.forEach((element) => {
      teamData.push({
        TeamName: element.TeamName,
        TeamPic: element.TeamPic,
      });
    });
    setTeam(teamData);
  };

  const makeTeamName = (e) => {
    var result;
    switch (e) {
      case "T1":
        result = "T1";
        break;
      case "DWG KIA":
        result = "DK";
        break;
      case "GEN.G Esports":
        result = "GEN";
        break;
      case "NongShim RED FORCE":
        result = "NS";
        break;
      case "Liiv SANDBOX":
        result = "LSB";
        break;
      case "Kwangdong Freecs":
        result = "KDF";
        break;
      case "KT Rolster":
        result = "KT";
        break;
      case "Hanwha Life Esports":
        result = "HLE";
        break;
      case "Fredit BRION":
        result = "BRO";
        break;
      case "DRX":
        result = "DRX";
        break;
      default:
        break;
    }
    return result;
  };

  const teamClick = (e) => {
    showTeamInfo(makeTeamName(e.target.id));
  };

  useEffect(() => {
    if (season !== undefined && teamInfo.length > 0) {
      setISData(true);
      makeData(teamInfo);
    }else{
      setISData(false);
    }
    showTeamInfo('null');
  }, [teamInfo, isData]);

  return (
    <>
      {isData ? (
        <div className="teamContainer">
          <div className="teamDiv">
            <div className="teamWrapper" onClick={teamClick} id={team[0].TeamName}>
              <img
                src={team[0].TeamPic}
                width={'150px'}
                height="auto"
                id={team[0].TeamName}
              />
            </div>
            <div className="teamWrapper" onClick={teamClick} id={team[1].TeamName}>
              <img
                src={team[1].TeamPic}
                width={'150px'}
                height="auto"
                id={team[1].TeamName}
              />
            </div>
            <div className="teamWrapper" onClick={teamClick} id={team[2].TeamName}>
              <img
                src={team[2].TeamPic}
                width={'150px'}
                height="auto"
                id={team[2].TeamName}
              />
            </div>
          </div>
          <div className="teamDiv">
            <div className="teamWrapper" onClick={teamClick} id={team[3].TeamName}>
              <img
                src={team[3].TeamPic}
                width={'150px'}
                height="auto"
                id={team[3].TeamName}
              />
            </div>
            <div className="teamWrapper" onClick={teamClick} id={team[4].TeamName}>
              <img
                src={team[4].TeamPic}
                width={'150px'}
                height="auto"
                id={team[4].TeamName}
              />
            </div>
            <div className="teamWrapper" onClick={teamClick} id={team[5].TeamName}>
              <img
                src={team[5].TeamPic}
                width={'150px'}
                height="auto"
                id={team[5].TeamName}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>asdfadsf</div>
      )}
    </>
  );
};
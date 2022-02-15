import React from "react";
import { Table } from "react-bootstrap";
import "./Champions.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export const TeamRank = () => {
  const [teamRank, setTeamRank] = useState([]);

  const matchWidth = useMediaQuery({ minWidth: 1400 });
  const actWidth = useMediaQuery({ maxWidth: 1399.99 });

  const makeData = (data) => {
    let teamRank = [];
    data.forEach((element) => {
      switch (element.TeamName) {
        case "T1":
          teamRank.push({
            data: element,
            teamName: 'T1',
            url: 'img/0.png'
          })
          break;
        case "GEN":
          teamRank.push({
            data: element,
            teamName: 'GEN.G Esports',
            url: 'img/2.png'
          })
          break;
        case "DK":
          teamRank.push({
            data: element,
            teamName: 'DWG KIA',
            url: 'img/1.png'
          })
          break;
        case "DRX":
          teamRank.push({
            data: element,
            teamName: 'DRX',
            url: 'img/9.png'
          })
          break;
        case "KT":
          teamRank.push({
            data: element,
            teamName: 'KT Rolster',
            url: 'img/6.png'
          })
          break;
        case "NS":
          teamRank.push({
            data: element,
            teamName: 'NongShim RED FORCE',
            url: 'img/3.png'
          })
          break;
        case "BRO":
          teamRank.push({
            data: element,
            teamName: 'Fredit BRION',
            url: 'img/8.png'
          })
          break;
        case "HLE":
          teamRank.push({
            data: element,
            teamName: 'Hanwha Life Esports',
            url: 'img/7.png'
          })
          break;
        case "LSB":
          teamRank.push({
            data: element,
            teamName: 'Liiv SANDBOX',
            url: 'img/4.png'
          })
          break;
        case "KDF":
          teamRank.push({
            data: element,
            teamName: 'Kwangdong Freecs',
            url: 'img/5.png'
          })
          break;
        default:
          break;
      }
    });
    setTeamRank(teamRank);
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.Rank);
    };

    callApi();
  }, []);

  const renderTeamRank = teamRank.map((team) => {
    return (
      <tr key={team.teamName}>
        <td className="rOrder">
          <h2 id="tRanked">{team.data.rank}</h2>
        </td>
        <td className="tName"><img src={team.url} id="rankTeamImg" width="auto" height="33px"/>{team.teamName}</td>
      </tr>
    );
  });

  const renderRank = (
    <div className="finalRank">
      <h2 id="finalResult">LCK 2022 Spring 팀 순위</h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody>{renderTeamRank}</tbody>
      </Table>
    </div>
  )

  
  const renderRank2 = (
    <div className="finalRank2">
      <h2 id="finalResult">LCK 2022 Spring 팀 순위</h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody>{renderTeamRank}</tbody>
      </Table>
    </div>
  )


  return (
    <>
      {matchWidth && renderRank}
      {actWidth && renderRank2}
    </>
    
    
  );
};

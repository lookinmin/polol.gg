import React from "react";
import { Table } from "react-bootstrap";
import "./TeamRank.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NowSeason } from "./NowSeason";

export const TeamRank = () => {
  const [teamRank, setTeamRank] = useState([]);

  const matchWidth = useMediaQuery({ minWidth: 1400 });
  const actWidth = useMediaQuery({ maxWidth: 1399.99, minWidth: 900.01 });
  const limitWidth = useMediaQuery({ maxWidth: 900.00 });

  const makeData = (data) => {
    let teamRank = [];
    data.forEach((element) => {
      switch (element.TeamName) {
        case "T1":
          teamRank.push({
            data: element,
            teamName: 'T1',
            STN : element.TeamName,
            url: 'img/0.png'
          })
          break;
        case "GEN":
          teamRank.push({
            data: element,
            teamName: 'GEN.G Esports',
            STN : element.TeamName,
            url: 'img/2.png'
          })
          break;
        case "DK":
          teamRank.push({
            data: element,
            teamName: 'DWG KIA',
            STN : element.TeamName,
            url: 'img/1.png'
          })
          break;
        case "DRX":
          teamRank.push({
            data: element,
            teamName: 'DRX',
            STN : element.TeamName,
            url: 'img/9.png'
          })
          break;
        case "KT":
          teamRank.push({
            data: element,
            teamName: 'KT Rolster',
            STN : element.TeamName,
            url: 'img/6.png'
          })
          break;
        case "NS":
          teamRank.push({
            data: element,
            teamName: 'NongShim RED FORCE',
            STN : element.TeamName,
            url: 'img/3.png'
          })
          break;
        case "BRO":
          teamRank.push({
            data: element,
            teamName: 'Fredit BRION',
            STN : element.TeamName,
            url: 'img/8.png'
          })
          break;
        case "HLE":
          teamRank.push({
            data: element,
            teamName: 'Hanwha Life Esports',
            STN : element.TeamName,
            url: 'img/7.png'
          })
          break;
        case "LSB":
          teamRank.push({
            data: element,
            teamName: 'Liiv SANDBOX',
            STN : element.TeamName,
            url: 'img/4.png'
          })
          break;
        case "KDF":
          teamRank.push({
            data: element,
            teamName: 'Kwangdong Freecs',
            STN : element.TeamName,
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
          <h2 id="tRanked">{team.data.Rank}</h2>
        </td>
        <td className="tName"><img src={team.url} id="rankTeamImg" width="auto" height="33px"/>{team.teamName}</td>
      </tr>
    );
  });

  const renderTeamRank2 = teamRank.map((team) => {
    return (
      <tr key={team.teamName}>
        <td className="rOrder">
          <h2 id="tRanked">{team.data.Rank}</h2>
        </td>
        <td className="tName2"><img src={team.url} id="rankTeamImg" width="auto" height="33px"/>{team.STN}</td>
      </tr>
    );
  });

  const renderRank = (
    <div className="finalRank">
      <h2 id="finalResult"><NowSeason/></h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody>{renderTeamRank}</tbody>
      </Table>

      <div className="goMore">
        <a href="/table" id="btnMore" title="팀 순위 페이지 이동">
          <h2 id="txtMore">More Information</h2>
          <img src="img/more.png" width="40px" height="auto"/>
        </a>
      </div>
    </div>
  )

  
  const renderRank2 = (
    <div className="finalRank2">
      <h2 id="finalResult"><NowSeason/></h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody>{renderTeamRank}</tbody>
      </Table>

      <div className="goMore">
        <a href="/table" id="btnMore" title="팀 순위 페이지 이동" >
          <h2 id="txtMore">More Information</h2>
          <img src="img/more.png" width="40px" height="auto" />
        </a>
      </div>
    </div>
  )

    
  const renderRank3 = (
    <div className="finalRank2">
      <h2 id="finalResult2"><NowSeason/></h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody>{renderTeamRank2}</tbody>
      </Table>

      <div className="goMore">
        <a href="/table" id="btnMore" title="팀 순위 페이지 이동" >
          <h2 id="txtMore">More Information</h2>
          <img src="img/more.png" width="40px" height="auto" />
        </a>
      </div>
    </div>
  )


  return (
    <>
      {matchWidth && renderRank}
      {actWidth && renderRank2}
      {limitWidth && renderRank3}
    </>
  );
};

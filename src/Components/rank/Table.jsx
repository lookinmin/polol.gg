import React, { useEffect, useState } from "react";
import "./Table.css";
import { CircleTable } from "./CircleTable";
import { Seasons } from "./Seasons";
import axios from "axios";

export const Table = () => {
  const [season, setSeason] = useState("2022 LCK 스프링");
  const [state, setState] = useState(false);
  const [sort, setSort] = useState("순위");
  const [teamInfo, setTeamInfo] = useState({});
  const [players, setPlayers] = useState([
    {
      Name: "name",
      pic: "",
      pos: "",
    },
  ]);
  const [teams, setTeams] = useState([]);
  const [backimg, setbackimg] = useState("T1");

  const [T1, setT1] = useState([]);
  const [DK, setDK] = useState([]);
  const [GEN, setGEN] = useState([]);
  const [NS, setNS] = useState([]);
  const [LSB, setLSB] = useState([]);
  const [KDF, setKDF] = useState([]);
  const [KT, setKT] = useState([]);
  const [HLE, setHLE] = useState([]);
  const [BRO, setBRO] = useState([]);
  const [DRX, setDRX] = useState([]);

  var playerPic = [];
  var T1s = [];
  var DKs = [];
  var GENs = [];
  var NSs = [];
  var LSBs = [];
  var KDFs = [];
  var KTs = [];
  var HLEs = [];
  var BROs = [];
  var DRXs = [];

  const SwingEffect = () => {
    document.querySelector(".Screen_3").classList.toggle("swing2");
    document.querySelector(".Screen_2").classList.toggle("swing2");
    document.querySelector(".Screen_4").classList.toggle("swing2");
    document.querySelector(".Screen_1").classList.toggle("swing2");
  };

  const showTeamInfo = (data) => {
    SwingEffect();

    setTeamInfo(data.team);
    setPlayers(data.players);
  };

  const ShowTeamInfo = (e) => {
    setbackimg(e);
    switch (e) {
      case "T1":
        showTeamInfo(T1);
        break;
      case "DK":
        showTeamInfo(DK);
        break;
      case "GEN":
        showTeamInfo(GEN);
        break;
      case "NS":
        showTeamInfo(NS);
        break;
      case "LSB":
        showTeamInfo(LSB);
        break;
      case "KDF":
        showTeamInfo(KDF);
        break;
      case "KT":
        showTeamInfo(KT);
        break;
      case "HLE":
        showTeamInfo(HLE);
        break;
      case "BRO":
        showTeamInfo(BRO);
        break;
      case "DRX":
        showTeamInfo(DRX);
        break;
      default:
        console.log("팀이름없음");
        break;
    }
  };

  var final = [];

  const makeTeamName = (e) => {
    var sult;
    switch (e) {
      case "T1":
        sult = "T1";
        break;
      case "DK":
        sult = "DWG KIA";
        break;
      case "GEN":
        sult = "GEN.G Esports";
        break;
      case "NS":
        sult = "NongShim RED FORCE";
        break;
      case "LSB":
        sult = "Liiv SANDBOX";
        break;
      case "KDF":
        sult = "Kwangdong Freecs";
        break;
      case "KT":
        sult = "KT Rolster";
        break;
      case "HLE":
        sult = "Hanwha Life Esports";
        break;
      case "BRO":
        sult = "Fredit BRION";
        break;
      case "DRX":
        sult = "DRX";
        break;
      default:
        break;
    }
    return sult;
  };

  const setPicture = (e) => {
    var result;
    switch (e) {
      case "T1":
        result = "img/0.PNG";
        break;
      case "DK":
        result = "img/1.PNG";
        break;
      case "GEN":
        result = "img/2.PNG";
        break;
      case "NS":
        result = "img/3.PNG";
        break;
      case "LSB":
        result = "img/4.PNG";
        break;
      case "KDF":
        result = "img/5.PNG";
        break;
      case "KT":
        result = "img/6.PNG";
        break;
      case "HLE":
        result = "img/7.PNG";
        break;
      case "BRO":
        result = "img/8.PNG";
        break;
      case "DRX":
        result = "img/9.PNG";
        break;
      default:
        break;
    }
    return result;
  };

  const positionPic = (e) => {
    var result;
    switch (e) {
      case "TOP":
        result = "img/positions/TOP.png";
        break;
      case "JG":
        result = "img/positions/JGL.png";
        break;
      case "MID":
        result = "img/positions/MID.png";
        break;
      case "ADC":
        result = "img/positions/AD.png";
        break;
      case "SPT":
        result = "img/positions/SPT.png";
        break;
      default:
        break;
    }
    return result;
  };

  const classify = (players) => {
    for (let i = 0; i < 62; i++) {
      playerPic[i] = "img/" + players[i].team + "/" + players[i].Name + ".png";
      switch (players[i].team) {
        case "T1":
          T1s.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "DK":
          DKs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "GEN":
          GENs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "NS":
          NSs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "LSB":
          LSBs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "KDF":
          KDFs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "KT":
          KTs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "HLE":
          HLEs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "BRO":
          BROs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        case "DRX":
          DRXs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].position),
            pic: playerPic[i],
          });
          break;
        default:
          break;
      }
    }
  };

  const SetDifference = (e) => {
    if (e > 0) {
      return "+" + e;
    }
    return e;
  };

  const makeData = (items, players) => {
    classify(players);
    for (let i = 0; i < 10; i++) {
      final[i] = {
        TeamName: makeTeamName(items[i].TeamName),
        TeamPic: setPicture(items[i].TeamName),
        win: items[i].win,
        lose: items[i].lose,
        difference: SetDifference(items[i].difference),
        KDA: items[i].KDA,
        kill: items[i].kill,
        death: items[i].death,
        assist: items[i].assist,
        rate: items[i].rate,
        preRate: items[i].predictrate,
        rank: items[i].rank,
      };
    }

    setTeams(final);

    for (let i = 0; i < 10; i++) {
      switch (items[i].TeamName) {
        case "T1":
          setT1({
            team: final[i],
            players: T1s,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(T1s);
          }
          break;
        case "DK":
          setDK({
            team: final[i],
            players: DKs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(DKs);
          }
          break;
        case "GEN":
          setGEN({
            team: final[i],
            players: GENs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(GENs);
          }
          break;
        case "NS":
          setNS({
            team: final[i],
            players: NSs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(NSs);
          }
          break;
        case "LSB":
          setLSB({
            team: final[i],
            players: LSBs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(LSBs);
          }
          break;
        case "KDF":
          setKDF({
            team: final[i],
            players: KDFs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(KDFs);
          }
          break;
        case "KT":
          setKT({
            team: final[i],
            players: KTs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(KTs);
          }
          break;
        case "HLE":
          setHLE({
            team: final[i],
            players: HLEs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(HLEs);
          }
          break;
        case "BRO":
          setBRO({
            team: final[i],
            players: BROs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(BROs);
          }
          break;
        case "DRX":
          setDRX({
            team: final[i],
            players: DRXs,
          });
          if (items[i].rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(DRXs);
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/table");
      switch (season) {
        case "2022 LCK 서머":
          // makeData(res.data.Team, res.data.Player);
          console.log("no data");
          break;
        case "2022 LCK 스프링":
          makeData(res.data.Team, res.data.Player);
          break;
        default:
          break;
      }
    };
    callApi(season);
  }, [season, sort]);

  const nowSeason = (season) => {
    setSeason(season);
  };

  const Sorting = (e) => {
    setSort(e.target.innerHTML);
    document.querySelector(".sortWrapper").style.display = "none";
  };

  const sortHeader = () => {
    if (state === false) {
      document.querySelector(".sortWrapper").style.display = "block";
      for (let i = 1; i <= 8; i++) {
        document.querySelector(`.sortDiv:nth-child(${i})`).style.visibility =
          "visible";
      }
    } else {
      document.querySelector(".sortWrapper").style.display = "none";
      for (let i = 1; i <= 8; i++) {
        document.querySelector(`.sortDiv:nth-child(${i})`).style.visibility =
          "hidden";
      }
    }
    setState(!state);
  };

  const setPosition = () => {
    let top = [];
    let jgl = [];
    let spt = [];
    let adc = [];
    let mid = [];
    players.forEach((num) => {
      switch (num.pos) {
        case "img/positions/AD.png":
          adc.push(num);
          break;
        case "img/positions/SPT.png":
          spt.push(num);
          break;
        case "img/positions/MID.png":
          mid.push(num);
          break;
        case "img/positions/TOP.png":
          top.push(num);
          break;
        case "img/positions/JGL.png":
          jgl.push(num);
          break;
        default:
          break;
      }
    });
    return top.concat(jgl, mid, adc, spt);
  };

  const renderMem = setPosition().map((num) => {
    return (
      <div className="S_PlayerInfo" key={num.Name}>
        <img src={num.pic} id="S_4_pic" width="auto" height="70px" />
        <div className="S_4_under">
          <div className="S_POS">
            <img src={num.pos} id="S_4_pos" width="auto" height="20px" />
          </div>
          <h2 className="S_name">{num.Name}</h2>
        </div>
      </div>
    );
  });

  return (
    <div className="T_BG">
      <div className="season">
        <Seasons nowSeason={nowSeason} />
      </div>
      <div className={"T_Screen " + backimg}>
        <div className="Screen_1 swing">
          <div className="S_1_left">
            <img
              src={teamInfo.TeamPic}
              width="auto"
              height="100px"
              id="T_teamPic"
            />
            <h2 className="T_teamName">{teamInfo.TeamName}</h2>
          </div>
          <div className="S_1_right">
            <h2 className="S_Rank">정규시즌 {teamInfo.rank}위</h2>
          </div>
        </div>

        <div className="Screen_2 swing">
            <h2 className="S_Txt" id="S_win">
              {teamInfo.win}승
            </h2>
            <h2 className="S_Txt" id="S_lose">
              {teamInfo.lose}패
            </h2>
            <h2 className="S_Txt" id="S_diff">
              {teamInfo.difference}
            </h2>
            <h2 className="S_Txt" id="S_rate">
              승률 : {teamInfo.rate}
            </h2>
        </div>

        <div className="Screen_3 swing">
            <h2 className="S_Txt2" id="S_KDA">
              KDA : {teamInfo.KDA}
            </h2>
            <h2 className="S_Txt2" id="S_kill">
              {teamInfo.kill} Kill
            </h2>
            <h2 className="S_Txt2" id="S_death">
              {teamInfo.death} Death
            </h2>
            <h2 className="S_Txt2" id="S_assist">
              {teamInfo.assist} Assist
            </h2>
        </div>

        <div className="Screen_4 swing">{renderMem}</div>
      </div>

      <div className="T_Circle">
        <div></div>
        <div className="circleTable2">
          <div>
            {
              <CircleTable
                season={season}
                showTeamInfo={ShowTeamInfo}
                teamInfo={teams}
                sorting={sort}
              />
            }
          </div>
          <div className="chartSort">
            <div className="sortHeader" onClick={sortHeader}>
              {sort}
            </div>
            <div className="sortContainer">
              <div className="sortWrapper">
                <div className="sortDiv" onClick={Sorting}>
                  순위
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  승
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  패
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  KDA
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  Kill
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  Death
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  assist
                </div>
                <div className="sortDiv" onClick={Sorting}>
                  승률
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="underForPredict tablePredict">
        <h2 id="underPolo">KILL.GG</h2>
        <div className="exp">
          <div className="space"></div>
          <div className="space1">
            <p id="explanation1">LCK Match History는</p>
            <p id="explanation2">KILL.GG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

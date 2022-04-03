import React, { useEffect, useState } from "react";
import "./Table.css";
import { CircleTable } from "./CircleTable";
import { Seasons } from "./Seasons";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { POTable } from "./POTable";

export const Table = () => {
  const matchWidth = useMediaQuery({ minWidth: 1261 });
  const actWidth = useMediaQuery({ maxWidth: 1260.99, minWidth: 1000 });
  const limitWidth = useMediaQuery({ maxWidth: 999.99 });

  const [season, setSeason] = useState();
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
  const [backimg, setbackimg] = useState("");

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

  const [isData, setIsData] = useState(true);

  const SwingEffect = () => {
    if (window.innerWidth >= 1261) {
      document.querySelector(".Screen_3").classList.toggle("swing2");
      document.querySelector(".Screen_2").classList.toggle("swing2");
      document.querySelector(".Screen_4").classList.toggle("swing2");
      document.querySelector(".Screen_1").classList.toggle("swing2");
    } else if (1260.99 >= window.innerWidth >= 1000) {
      document.querySelector(".Screen_3_2").classList.toggle("swing2");
      document.querySelector(".Screen_2_2").classList.toggle("swing2");
      document.querySelector(".Screen_4_2").classList.toggle("swing2");
      document.querySelector(".Screen_1_2").classList.toggle("swing2");
    } else if (1000 > window.innerWidth) {
      document.querySelector(".Screen_4_2").classList.toggle("swing2");
      document.querySelector(".Screen_1_2").classList.toggle("swing2");
      document.querySelector(".Screen_2_2_li").classList.toggle("swing2");
      document.querySelector(".Screen_3_li").classList.toggle("swing2");
    }
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

  const makeTeamName = (e) => {
    var result;
    switch (e) {
      case "T1":
        result = "T1";
        break;
      case "DK":
        result = "DWG KIA";
        break;
      case "GEN":
        result = "GEN.G Esports";
        break;
      case "NS":
        result = "NongShim RED FORCE";
        break;
      case "LSB":
        result = "Liiv SANDBOX";
        break;
      case "KDF":
        result = "Kwangdong Freecs";
        break;
      case "KT":
        result = "KT Rolster";
        break;
      case "HLE":
        result = "Hanwha Life Esports";
        break;
      case "BRO":
        result = "Fredit BRION";
        break;
      case "DRX":
        result = "DRX";
        break;
      default:
        break;
    }
    return result;
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
    for (let i = 0; i < players.length; i++) {
      playerPic[i] = players[i].Pic;

      switch (players[i].Team) {
        case "T1":
          T1s.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "DK":
          DKs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "GEN":
          GENs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "NS":
          NSs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "LSB":
          LSBs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "KDF":
          KDFs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "KT":
          KTs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "HLE":
          HLEs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "BRO":
          BROs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
            pic: playerPic[i],
          });
          break;
        case "DRX":
          DRXs.push({
            Name: players[i].Name,
            pos: positionPic(players[i].Position),
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
    let final = [];
    classify(players);
    for (let i = 0; i < 10; i++) {
      final[i] = {
        TeamName: makeTeamName(items[i].TeamName),
        TeamPic: setPicture(items[i].TeamName),
        win: items[i].Win,
        lose: items[i].Lose,
        difference: SetDifference(items[i].Difference),
        KDA: items[i].KDA,
        kill: items[i].Kill,
        death: items[i].Death,
        assist: items[i].Assist,
        rate: items[i].Rate,
        rank: items[i].Rank,
        STN: items[i].TeamName,
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
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(T1s);
            setbackimg("T1");
          }
          break;
        case "DK":
          setDK({
            team: final[i],
            players: DKs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(DKs);
            setbackimg("DK");
          }
          break;
        case "GEN":
          setGEN({
            team: final[i],
            players: GENs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(GENs);
            setbackimg("GEN");
          }
          break;
        case "NS":
          setNS({
            team: final[i],
            players: NSs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(NSs);
            setbackimg("NS");
          }
          break;
        case "LSB":
          setLSB({
            team: final[i],
            players: LSBs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(LSBs);
            setbackimg("LSB");
          }
          break;
        case "KDF":
          setKDF({
            team: final[i],
            players: KDFs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(KDFs);
            setbackimg("KDF");
          }
          break;
        case "KT":
          setKT({
            team: final[i],
            players: KTs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(KTs);
            setbackimg("KT");
          }
          break;
        case "HLE":
          setHLE({
            team: final[i],
            players: HLEs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(HLEs);
            setbackimg("HLE");
          }
          break;
        case "BRO":
          setBRO({
            team: final[i],
            players: BROs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(BROs);
            setbackimg("BRO");
          }
          break;
        case "DRX":
          setDRX({
            team: final[i],
            players: DRXs,
          });
          if (items[i].Rank === 1) {
            setTeamInfo(final[i]);
            setPlayers(DRXs);
            setbackimg("DRX");
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    async function postData() {
      console.log(season);
      try {
        await axios
          .post("http://localhost:3002/table", {
            url: season,
          })
          .then((res) => {
            makeData(res.data.Team, res.data.Player);
            if(season.length > 15){
              setIsData(true); //PO일 때
            }else{
              setIsData(false)//정규
            }

          });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
  }, [season, sort]);

  const nowSeason = (season) => {
    setSeason(season);
  };

  const Sorting = (e) => {
    setSort(e.target.innerHTML);
    document.querySelector(".sortWrapper").style.display = "none";
    setState(!state);
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

  const renderMem2 = setPosition().map((num) => {
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

  const basicTScreen = (
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
  );

  const actTScreen = (
    <div className={"T_Screen " + backimg}>
      <div className="Screen_1_2 swing">
        <div className="S_1_left2">
          <img
            src={teamInfo.TeamPic}
            width="auto"
            height="80px"
            id="T_teamPic"
          />
          <h2 className="T_teamName">{teamInfo.TeamName}</h2>
        </div>
        <div className="S_1_right2">
          <h2 className="S_Rank">정규시즌 {teamInfo.rank}위</h2>
        </div>
      </div>

      <div className="Screen_2_2 swing">
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

      <div className="Screen_3_2 swing">
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

      <div className="Screen_4_2 swing">{renderMem2}</div>
    </div>
  );

  const limitTScreen = (
    <div className={"T_Screen " + backimg}>
      <div className="Screen_1_2 swing">
        <div className="S_1_left2">
          <img
            src={teamInfo.TeamPic}
            width="auto"
            height="80px"
            id="T_teamPic"
          />
          <h2 className="T_teamName">{teamInfo.STN}</h2>
        </div>
        <div className="S_1_right2">
          <h2 className="S_Rank">정규시즌 {teamInfo.rank}위</h2>
        </div>
      </div>

      <div className="Screen_2_2_li swing">
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

      <div className="Screen_3_li swing">
        <h2 className="S_Txt2" id="S_KDA">
          KDA : {teamInfo.KDA}
        </h2>
        <div className="S_li_down">
          <h2 className="S_Txt2" id="S_kill">
            {teamInfo.kill} K
          </h2>
          <h2 className="S_Txt2" id="S_death">
            {teamInfo.death} D
          </h2>
          <h2 className="S_Txt2" id="S_assist">
            {teamInfo.assist} A
          </h2>
        </div>
      </div>

      <div className="Screen_4_2 swing">{renderMem2}</div>
    </div>
  );

  return (
    <>
      {isData === true ? (
        <div className="T_BG">
          <div className="season">
            <Seasons nowSeason={nowSeason} />
          </div>

          {matchWidth && basicTScreen}

          {actWidth && actTScreen}

          {limitWidth && limitTScreen}

          <div className="T_Circle">
            <div></div>
            <div className="circleTable2">
              <div>
                <CircleTable
                  season={season}
                  showTeamInfo={ShowTeamInfo}
                  teamInfo={teams}
                  sorting={sort}
                />
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
                      Assist
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
      ) : (
        <div style={{ marginTop: "85px" }}>
          <div className="season">
            <Seasons nowSeason={nowSeason} />
          </div>
          {matchWidth && basicTScreen}

          {actWidth && actTScreen}

          {limitWidth && limitTScreen}

          <POTable
            season={season}
            showTeamInfo={ShowTeamInfo}
            teamInfo={teams}
          />

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
      )}
    </>
  );
};

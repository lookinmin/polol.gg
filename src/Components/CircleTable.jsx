import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

export const CircleTable = ({ season, showTeamInfo, sorting }) => {

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


  const [data, setData] = useState([
    {
      id: "T1",
      label: "T1",
      value: 401,
    },
    {
      id: "T2",
      label: "T2",
      value: 543,
    },
    {
      id: "T3",
      label: "T3",
      value: 437,
    },
    {
      id: "T4",
      label: "T4",
      value: 153,
    },
    {
      id: "T5",
      label: "T5",
      value: 243,
    },
    {
      id: "T6",
      label: "T6",
      value: 500,
    },
  ]);

  const ShowTeamInfo = (e) => {
    switch (e.data.id) {
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
        sult = "NongShim RED Force";
        break;
      case "LSB":
        sult = "Liiv SANDBOX";
        break;
      case "KDF":
        sult = "KwangDong Freecs";
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
    var reesult;
    switch (e) {
      case "T1":
        reesult = "img/0.PNG";
        break;
      case "DK":
        reesult = "img/1.PNG";
        break;
      case "GEN":
        reesult = "img/2.PNG";
        break;
      case "NS":
        reesult = "img/3.PNG";
        break;
      case "LSB":
        reesult = "img/4.PNG";
        break;
      case "KDF":
        reesult = "img/5.PNG";
        break;
      case "KT":
        reesult = "img/6.PNG";
        break;
      case "HLE":
        reesult = "img/7.PNG";
        break;
      case "BRO":
        reesult = "img/8.PNG";
        break;
      case "DRX":
        reesult = "img/9.PNG";
        break;
      default:
        break;
    }
    return reesult;
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

  const makeData = (items, players) => {
    classify(players);
    var value = [];
    for (let i = 0; i < 10; i++) {
      final[i] = {
        TeamName: makeTeamName(items[i].TeamName),
        TeamPic: setPicture(items[i].TeamName),
        win: items[i].win,
        lose: items[i].lose,
        difference: items[i].difference,
        KDA: items[i].KDA,
        kill: items[i].kill,
        death: items[i].death,
        assist: items[i].assist,
        rate: items[i].rate,
        preRate: items[i].predictrate,
        rank: items[i].rank,
      };
      switch (sorting) {
        case "승":
          value.push(items[i].win);
          break;
        case "패":
          value.push(items[i].lose);
          break;
        case "득실차":
          value.push(items[i].difference);
          break;
        case "KDA":
          value.push(items[i].KDA);
          break;
        case "킬":
          value.push(items[i].kill);
          break;
        case "데스":
          value.push(items[i].death);
          break;
        case "어시스트":
          value.push(items[i].assist);
          break;
        case "예상 승률":
          value.push(items[i].predictrate);
          break;
        default:
          value.push(items[i].win);
          break;
      }
    }

    for (let i = 0; i < 10; i++) {
      switch (items[i].TeamName) {
        case "T1":
          setT1({
            team: final[i],
            players: T1s
          });
          break;
        case "DK":
          setDK({
            team: final[i],
            players: DKs
          });
          break;
        case "GEN":
          setGEN({
            team: final[i],
            players: GENs
          });
          break;
        case "NS":
          setNS({
            team: final[i],
            players: NSs
          });
          break;
        case "LSB":
          setLSB({
            team: final[i],
            players: LSBs
          });
          break;
        case "KDF":
          setKDF({
            team: final[i],
            players: KDFs
          });
          break;
        case "KT":
          setKT({
            team: final[i],
            players: KTs
          });
          break;
        case "HLE":
          setHLE({
            team: final[i],
            players: HLEs
          });
          break;
        case "BRO":
          setBRO({
            team: final[i],
            players: BROs
          });
          break;
        case "DRX":
          setDRX({
            team: final[i],
            players: DRXs
          });
          break;
        default:
          break;
      }
    }

    setData([
      {
        id: String(items[0].TeamName),
        label: final[0].TeamName,
        team: final[0],
        value: value[0],
      },
      {
        id: String(items[1].TeamName),
        label: final[1].TeamName,
        team: final[1],
        value: value[1],
      },
      {
        id: String(items[2].TeamName),
        label: final[2].TeamName,
        team: final[2],
        value: value[2],
      },
      {
        id: String(items[3].TeamName),
        label: final[3].TeamName,
        team: final[3],
        value: value[3],
      },
      {
        id: String(items[4].TeamName),
        label: final[4].TeamName,
        team: final[4],
        value: value[4],
      },
      {
        id: String(items[5].TeamName),
        label: final[5].TeamName,
        team: final[5],
        value: value[5],
      },
      {
        id: String(items[6].TeamName),
        label: final[6].TeamName,
        team: final[6],
        value: value[6],
      },
      {
        id: String(items[7].TeamName),
        label: final[7].TeamName,
        team: final[7],
        value: value[7],
      },
      {
        id: String(items[8].TeamName),
        label: final[8].TeamName,
        team: final[8],
        value: value[8],
      },
      {
        id: String(items[9].TeamName),
        label: final[9].TeamName,
        team: final[9],
        value: value[9],
      },
    ]);
  };

  useEffect(() => {
    const callApi = async (season) => {
      const res = await axios.get("http://localhost:3002/table");
      switch (season) {
        case "2022 LCK 서머":
          // makeData(res.data.Team, res.data.Player);
          console.log("no data");
          break;
        case "2022 LCK 스프링":
          makeData(res.data.Team, res.data.Player);
          break;
        case "2021 LCK 서머":
          makeData(res.data.Spring2021, res.data.Player);
          break;
        case "2021 LCK 스프링":
          makeData(res.data.Summer2021, res.data.Player);
          break;
        default:
          break;
      }
    };
    callApi(season);
  }, [season, sorting]);

  return (
    <>
      <div
        className="pieChart"
        style={{ width: "80%", height: "700px", margin: "0 auto" }}
      >
        <ResponsivePie
          theme={{
            fontSize: "1rem",
            fontFamily: "LCK",
          }}
          data={data}
          onClick={ShowTeamInfo}
          animate={true}
          motionConfig={"molasses"}
          transitionMode="startAngle"
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.3}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "lebels.text.fill",
            modifiers: [["darker", 0.2]],
          }}
          colors={{
            "scheme": "set3"
          }}
          sortByValue={true}
          arcLabel={"id"}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
        />
      </div>
    </>
  );
};

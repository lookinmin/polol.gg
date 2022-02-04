import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import './Table.css'

export const CircleTable = ({ season, showTeamInfo, sorting }) => {


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
    showTeamInfo(e.id);
  };

  const makeData = (items) => {
    var value = [];
    for (let i = 0; i < 10; i++) {
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
    setData([
      {
        id: String(items[0].TeamName),
        label: value[0],
        value: value[0],
      },
      {
        id: String(items[1].TeamName),
        label: value[1],
        value: value[1],
      },
      {
        id: String(items[2].TeamName),
        label: value[2],
        value: value[2],
      },
      {
        id: String(items[3].TeamName),
        label: value[3],
        value: value[3],
      },
      {
        id: String(items[4].TeamName),
        label: value[4],
        value: value[4],
      },
      {
        id: String(items[5].TeamName),
        label: value[5],
        value: value[5],
      },
      {
        id: String(items[6].TeamName),
        label: value[6],
        value: value[6],
      },
      {
        id: String(items[7].TeamName),
        label: value[7],
        value: value[7],
      },
      {
        id: String(items[8].TeamName),
        label: value[8],
        value: value[8],
      },
      {
        id: String(items[9].TeamName),
        label: value[9],
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
      <div className="pieChart">
       
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
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
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
          arcLabel={d=>`${d.value}`}
          arcLinkLabelsSkipAngle={10}
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
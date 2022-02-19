import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import './Table.css'

export const CircleTable = ({ season, showTeamInfo, sorting }) => {
  var regex = /[^0-9]/g;

  const [data, setData] = useState([
    {}
  ]);

  const ShowTeamInfo = (e) => {
    showTeamInfo(e.id);
  };

  const makeData = (items) => {
    var value = [];
    var Rank = [];

    for (let i = 0; i < 10; i++){
      switch (items[i].rank){
        case 1:
          Rank[i] = 20;
          break;
        case 2:
          Rank[i] = 17;
          break;
        case 3:
          Rank[i] = 15;
          break;
        case 4:
          Rank[i] = 13;
          break;
        case 5:
          Rank[i] = 11;
          break;
        case 6:
          Rank[i] = 9;
          break;
        case 7:
          Rank[i] = 7.5;
          break;
        case 8:
          Rank[i] = 6;
          break;
        case 9:
          Rank[i] = 4;
          break;
        case 10:
          Rank[i] = 3;
          break;      
      }
    }
    for (let i = 0; i < 10; i++) {
      switch (sorting) {
        case "순위":
          value.push(Rank[i]);
          break;
        case "승":
          value.push(items[i].win);
          break; 
        case "패":
          value.push(items[i].lose);
          break;
        case "KDA":
          value.push(items[i].KDA);
          break;
        case "Kill":
          value.push(items[i].kill);
          break;
        case "Death":
          value.push(items[i].death);
          break;
        case "assist":
          value.push(items[i].assist);
          break;
        case "승률":
          value.push(items[i].rate.replace(regex, ""));
          break;
        default:
          value.push(Rank[i]);
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
          makeData(res.data.Team);
          break;
        default:
          break;
      }
    };
    callApi(season);
  }, [season, sorting]);


  const renderLabel = () => {
    return  ;
  }

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
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
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
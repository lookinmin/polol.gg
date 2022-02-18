import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Table.css";

export const CircleTable = ({ season, showTeamInfo, sorting }) => {
  var regex = /[^0-9]/g;

  const [data, setData] = useState([{}]);

  const ShowTeamInfo = (e) => {
    showTeamInfo(e.id);
  };

  const howToSort = (sorting, items) => {
    let value = [];
    switch (sorting) {
      case "순위":
        value = items.sort((a, b) => {
          return a.rank - b.rank;
        });
        console.log(value);
        break;
      case "승":
        value = items.sort((a, b) => {
          return b.win - a.win;
        });
        break;
      case "패":
        value = items.sort((a, b) => {
          return b.lose - a.lose;
        });
        break;
      case "KDA":
        value = items.sort((a, b) => {
          return b.KDA - a.KDA;
        });
        break;
      case "Kill":
        value = items.sort((a, b) => {
          return b.kill - a.kill;
        });
        break;
      case "Death":
        value = items.sort((a, b) => {
          return b.death - a.death;
        });
        break;
      case "assist":
        value = items.sort((a, b) => {
          return b.assist - a.assist;
        });
        break;
      case "승률":
        value = items.sort((a, b) => {
          return b.winRate - a.winRate;
        });
        break;
      default:
        break;
    }
    return value;
  };

  const makeData = (items) => {
    var Rank = [];
    var value = [];

    for (let i = 0; i < 10; i++) {
      switch (items[i].rank) {
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
        default:
          break;
      }
    }

    var tmpValue = howToSort(sorting, items);

    tmpValue.forEach((e) => {
      switch (sorting) {
        case "순위":
          value.push(e.rank);
          break;
        case "승":
          value.push(e.win);
          break;
        case "패":
          value.push(e.lose);
          break;
        case "KDA":
          value.push(e.KDA);
          break;
        case "Kill":
          value.push(e.kill);
          break;
        case "Death":
          value.push(e.death);
          break;
        case "assist":
          value.push(e.assist);
          break;
        case "승률":
          value.push(e.winRate);
          break;
        default:
          break;
      }
    });

    setData([
      {
        id: String(items[0].TeamName),
        label: (sorting === '순위') ? 1 : value[0],
        value: (sorting === '순위') ? Rank[9] : value[0]
      },
      {
        id: String(items[1].TeamName),
        label: (sorting === '순위') ? 2 : value[1],
        value: (sorting === '순위') ? Rank[8] : value[1]
      },
      {
        id: String(items[2].TeamName),
        label: (sorting === '순위') ? 3 : value[2],
        value: (sorting === '순위') ? Rank[7] : value[2]
      },
      {
        id: String(items[3].TeamName),
        label: (sorting === '순위') ? 4 : value[3],
        value: (sorting === '순위') ? Rank[6] : value[3]
      },
      {
        id: String(items[4].TeamName),
        label: (sorting === '순위') ? 5 : value[4],
        value: (sorting === '순위') ? Rank[5] : value[4]
      },
      {
        id: String(items[5].TeamName),
        label: (sorting === '순위') ? 6 : value[5],
        value: (sorting === '순위') ? Rank[4] : value[5]
      },
      {
        id: String(items[6].TeamName),
        label: (sorting === '순위') ? 7 : value[6],
        value: (sorting === '순위') ? Rank[3] : value[6]
      },
      {
        id: String(items[7].TeamName),
        label: (sorting === '순위') ? 8 : value[7],
        value: (sorting === '순위') ? Rank[2] : value[7]
      },
      {
        id: String(items[8].TeamName),
        label: (sorting === '순위') ? 9 : value[8],
        value: (sorting === '순위') ? Rank[1] : value[8]
      },
      {
        id: String(items[9].TeamName),
        label: (sorting === '순위') ? 10 : value[9],
        value: (sorting === '순위') ? Rank[0] : value[9]
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
            scheme: "set3",
          }}
          arcLabel={(d) => `${d.label}`}
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

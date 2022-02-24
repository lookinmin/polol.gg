import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Table.css";

export const CircleTable = ({ season, showTeamInfo, sorting }) => {
  const [data, setData] = useState([{}]);
  const [click, setClick] = useState(true);

  
  const ShowTeamInfo = (e) => {
    if (click) {
      showTeamInfo(e.id);
    } 
  };

  const howToSort = (sorting, items) => {
    let value = [];
    switch (sorting) {
      case "순위":
        value = items.sort((a, b) => {
          if (a.Rank === b.Rank) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return a.Rank - b.Rank;
        });
        break;
      case "승":
        value = items.sort((a, b) => {
          if (a.Win === b.Win) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Win - a.Win;
        });
        break;
      case "패":
        value = items.sort((a, b) => {
          if (a.Lose === b.Lose) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Lose - a.Lose;
        });
        break;
      case "KDA":
        value = items.sort((a, b) => {
          if (a.KDA === b.KDA) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.KDA - a.KDA;
        });
        break;
      case "Kill":
        value = items.sort((a, b) => {
          if (a.Kill === b.Kill) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Kill - a.Kill;
        });
        break;
      case "Death":
        value = items.sort((a, b) => {
          if (a.Death === b.Death) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Death - a.Death;
        });
        break;
      case "Assist":
        value = items.sort((a, b) => {
          if (a.Assist === b.Assist) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Assist - a.Assist;
        });
        break;
      case "승률":
        value = items.sort((a, b) => {
          if (a.Rate === b.Rate) {
            if (a.Difference > b.Difference) {
              return b.Difference - a.Difference;
            }
          }
          return b.Rate.replace(/[^0-9]/g, "") - a.Rate.replace(/[^0-9]/g, "");
        });
        break;
      default:
        break;
    }
    return value;
  };

  const makeData = (items) => {
    var value = [];
    var tmpValue = howToSort(sorting, items);
    var regex = /[^0-9]/g;

    tmpValue.forEach((e) => {
      switch (sorting) {
        case "순위":
          value.push(e.Rank);
          break;
        case "승":
          value.push(e.Win);
          break;
        case "패":
          value.push(e.Lose);
          break;
        case "KDA":
          value.push(e.KDA);
          break;
        case "Kill":
          value.push(e.Kill);
          break;
        case "Death":
          value.push(e.Death);
          break;
        case "Assist":
          value.push(e.Assist);
          break;
        case "승률":
          value.push(e.Rate.replace(regex, ""));
          break;
        default:
          break;
      }
    });

    setData([
      {
        id: String(items[0].TeamName),
        label: sorting === "순위" ? 1 : value[0],
        value: sorting === "순위" ? 20 : value[0],
      },
      {
        id: String(items[1].TeamName),
        label: sorting === "순위" ? 2 : value[1],
        value: sorting === "순위" ? 17 : value[1],
      },
      {
        id: String(items[2].TeamName),
        label: sorting === "순위" ? 3 : value[2],
        value: sorting === "순위" ? 15 : value[2],
      },
      {
        id: String(items[3].TeamName),
        label: sorting === "순위" ? 4 : value[3],
        value: sorting === "순위" ? 13 : value[3],
      },
      {
        id: String(items[4].TeamName),
        label: sorting === "순위" ? 5 : value[4],
        value: sorting === "순위" ? 11 : value[4],
      },
      {
        id: String(items[5].TeamName),
        label: sorting === "순위" ? 6 : value[5],
        value: sorting === "순위" ? 9 : value[5],
      },
      {
        id: String(items[6].TeamName),
        label: sorting === "순위" ? 7 : value[6],
        value: sorting === "순위" ? 7.5 : value[6],
      },
      {
        id: String(items[7].TeamName),
        label: sorting === "순위" ? 8 : value[7],
        value: sorting === "순위" ? 6 : value[7],
      },
      {
        id: String(items[8].TeamName),
        label: sorting === "순위" ? 9 : value[8],
        value: sorting === "순위" ? 6 : value[8],
      },
      {
        id: String(items[9].TeamName),
        label: sorting === "순위" ? 10 : value[9],
        value: sorting === "순위" ? 3 : value[9],
      },
    ]);
  };

  useEffect(() => {
    async function postData(season) {
      try {
        await axios
          .post("http://localhost:3002/table", {
            url: season,
          })
          .then((res) => {
            makeData(res.data.Team);
            setClick(true);
          });
      } catch (error) {
        //응답 실패
        // alert('circleTable 데이터 없음');
        setClick(false);
      }
    }
    postData(season);
  }, [season, sorting]);

  return (
    <>
      {click === true ? (
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
      ) : (
        <div/>
      )}
    </>
  );
};

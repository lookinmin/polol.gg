import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Table.css";

export const CircleTable = ({ season, showTeamInfo, teamInfo, sorting }) => {
  var isComponentMounted = true;
  const [data, setData] = useState([{}]);
  const [click, setClick] = useState(true);

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

  const ShowTeamInfo = (e) => {
    showTeamInfo(e.id);
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
    let weight = [20, 17, 15, 13, 11, 9, 7.5, 6, 4.5, 3.5];
    let value = [];
    let tmpValue = howToSort(sorting, items);
    let regex = /[^0-9]/g;

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

    let tmpData = [];
    for (let i = 0; i < tmpValue.length; i++) {
      tmpData.push({
        id: String(items[i].TeamName),
        label: sorting === "순위" ? i + 1 : value[i],
        value: sorting === "순위" ? weight[i] : value[i],
      });
    }
    setData(tmpData);
  };

  useEffect(() => {
    async function postData(season) {
      try {
        await axios
          .post("http://localhost:3002/table", {
            url: season,
          })
          .then((res) => {
            console.log(res.data);
            makeData(res.data.Team);
            if (isComponentMounted === true) {
              setClick(true);
            }
          });
      } catch (error) {
        //응답 실패
        // alert('circleTable 데이터 없음');
        console.log(error);
        setClick(false);
      }
    }
    postData(season);
    return () => {
      isComponentMounted = false;
    };
  }, [teamInfo]);

  return (
    <>
      <div className="pieChart2">
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
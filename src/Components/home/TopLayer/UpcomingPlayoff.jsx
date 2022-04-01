import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";


export const UpcomingPlayoff = () => {
  const matchWidth = useMediaQuery({ minWidth: 1400 });
  const actWidth = useMediaQuery({ maxWidth: 1399.99 });

  const [Match1, setMatch1] = useState([
    { Team1: "", Team2: "", Lscore: "", Rscore: "" },
  ]);

  const [pic1, setPic1] = useState([{ Team1: "", Team2: "" }]);

  const [upComing, setUpComing] = useState(-1);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.Playoff);
    };
    var TimeLine = [];
    var exFilter = [];
    var TodayMatch = [];

    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    const makeData = (items) => {
      for (let i = 0; i < items.length; i++) {
        TimeLine[i] = {
          MD: items[i].Month,
          DD: items[i].Day,
          mat1Left: items[i].Lteam1,
          mat1Right: items[i].Rteam1,
          score1Left: items[i].LScore1,
          score1Right: items[i].RScore1
        };
      }

      //-------------------------------------------TODAY MATCHUP----------------------------------------

      const UpComingDate = (month, day) => {
        const Month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        if (day <= 9) {
          day = "0" + day;
        }
        setUpComing(Month[Number(month) - 1] + "." + day);
      };

      for (let i = 0; i < items.length; i++) {
        if (TimeLine[i].MD * 100 + TimeLine[i].DD >= month * 100 + date) {
          for (let j = i; j < items.length; j++) {
            exFilter[j] = {
              mat1Left: TimeLine[j].mat1Left,
              mat1Right: TimeLine[j].mat1Right,
              score1L: TimeLine[j].score1Left,
              score1R: TimeLine[j].score1Right
            };
          }
          UpComingDate(TimeLine[i].MD, TimeLine[i].DD);
          break;
        }
      }

      TodayMatch = exFilter.filter((element, i) => element !== undefined);

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

      setMatch1([
        {
          Team1: TodayMatch[0].mat1Left,
          Team2: TodayMatch[0].mat1Right,
          Lscore: TodayMatch[0].score1L,
          Rscore: TodayMatch[0].score1R,
        },
      ]);

      setPic1([
        {
          Team1: setPicture(TodayMatch[0].mat1Left),
          Team2: setPicture(TodayMatch[0].mat1Right),
        },
      ]);
    };
    callApi();
  }, []);

  const renderMatchUP = (
    <div className="TmatchInfo">
      <div className="team1">
        <div className="teamBox_pl">
          <img
            src={pic1[0].Team1}
            width="auto"
            height="70px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match1[0].Team1}</h2>
        </div>
        <h2 className="score">{Match1[0].Lscore}</h2>
      </div>

      <h2 className="versus"> {parseInt(Match1[0].Rscore) >= 0 ? ":" : "VS"} </h2>

      <div className="team2">
        <h2 className="score">{Match1[0].Rscore}</h2>
        <div className="teamBox_pl">
          <img
            src={pic1[0].Team2}
            width="auto"
            height="70px"
            className="tPic"
          ></img>
          <h2 className="teamTitle">{Match1[0].Team2}</h2>
        </div>
      </div>
    </div>
  );


  const renderPlayoffMatch = (
    <>
      <div className="match">
        <p id="match_title">{upComing}&nbsp;&nbsp;&nbsp;Match UP</p>
      </div>

      <div className="today_match_pl">
        <div className="matchBox">
          {renderMatchUP}
        </div>
      </div>

    </>
  )



  return (
    <>
      {renderPlayoffMatch}
    </>
  )
}

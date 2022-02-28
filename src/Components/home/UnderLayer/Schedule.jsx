import React, { useEffect, useState } from "react";
import "./Schedule.css";
import { Match } from "./Match";
import axios from "axios";

export const Schedule = ({isPlayOff}) => {
  const [week, setWeek] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState();
  const [monthList, setMonthList] = useState([]);
  const [timeLineCnt, setTimeLineCnt] = useState(0);
  const [state, setState] = useState(false);

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

  function searchPeriodCalculation(month, weekObjArray, monthArray) {
    let now = new Date();
    let cYear = now.getFullYear();
    let date = new Date(cYear, month);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let weekObj = null;
    let weekStand = 8; // 월요일 고정
    let firstWeekEndDate = true;
    let thisMonthFirstWeek = firstDay.getDay();
    for (var num = 1; num <= 6; num++) {
      if (lastDay.getMonth() !== firstDay.getMonth()) {
        break;
      }
      weekObj = [];
      if (firstDay.getDay() <= 1) {
        if (firstDay.getDay() === 0) {
          firstDay.setDate(firstDay.getDate() + 1);
        }
        weekObj.weekStartDate =
          numberPad((firstDay.getMonth() + 1).toString(), 2) +
          "-" +
          numberPad(firstDay.getDate().toString(), 2);

        monthArray.push(
          Month[firstDay.getMonth()] +
            "." +
            numberPad(firstDay.getDate().toString(), 2)
        );
      }

      if (weekStand > thisMonthFirstWeek) {
        if (firstWeekEndDate) {
          if (weekStand - firstDay.getDay() === 1) {
            firstDay.setDate(
              firstDay.getDate() + (weekStand - firstDay.getDay()) - 1
            );
          }

          if (weekStand - firstDay.getDay() > 1) {
            firstDay.setDate(
              firstDay.getDate() + (weekStand - firstDay.getDay()) - 1
            );
          }
          firstWeekEndDate = false;
        } else {
          firstDay.setDate(firstDay.getDate() + 6);
        }
      } else {
        firstDay.setDate(
          firstDay.getDate() + (6 - firstDay.getDay()) + weekStand
        );
      }

      if (typeof weekObj.weekStartDate !== "undefined") {
        weekObjArray.push(weekObj.weekStartDate);
      }
      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  function numberPad(num, width) {
    num = String(num);
    return num.length >= width
      ? num
      : new Array(width - num.length + 1).join("0") + num;
  }

  const MakeNewDate = (month, day) => {
    var newDate;
    switch (Number(month)) {
      case 1:
        newDate = `JAN.${day}`;
        break;
      case 2:
        newDate = `FEB.${day}`;
        break;
      case 3:
        newDate = `MAR.${day}`;
        break;
      case 4:
        newDate = `APR.${day}`;
        break;
      case 5:
        newDate = `MAY.${day}`;
        break;
      case 6:
        newDate = `JUN.${day}`;
        break;
      case 7:
        newDate = `JUL.${day}`;
        break;
      case 8:
        newDate = `AUG.${day}`;
        break;
      case 9:
        newDate = `SEP.${day}`;
        break;
      case 10:
        newDate = `OCT.${day}`;
        break;
      case 11:
        newDate = `NOV.${day}`;
        break;
      case 12:
        newDate = `DEC.${day}`;
        break;
      default:
        break;
    }
    return newDate;
  };

  const apiData = async (today) => {
    var weekMatch = [];
    const res = await axios.get("http://localhost:3002/");
    console.log(today);
    if (!isPlayOff) {
      const items = res.data.data;
      for (let i = 0; i < items.length; i++) {
        if (today <= Number(items[i].Month * 100) + Number(items[i].Day)) {
          for (let j = i; j < items.length; j++) {
              weekMatch.push({
                matchDate: MakeNewDate(items[j].Month, items[j].Day),
                Lteam1: items[j].Lteam1,
                Rteam1: items[j].Rteam1,
                score1L: items[i].Lscore1,
                score1R: items[i].Rscore1,
                Lteam2: items[j].Lteam2,
                Rteam2: items[j].Rteam2,
                score2L: items[i].Lscore2,
                score2R: items[i].Rscore2,
              });
            break;
          }
        }
      }
      if(weekMatch.length !== 0){
        setMatchSchedule([weekMatch[0], weekMatch[1], weekMatch[2], weekMatch[3], weekMatch[4]]);
      }else{
        setMatchSchedule(weekMatch)
      }
    } else {
      const items = res.data.data; //플레이오프용 일정 받아와야함
      for (let i = 0; i < items.length; i++) {
        if (today <= Number(items[i].Month * 100) + Number(items[i].Day)) {
          for (let j = i; j < i + 1; j++) {
            if (
              today <= items[j].Month * 100 + items[j].Day &&
              items[j].Month * 100 + items[j].Day < today + 7
            ) {
              weekMatch.push({
                matchDate: MakeNewDate(items[j].month, items[j].day),
                Lteam: items[j].Lteam,
                LScore: items[j].LScore,
                RScore: items[j].RScore,
                Rteam: items[j].Rteam,
                round: items[j].round
              });
            }
          }
        }
      }
      setMatchSchedule(weekMatch);
    }
  };

  useEffect(() => {
    setState(true);
    let weekObjArray = [];
    let monthArray = [];
    for (let i = 0; i < 12; i++) {
      if (i < 10) {
        searchPeriodCalculation(`0${i}`, weekObjArray, monthArray);
      } else {
        searchPeriodCalculation(`${i}`, weekObjArray, monthArray);
      }
    }
    setWeek(weekObjArray);
    setMonthList(monthArray);

    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    );
    setTimeLineCnt(
      Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) - 1
    );

    if (week.length !== 0) {
      let date = week[timeLineCnt].split("-");
      apiData(Number(date[0]) * 100 + Number(date[1]));
    }
  }, [state]);

  const moveDate = (e) => {
    var tmpCnt = timeLineCnt;
    if (e.target.id === "L") {
      if (timeLineCnt === 0 || timeLineCnt - 1 <= 0) {
        setTimeLineCnt(0);
        tmpCnt = 0;
      } else {
        tmpCnt -= 1;
        setTimeLineCnt(timeLineCnt - 1);
      }
    } else if (e.target.id === "R") {
      if (timeLineCnt >= week.length - 5) {
        tmpCnt = week.length - 5;
        setTimeLineCnt(week.length - 5);
      } else {
        tmpCnt += 1;
        setTimeLineCnt(timeLineCnt + 1);
      }
    }
    let date = week[tmpCnt].split("-");
    apiData((Number(date[0]) * 100 + Number(date[1])));
  };

  const ClickDate = (e) => {
    const clickedDate = e.target.id;
    const clickedValue = Number(e.target.getAttribute('value'));
    setTimeLineCnt(timeLineCnt+clickedValue-3);
    let timeLine = document.querySelectorAll(".timeLine");
    for (let i = 0; i < timeLine.length; i++) {
      timeLine[i].className = "timeLine";
    }
    timeLine[2].className += " timeLineEffect slide-in-fwd-center";
    let date = clickedDate.split("-");
    apiData((Number(date[0]) * 100 + Number(date[1])));
  };

  return (
    <div>
      <div className="scheduleTimeLine">
        <button onClick={moveDate} className="moveDateBtn">
          <img id="L" src="img/prev.png" width="30px" />
        </button>
        <div className="scheduleTimeList">
          <div
            className="timeLine"
            id={week[timeLineCnt - 2]}
            value="1"
            onClick={ClickDate}
          >
            {monthList[timeLineCnt - 2]}
          </div>
          <div
            className="timeLine"
            id={week[timeLineCnt - 1]}
            value="2"
            onClick={ClickDate}
          >
            {monthList[timeLineCnt - 1]}
          </div>
          <div
            className="timeLine timeLineEffect"
            id={week[timeLineCnt]}
            value="3"
            onClick={ClickDate}
          >
            {monthList[timeLineCnt]}
          </div>
          <div
            className="timeLine"
            id={week[timeLineCnt + 1]}
            value="4"
            onClick={ClickDate}
          >
            {monthList[timeLineCnt + 1]}
          </div>
          <div
            className="timeLine"
            id={week[timeLineCnt + 2]}
            value="5"
            onClick={ClickDate}
          >
            {monthList[timeLineCnt + 2]}
          </div>
        </div>
        <button className="moveDateBtn" onClick={moveDate}>
          <img id="R" src="img/next.png" width="30px" />
        </button>
      </div>
      <div>
        {
          <Match
            match={matchSchedule}
            key={matchSchedule}
            isPlayOff={isPlayOff}
          />
        }
      </div>
    </div>
  );
};

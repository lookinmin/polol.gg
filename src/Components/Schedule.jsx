import React, { useEffect, useState } from "react";
import "./CSS/Schedule.css";
import { Match } from "./Match";
import axios from "axios";

export const Schedule = () => {
  const [week, setWeek] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState();
  const [monthList, setMonthList] = useState([]);
  const [Today, setToday] = useState("1");
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
    let cYear = "2022";
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
    switch (month) {
      case '1':
        newDate = `JAN.${day}`;
        break;
      case '2':
        newDate = `FEB.${day}`;
        break;
      case '3':
        newDate = `MAR.${day}`;
        break;
      case '4':
        newDate = `APR.${day}`;
        break;
      case '5':
        newDate = `MAY.${day}`;
        break;
      case '6':
        newDate = `JUN.${day}`;
        break;
      case '7':
        newDate = `JUL.${day}`;
        break;
      case '8':
        newDate = `AUG.${day}`;
        break;
      case '9':
        newDate = `SEP.${day}`;
        break;
      case '10':
        newDate = `OCT.${day}`;
        break;
      case '11':
        newDate = `NOV.${day}`;
        break;
      case '12':
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
    const items = res.data;
    for (let i = 0; i < 45; i++) {
      if (today <= items[i].month * 100 + items[i].day) {
        for (let j = i; j < i + 1; j++) {
          if (
            today <= items[j].month * 100 + items[j].day &&
            items[j].month * 100 + items[j].day <= today + 7
          ) {
            weekMatch.push({
              matchDate: MakeNewDate(items[j].month, items[j].day),
              Lteam1: items[j].Lteam1,
              Rteam1: items[j].Rteam1,
              Lteam2: items[j].Lteam2,
              Rteam2: items[j].Rteam2,
            });
          }
        }
      }
    }
    setMatchSchedule(weekMatch);
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
    setToday("0");

    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    );
    setTimeLineCnt(
      Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) - 2
    );

    if (week.length !== 0) {
      setState(false);
      let date = week[timeLineCnt].split("-");
      setToday(Number(date[0]) * 100 + Number(date[1]));
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
    apiData(Number(date[0]) * 100 + Number(date[1]));
  };

  const ClickDate = (e) => {
    const clickedDate = e.target.id;
    let date = clickedDate.split("-");
    apiData(Number(date[0]) * 100 + Number(date[1]));
  };

  return (
    <div>
      <div className="scheduleTimeLine">
        <button onClick={moveDate} className="moveDateBtn">
          <img id="L" src="img/prev.png" width="30px" />
        </button>
        <div className="scheduleTimeList">
          <div
            className="timeLine tmp1"
            id={week[timeLineCnt - 2]}
            onClick={ClickDate}
          >
            {monthList[timeLineCnt - 2]}
          </div>
          <div
            className="timeLine tmp2"
            id={week[timeLineCnt - 1]}
            onClick={ClickDate}
          >
            {monthList[timeLineCnt - 1]}
          </div>
          <div
            className="timeLine timeLineEffect"
            id={week[timeLineCnt]}
            onClick={ClickDate}
          >
            {monthList[timeLineCnt]}
          </div>
          <div
            className="timeLine tmp4"
            id={week[timeLineCnt + 1]}
            onClick={ClickDate}
          >
            {monthList[timeLineCnt + 1]}
          </div>
          <div
            className="timeLine tmp5"
            id={week[timeLineCnt + 2]}
            onClick={ClickDate}
          >
            {monthList[timeLineCnt + 2]}
          </div>
        </div>
        <button className="moveDateBtn" onClick={moveDate}>
          <img id="R" src="img/next.png" width="30px" />
        </button>
      </div>
      <div>{<Match match={matchSchedule} key={matchSchedule} />}</div>
    </div>
  );
};

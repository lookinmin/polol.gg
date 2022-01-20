import React, { useEffect, useState } from "react";
import "./CSS/Schedule.css";
import { Match } from "./Match";
import axios from "axios";

export const Schedule = () => {
  const [week, setWeek] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState();
  const [Today, setToday] = useState("1");
  const [timeLineCnt, setTimeLineCnt] = useState(0);
  const [state, setState] = useState(false);

  function searchPeriodCalculation(month, weekObjArray) {
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

        numberPad(firstDay.getDate().toString(), 2);
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
              month: items[j].month,
              date: items[j].day,
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
    console.log('first');
    setState(true);
    let weekObjArray = [];
    for (let i = 0; i < 12; i++) {
      if (i < 10) {
        searchPeriodCalculation(`0${i}`, weekObjArray);
      } else {
        searchPeriodCalculation(`${i}`, weekObjArray);
      }
    }
    setWeek(weekObjArray);
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
    if (e.target.innerText === "L") {
      if (timeLineCnt === 0 || timeLineCnt - 1 <= 0) {
        setTimeLineCnt(0);
        tmpCnt = 0;
      } else {
        tmpCnt -= 1;
        setTimeLineCnt(timeLineCnt - 1);
      }
    } else if (e.target.innerText === "R") {
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

  return (
    <div>
      <div className="scheduleTimeLine">
        <button onClick={moveDate}>L</button>
        <div className="scheduleTimeList">
          <div className="timeLine">{week[timeLineCnt]}</div>
          <div className="timeLine">{week[timeLineCnt + 1]}</div>
          <div className="timeLine">{week[timeLineCnt + 2]}</div>
          <div className="timeLine">{week[timeLineCnt + 3]}</div>
          <div className="timeLine">{week[timeLineCnt + 4]}</div>
        </div>
        <button onClick={moveDate}>R</button>
      </div>
      <div>{<Match match={matchSchedule} key={matchSchedule} />}</div>
    </div>
  );
};

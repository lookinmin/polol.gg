import React, { useEffect, useState } from "react";
import "./CSS/Schedule.css";
import { Match } from "./Match";

export const Schedule = () => {
  const [week, setWeek] = useState([]);
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

  const [Today, setToday] = useState(0);
  const [timeLineCnt, setTimeLineCnt] = useState(0);

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
        weekObj.weekEndDate =

        firstDay.getFullYear().toString()

      + "-"

      + numberPad((firstDay.getMonth() + 1).toString(), 2)

      + "-"

      + numberPad(firstDay.getDate().toString(), 2);

      
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
        firstDay.setDate(firstDay.getDate() 
        + (6 - firstDay.getDay()) + weekStand);
      }
      if (typeof weekObj.weekStartDate !== "undefined") {    
        weekObjArray.push(weekObj.weekStartDate);
      }
      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  function numberPad(num, width) {
    num = String(num);
    return num.length >= width ? num
      : new Array(width - num.length + 1).join("0") + num;
  }

  const showTimeLine = () => {
    let tmp = document.querySelectorAll('.timeLine');
    let tmpText= [];
    for(let i=0;i<tmp.length;i++){
      tmpText.push(tmp[i].innerHTML);
    }
  };

  useEffect(() => {
    let weekObjArray = [];
    for (let i = 0; i < 12; i++) {
      if (i < 10) {
        searchPeriodCalculation(`0${i}`, weekObjArray);
      } else {
        searchPeriodCalculation(`${i}`, weekObjArray);
      }
    }
    setWeek(weekObjArray);

    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    );
    setTimeLineCnt(Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7)-2);
    showTimeLine();
  }, [timeLineCnt]);

  
  const moveDate = (e) => {
    console.log(timeLineCnt);
    if (e.target.innerText === "L") {
      if (Today === 0 || timeLineCnt === 1) {
        console.log(Today+", "+timeLineCnt);
        setTimeLineCnt(0);
      } 
      else {
        if(timeLineCnt !== 1){
          setTimeLineCnt(timeLineCnt - 1);
          console.log("before: "+timeLineCnt);
        }
      }
    } else if (e.target.innerText === "R") {
      if (timeLineCnt + 1 === week.length - 5 || timeLineCnt === week.length - 5) {
        setTimeLineCnt(timeLineCnt);
      } else {
        setTimeLineCnt(timeLineCnt + 1);
      }
    }
    
    // showTimeLine();
  };

  return (
    <div>
      <div className="scheduleTimeLine">
        <button onClick={moveDate}>L</button>
        <div className="scheduleTimeList">
          <div className="timeLine">{week[timeLineCnt] }</div>
          <div className="timeLine">{week[timeLineCnt + 1]}</div>
          <div className="timeLine">{week[timeLineCnt + 2]}</div>
          <div className="timeLine">{week[timeLineCnt + 3]}</div>
          <div className="timeLine">{week[timeLineCnt + 4]}</div>
        </div>
        <button onClick={moveDate}>R</button>
      </div>
      <div>
        {<Match date={"2022-01-19"}/>}
      </div>
    </div>
  );
};

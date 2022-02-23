import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const NowSeason = () => {

  const [showSeason, setShowSeason] = useState('');

  var catchMonth;
  var catchDay;

  const makeData = (data, Season) => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    setShowSeason(Season[0])

    for(let i of i < data){
      if(i.Lteam2 === null){
        catchMonth = i.Month;
        catchDay = i.Day;
        break;
      }
    }

    if(100*month + date > 100*catchMonth + catchDay){
      setShowSeason(Season[1])
    }

  }

  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.data, res.data.Season);
    };

    callApi();
  })


  return (
    <div>{showSeason}</div>
  )
}

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
    let month = parseInt(today.getMonth() + 1);
    let date = parseInt(today.getDate());
    var seasons = new Array();



    let i = 0;
    while (true){
      if(data[i].Lteam2 === null && ((100*data[i].Month + data[i].Day) !== (100*data[i-1].Month + data[i-1].Day))){
        catchMonth = parseInt(data[i].Month);
        catchDay = parseInt(data[i].Day);
        break;
      }
      i++;
    }


    Season.forEach(e => {
      if(e !== null){
        const newText = e.split("_");
        let PO = (newText[1] === "playoff") ? 'PO' : "";
        let eng = (newText[0].substring(0, 6)).toUpperCase();
        const num = "20"+newText[0].substring(6, newText[0].length);
        seasons.push(`${num} LCK ${eng} ${PO}`);
      }
    });

    var num = parseInt(seasons.length)-1 ;

    setShowSeason(seasons[num])

    if((100*month + date) > (100*catchMonth + catchDay)){
      console.log("IS PO")
      setShowSeason(seasons[--num])
    }

  }

  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.data, res.data.Season);
    };

    callApi();
  }, [])


  return (
    <div>{showSeason}</div>
  )
}

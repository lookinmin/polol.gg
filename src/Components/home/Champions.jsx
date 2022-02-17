import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Champions.css";
import { useState } from "react";
import { PickBan } from "./PickBan";

export const Champions = () => {
  const [Top, setTop] = useState([]);
  const [Jgl, setJgl] = useState([]);
  const [Mid, setMid] = useState([]);
  const [Adc, setAdc] = useState([]);
  const [Spt, setSpt] = useState([]);

  const makeData = (champData) => {
    let Adc = [];
    let Spt = [];
    let Mid = [];
    let Top = [];
    let Jgl = [];
    champData.forEach((e) => {
      if(e.name === 'LeBlanc'){
        e.url = 'img/LeBlanc.png';
      }
      switch (e.position) {
        case "SPT":
          Spt.push({
            name: e.name,
            ban: e.ban,
            pick: e.pick,
            url: e.url,
          });
          break;
        case "ADC":
          Adc.push({
            name: e.name,
            ban: e.ban,
            pick: e.pick,
            url: e.url,
          });
          break;
        case "MID":
          Mid.push({
            name: e.name,
            ban: e.ban,
            pick: e.pick,
            url: e.url,
          });
          break;
        case "JGL":
          Jgl.push({
            name: e.name,
            ban: e.ban,
            pick: e.pick,
            url: e.url,
          });
          break;
        case "TOP":
          Top.push({
            name: e.name,
            ban: e.ban,
            pick: e.pick,
            url: e.url,
          });
          break;
        default:
          break;
      }
    });
    setTop(Top);
    setJgl(Jgl);
    setMid(Mid);
    setAdc(Adc);
    setSpt(Spt);
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.champion);
    };

    callApi();
  }, []);

  return (
    <div className="Champions">
      <h2>Pick & Ban Rate</h2>
      <div className="championsContainer">
        <div className="championsBox">
          <div className="championsLineImg">
            <img src="img/positions/TOP.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Top} />
          </div>
        </div>
        {/* <div className="championsBox">
          <div className="championsLineImg">
            <img src="img/positions/JGL.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Jgl} />
          </div>
        </div>
        <div className="championsBox">
          <div className="championsLineImg">
            <img src="img/positions/MID.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Mid} />
          </div>
        </div>
        <div className="championsBox">
          <div className="championsLineImg">
            <img src="img/positions/AD.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Adc} />
          </div>
        </div>
        <div className="championsBox" id="lastBox">
          <div className="championsLineImg">
            <img src="img/positions/SPT.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Spt} />
          </div>
        </div> */}
      </div>
    </div>
  );
};
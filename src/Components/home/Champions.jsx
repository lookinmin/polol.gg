import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Champions.css";
import { useState } from "react";
import { PickBan } from "./PickBan";


export const Champions = ({ champData }) => {
  const [Top, setTop] = useState([]);
  const [Jgl, setJgl] = useState([]);
  const [Mid, setMid] = useState([]);
  const [Adc, setAdc] = useState([]);
  const [Spt, setSpt] = useState([]);
  const [state, setState] = useState(false);

  const makeData = (champData) => {
    let Adc = [];
    let Spt = [];
    let Mid = [];
    let Top = [];
    let Jgl = [];
    champData.forEach((e) => {
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
    console.log(Top);
    setJgl(Jgl);
    setMid(Mid);
    setAdc(Adc);
    setSpt(Spt);
    setState(true);
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      makeData(res.data.champion);
    }

    callApi();
  }, [state]);


  return (
    <div className="championsContainer">
      <div className="championsBox">
        <div className="championsLine">
          <div className="championsLineImg">
            <img src="img/positions/TOP.png" />
          </div>
        </div>
        <PickBan data={Top}/>
      </div>
      <div className="championsBox">
        <div className="championsLine">
          <div className="championsLineImg">
            <img src="img/positions/JGL.png" />
          </div>
        </div>
        <PickBan data={Jgl}/>
      </div>
      <div className="championsBox">
        <div className="championsLine">
          <div className="championsLineImg">
            <img src="img/positions/MID.png" />
          </div>
        </div>
        <PickBan data={Mid}/>
      </div>
      <div className="championsBox">
        <div className="championsLine">
          <div className="championsLineImg">
            <img src="img/positions/AD.png" />
          </div>
        </div>
        <PickBan data={Adc}/>
      </div>
      <div className="championsBox">
        <div className="championsLine">
          <div className="championsLineImg">
            <img src="img/positions/SPT.png" />
          </div>
        </div>
        <PickBan data={Spt}/>
      </div>
    </div>
  );
};

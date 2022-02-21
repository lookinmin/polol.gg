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
      if (e.Name === "LeBlanc") {
        e.Url = "img/LeBlanc.png";
      }
      switch (e.Position) {
        case "SPT":
          Spt.push({
            Name: e.Name,
            Ban: e.Ban,
            Pick: e.Pick,
            Url: e.Url,
            Rate: e.Rate,
            Win: e.Win,
            Lose: e.Lose,
            Total: e.Total
          });
          break;
        case "ADC":
          Adc.push({
            Name: e.Name,
            Ban: e.Ban,
            Pick: e.Pick,
            Url: e.Url,
            Rate: e.Rate,
            Win: e.Win,
            Lose: e.Lose,
            Total: e.Total
          });
          break;
        case "MID":
          Mid.push({
            Name: e.Name,
            Ban: e.Ban,
            Pick: e.Pick,
            Url: e.Url,
            Rate: e.Rate,
            Win: e.Win,
            Lose: e.Lose,
            Total: e.Total
          });
          break;
        case "JGL":
          Jgl.push({
            Name: e.Name,
            Ban: e.Ban,
            Pick: e.Pick,
            Url: e.Url,
            Rate: e.Rate,
            Win: e.Win,
            Lose: e.Lose,
            Total: e.Total
          });
          break;
        case "TOP":
          Top.push({
            Name: e.Name,
            Ban: e.Ban,
            Pick: e.Pick,
            Url: e.Url,
            Rate: e.Rate,
            Win: e.Win,
            Lose: e.Lose,
            Total: e.Total
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
      <h2>챔피언 픽 밴률</h2>
      <div className="championsContainer">
        <div className="championsBox">
          <div className="championsLineImg">
            <img src="img/positions/TOP.png" width={"65px"} height={"auto"} />
          </div>
          <div className="championsInfo">
            <PickBan data={Top} />
          </div>
        </div>
        <div className="championsBox">
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
        </div>
      </div>
    </div>
  );
};
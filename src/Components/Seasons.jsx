import React, { useState } from "react";
import "./CSS/Table.css";
import "./CSS/Seasons.css";

export const Seasons = ({ nowSeason }) => {

  const [state, setState] = useState(false);
  const seasonBtn = () => {
    if (state === false) {
      document.querySelector(".seasonDiv").style.visibility = "visible";
      document.querySelector(".seasonDiv").className = "seasonDiv seasonDivAni";
    } else {
      document.querySelector(".seasonDiv").className =
        "seasonDiv seasonDivAni2";
    }
    setState(!state);
  };

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
  };

  return (
    <>
      <div className="seasonContainer">
        <div className="seasonBtn" onClick={seasonBtn}>
          시즌
        </div>
        <div className="seasonDiv">
          <div className="seasons" onClick={ClickSeason}>
            2022 LCK 서머
          </div>
          <div className="seasons" onClick={ClickSeason}>
            2022 LCK 스프링
          </div>
          <div className="seasons" onClick={ClickSeason}>
            {" "}
            2021 LCK 서머
          </div>
          <div className="seasons" onClick={ClickSeason}>
            2021 LCK 스프링
          </div>
        </div>
      </div>
    </>
  );
};
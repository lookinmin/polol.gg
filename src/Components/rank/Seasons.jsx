import React from "react";
import "./Table.css";
import "./Seasons.css";

export const Seasons = ({ nowSeason }) => {

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
  };

  return (
    <>
      <div className="sec-center">
        <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
        <label className="for-dropdown" htmlFor="dropdown">
          Season <i className="uil uil-arrow-down"></i>
        </label>
        <div className="section-dropdown">
          <div className="section" onClick={ClickSeason}>
            2022 LCK 서머 <i className="uil uil-arrow-right"></i>
          </div>
          <div className="section" onClick={ClickSeason}>
            2022 LCK 스프링 <i className="uil uil-arrow-right"></i>
          </div>
          <div className="section" onClick={ClickSeason}>
            2021 LCK 서머 <i className="uil uil-arrow-right"></i>
          </div>
          <div className="section" onClick={ClickSeason}>
            2021 LCK 스프링 <i className="uil uil-arrow-right"></i>
          </div>
        </div>
      </div>
      
    </>
  );
};

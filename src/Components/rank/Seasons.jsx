import React, { useState } from "react";
import "./Table.css";

export const Seasons = ({ nowSeason }) => {
  const [season, setSeason] = useState("2022 LCK 스프링");

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
    setSeason(e.target.innerText);
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle dropdownBtn"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {season}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <div className="dropdown-item" onClick={ClickSeason}>2022 LCK 서머</div>
          </li>
          <li>
            <div className="dropdown-item" onClick={ClickSeason}>2022 LCK 스프링</div>
          </li>
          <li>
            <div className="dropdown-item" onClick={ClickSeason}>2021 LCK 서머</div>
          </li>
          <li>
            <div className="dropdown-item" onClick={ClickSeason}>2021 LCK 스프링</div>
          </li>
        </ul>
      </div>
    </>
  );
};

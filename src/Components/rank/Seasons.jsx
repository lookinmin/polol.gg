import React, { useState } from "react";
import "./Table.css";
import { Dropdown } from "react-bootstrap";

export const Seasons = ({ nowSeason }) => {
  const [season, setSeason] = useState("2022 LCK 스프링");

  const [totalSeason, setTotalSeason] = useState([
    "2022 LCK 서머",
    "2022 스프링 플레이오프",
    "2022 LCK 스프링",
  ]);
  // table에서 시즌 가져와야 함

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
    setSeason(e.target.innerText);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-button-dark-example1"
          className="dropdownBtn"
          variant="secondary"
        >
          {season}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark" className="dropdown-menu">
          {totalSeason.map((e) => {
            return (
              <Dropdown.Item className="dropdown-item" onClick={ClickSeason}>
                {e}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

    </>
  );
};
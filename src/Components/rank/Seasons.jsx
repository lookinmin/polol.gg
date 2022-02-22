import React, { useState } from "react";
import "./Table.css";
import { Dropdown } from "react-bootstrap";

export const Seasons = ({ nowSeason }) => {
  const [season, setSeason] = useState("2022 LCK 스프링");

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
    setSeason(e.target.innerText);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" className="dropdownBtn" variant="secondary">
        {season}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark" className="dropdown-menu">
          <Dropdown.Item className='dropdown-item' onClick={ClickSeason}>2022 LCK 서머</Dropdown.Item>
          <Dropdown.Item className='dropdown-item' onClick={ClickSeason}>2022 LCK 스프링</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

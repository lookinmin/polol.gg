import React, { useState } from "react";
import "./Table.css";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

export const Seasons = ({ nowSeason }) => {
  const [season, setSeason] = useState("");
  const [totalSeason, setTotalSeason] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
      let seasons = [];
      res.data.Season.forEach((e) => {
        if (e !== null) {
          const newText = e.split("_");
          let PO = newText[1] === "playoff" ? "PO" : "";
          let eng = newText[0].substring(0, 6).toUpperCase();
          const num = "20" + newText[0].substring(6, newText[0].length);
          seasons.push(`${num} LCK ${eng} ${PO}`);
        }
      });
      setSeason(seasons[seasons.length - 1]);
      setTotalSeason(seasons);
    };
    callApi();
  }, []);

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
          {season}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark" className="dropdown-menu">
          {totalSeason.map((e) => {
            return (
                <Dropdown.Item
                  className="dropdown-item"
                  onClick={ClickSeason}
                  key={e}
                  value={e}
                >
                  {e}
                </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

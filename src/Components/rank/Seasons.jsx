import React, { useState } from "react";
import "./Table.css";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

export const Seasons = ({ nowSeason }) => {
  const [season, setSeason] = useState("");
  const [url, setUrl] = useState("");

  const [totalSeason, setTotalSeason] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/table");
      let seasons = [];
      res.data.Season.forEach(e => {
        if(e !== null){
          const newText = e.split("_");
          
          let PO = (newText[1] === "playoff") ? 'PO' : "";

          let eng = newText[0].substring(0, 6);
          if(eng === 'spring'){
            eng = 'Spring';
          }else if(eng === 'summer'){
            eng = 'Summer';
          }

          const num = "20"+newText[0].substring(6, newText[0].length);
          seasons.push(`${num} LCK ${eng} ${PO}`);
        }
      });

      setSeason(seasons[seasons.length-1]);
      setTotalSeason(seasons);
    };
    callApi();
  }, [url]);

  const ClickSeason = (e) => {
    nowSeason(e.target.innerText);
    setSeason(e.target.innerText);
    setUrl(e.target.getAttribute('href'));
    async function postData() {
      try {
        alert(e.target.getAttribute('href'))
        await axios.post('http://localhost:3002/table',{
            data: e.target.getAttribute('href')
        });
      } catch (error) {
        //응답 실패
        console.log(error);
      }
    }
    postData();
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
              <Dropdown.Item className="dropdown-item" onClick={ClickSeason} key={e} href={'table/'+e}>
                {e}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

    </>
  );
};
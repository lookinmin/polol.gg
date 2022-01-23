import React, { useState } from 'react'
import './CSS/Table.css'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useEffect } from 'react';

export const Seasons = ( {nowSeason} ) => {
  
  const [showSeason, setShowSeason] = useState("2022 LCK 서머");
  const seasons = ["2022 LCK 서머", "2022 LCK 스프링", "2021 LCK 서머", "2021 LCK 스프링"];

  const ChangeSeason = (e) => {
    setShowSeason(e.target.innerText);
    nowSeason(showSeason);
  }

  useEffect(() => {
    nowSeason(showSeason);
  }, [showSeason])


  return (
    <div className='seasonDiv'>
      <div className='seasonText'>{showSeason}</div>
      <div className="mb-2 end">
        <DropdownButton as={ButtonGroup} key="end"
          id="dropdown-button-drop-start" drop="end"
          variant="secondary" title="시즌" className='seasonDropDown'>
          <Dropdown.Item eventKey="1">
            <button className="dropdown-item" onClick={ChangeSeason}>
              {seasons[0]}
            </button>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <button className="dropdown-item" onClick={ChangeSeason}>
              {seasons[1]}
            </button>
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <button className="dropdown-item" onClick={ChangeSeason}>
              {seasons[2]}
            </button>
          </Dropdown.Item>
          <Dropdown.Item eventKey="4">
            <button className="dropdown-item" onClick={ChangeSeason}>
              {seasons[3]}
            </button>
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

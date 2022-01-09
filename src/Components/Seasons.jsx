import React, { useState } from 'react'
import './CSS/Table.css'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';

export const Seasons = () => {
  const [showSeason, setShowSeason] = useState("2022 Summer");
  const seasons = ["2022 LCK 서머", "2022 LCK 스프링", "2021 LCK 서머"];
  const ChangeSeason = (e) => {
    setShowSeason(e.target.innerText);
  }

  return (
    <div className='seasonDiv'>
      <div>{showSeason}</div>
      <div className="mb-2 start">
        <DropdownButton as={ButtonGroup} key="start"
          id="dropdown-button-drop-start" drop="start"
          variant="secondary" title="시즌">
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
        </DropdownButton>
      </div>
    </div>
  )
}

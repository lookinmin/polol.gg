import React from 'react'
import "./CSS/HomeCSS.css"
import axios from 'axios'

export const Home = () => {
  return (
    <div className='wrapper'>
      <div className="above">
        <div className="date-title">
          <p id='calendar-title'>LCK </p>
          <p id='small-title'>TimeLine</p>
        </div>

        <div className="calendar">
          <h1>달력</h1>
        </div>

        <div className="match">
          <p id='match_title'>Today's Match</p>
        </div>

        <div className="today_match">
          <div className='match1'>
            <div className="mat_top">
              <p className="ti" id='m1'>Match 1</p>
              <p className='time' id="t1"> 17 : 00 </p>
            </div>
           
          </div>

          <div className='match2'>
            <div className="mat_top">
              <p className="ti" id='m2'>Match 2</p>
              <p className='time' id="t2"> 20 : 00 </p>
            </div>
          </div>

          
        </div>
      </div>
      
      <div className="under">
        
      </div>
      
    </div>
  )
}

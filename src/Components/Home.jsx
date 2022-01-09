import React from 'react'
import "./CSS/HomeCSS.css"
import { MyCalendar } from './MyCalendar';
import axios from 'axios'
import {
  Link,
  NavLink
} from "react-router-dom";

export const Home = () => {
  return (
    <div className='wrapper'>
      <div className="above">
        <div className="date-title">
          <a href='https://thefutureoflck.com/'><img src='img/LCK_whitesmoke.png' width="70px" height="auto"/></a>
          <p id='calendar-title'>LCK </p>
          <p id='small-title'>TimeLine</p>
        </div>

        <div className="calendar">
          <MyCalendar/>
        </div>

        <div className="match">
          <p id='match_title'>TODAY's Match</p>
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
        <h2 className="undertitle" id='POLOL'>POLOL.GG</h2>

        <div className="expla">
          <p id="ex">POLOL.GG는 머신러닝을 통해 LCK 경기 결과 및 순위를 예측하는 WebSite입니다.</p>
        </div>

        <div className='menuList'>
          <NavLink className="lists" to="/predict" title="예측 페이지 이동">AI PREDICT</NavLink>
          <NavLink className="lists" to="/table" title="순위 페이지 이동">RANK</NavLink>
          <NavLink className="lists" to="/team" title="팀 정보 페이지 이동">TEAM</NavLink>
          <NavLink className="lists" to="/players" title="선수 정보 페이지 이동">PLAYERS</NavLink>
        </div>
        <div className="images" >
          <a href="https://github.com/lookinmin/polol.gg" target="_blank">
            <img src="img/github.png" width="45px" height="45px" title='개발자 GitHub'/>
          </a>

          <img src="img/gmail.png" width="45px" height="45px" title='개발자 email : sncalphs@gmail.com'/>
          
          <a href="https://www.instagram.com/lookin_min/" target="_blank">
            <img src="img/instagram.png" width="45px" height="45px" title='개발자 Instagram'></img>
          </a>
        </div>

        <div className='Copyright'>
          <p id="copy1">@Copyright 2021 M&G Company</p>
          <p id="copy2">All Rights Reserved </p>
        </div>
      </div>
      
    </div>
  )
}

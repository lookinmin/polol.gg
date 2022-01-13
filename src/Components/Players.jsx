import React, { useState, useEffect } from 'react';
import { PlayersRankTable } from './PlayersRankTable';
import { Positions } from './Positions';
import './CSS/Player.css'
import { useSelector } from 'react-redux';

var moreTable1 = <tr />
var moreTable2 = <tr />
var moreTable3 = <tr />
var moreTable4 = <tr />

export const Players = () => {
  const [times, setTimes] = useState(1);
  const [click, setClick] = useState(0);
  const [position, setPosition] = useState("ALL");

  const choosePosition = (pick) => {
    setPosition(pick);
  }

  if (position !== "ALL") {
    moreTable1 = <tr />
    moreTable2 = <tr />
    moreTable3 = <tr />
    moreTable4 = <tr />
  }
  else{
    switch (click) {
      case 1:
        moreTable1 = Array.from({ length: 14 }, (v, i) =>
          <PlayersRankTable rank={(times + i)} key={i + 1} />)
        break;
      case 2:
        moreTable2 = Array.from({ length: 14 }, (v, i) =>
          <PlayersRankTable rank={(times + i)} key={i + 1} />)
        break;
      case 3:
        moreTable3 = Array.from({ length: 14 }, (v, i) =>
          <PlayersRankTable rank={(times + i)} key={i + 1} />)
        break;
      case 4:
        moreTable4 = Array.from({ length: 14 }, (v, i) =>
          <PlayersRankTable rank={(times + i)} key={i + 1} />)
        break;
      default:
        break;
    }
  }

  const addTable = () => {
    setTimes(times + 14);
    setClick(click + 1);
    if (times > 56) {
      setTimes(56);
    }
  }

  const moreBtn = (position === "ALL") ?
    <button className='Morebtn' onClick={addTable}>더보기</button>
    : <div />

  return (
    <div style={{ background: "whitesmoke" }}>
      <div style={{ padding: "3% 15%" }}>
        <Positions choosePosition={choosePosition}/>
        <table className="table table-striped">
          <thead className="table-dark playerTableThead"W>
            <tr className='playerTableTr'>
              <th scope="col" className='rank'>
                <div>순위</div>
                <div></div>
              </th>
              <th scope="col" className='playerTableTh'>포지션</th>
              <th scope="col" className='playerTableTh'>KDA</th>
              <th scope="col" className='playerTableTh'>킬</th>
              <th scope="col" className='playerTableTh'>데스</th>
              <th scope="col" className='playerTableTh'>어시스트</th>
              <th scope="col" className='playerTableTh'>킬</th>
              <th scope="col" className='playerTableTh'>킬관여율</th>
              <th scope="col" className='playerTableTh'>소속팀</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.from({ length: 14 }, (v, i) =>
                <PlayersRankTable rank={(i + 1)} key={i + 1} />)
            }
            {moreTable1}
            {moreTable2}
            {moreTable3}
            {moreTable4}
          </tbody>
        </table>
        {moreBtn}
      </div>
    </div>
  )
}
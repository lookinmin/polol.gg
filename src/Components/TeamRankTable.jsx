import React, { useEffect, useState } from 'react'
import './CSS/Table.css';


export const TeamRankTable = ({rank, data}) => {
  return (
    <tr className='teamTableTr'>
      <th scope="row" className='rankLogo'>
        <div>{rank}</div>
        <div><img className='img' src={data.teamName}/></div>
      </th>
      <td className='teamTableTd'>{data.win}</td>
      <td className='teamTableTd'>{data.lose}</td>
      <td className='teamTableTd'>{data.diff}</td>
      <td className='teamTableTd'>{data.winRate}%</td>
      <td className='teamTableTd'>{data.kda}</td>
      <td className='teamTableTd'>{data.preRank}</td>
      <td className='teamTableTd'>{data.preWinRate}%</td>
    </tr>
  )
}
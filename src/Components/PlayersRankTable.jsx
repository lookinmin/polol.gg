import React from 'react'
import './CSS/Table.css';

export const PlayersRankTable = ({rank}) => {
  return (
    <tr className='tableTr'>
      <th scope="row" className='playerRank'>
        <div>{rank}</div>
        <div><img className='playerImg' src="img/T1.png"/></div>
      </th>
      <td className='tableTd'>123</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'><img className='teamImg' src="img/KT.PNG"/></td>
    </tr>
  )
}
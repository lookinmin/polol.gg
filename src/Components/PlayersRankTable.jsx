import React from 'react'
import './CSS/Table.css';

export const PlayersRankTable = ({rank}) => {
  return (
    <tr className='playerTableTr'>
      <th scope="row" className='playerRank'>
        <div>{rank}</div>
        <div><img className='playerImg' src="img/T1.png"/></div>
      </th>
      <td className='playerTableTd'>123</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'>-</td>
      <td className='playerTableTd'><img className='teamImg' src="img/KT.PNG"/></td>
    </tr>
  )
}
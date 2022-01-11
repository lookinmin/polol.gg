import React from 'react'
import './CSS/Table.css';


export const TeamRankTable = ({rank}) => {
  return (
    <tr className='teamTableTr'>
      <th scope="row" className='rankLogo'>
        <div>{rank}</div>
        <div><img className='img' src="img/T1.png"/></div>
      </th>
      <td className='teamTableTd'>123</td>
      <td className='teamTableTd'>-</td>
      <td className='teamTableTd'>-</td>
      <td className='teamTableTd'>-</td>
      <td className='teamTableTd'>-</td>
    </tr>
  )
}
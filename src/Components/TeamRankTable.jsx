import React from 'react'
import './CSS/Table.css';


export const TeamRankTable = ({rank}) => {
  return (
    <tr className='tableTr'>
      <th scope="row" className='rankLogo'>
        <div>{rank}</div>
        <div><img className='img' src="img/T1.png"/></div>
      </th>
      <td className='tableTd'>123</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
      <td className='tableTd'>-</td>
    </tr>
  )
}
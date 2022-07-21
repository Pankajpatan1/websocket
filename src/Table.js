import React from 'react'
import './Table.css';

function Table({data}) {
  return (
    <div className="fixTableHead">
    <table>
      <thead>
        <th>Symbol</th>
        <th>Description</th>
        <th>Underlying Asset</th>
        <th>Mark Price</th>
      </thead>
      {data.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.symbol}</td>
            <td>{val.description}</td>
            <td>{val.underlying_asset?.symbol}</td>
            <td>{val.mark_price}</td>
          </tr>
        )
      })}
    </table>
  </div>
  )
}

export default Table
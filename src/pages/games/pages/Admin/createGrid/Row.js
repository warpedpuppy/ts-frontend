import React from 'react'
import Cell from './Cell'
import './Row.css'

export default function Row (props) {
  const { walls, c, rowval } = props
  const wallString = JSON.stringify(walls)
  const row = []
  for (let i = 0; i < c; i += 1) {
    const temp = JSON.stringify([rowval, i])
    const wallBoolean = (wallString) ? wallString.includes(temp) : false
    row.push(<Cell
      cellval={i}
      key={i}
      wallBoolean={wallBoolean}
      {...props}
    />)
  }
  return (
    <div className="row">
      { row }
    </div>
  )
}

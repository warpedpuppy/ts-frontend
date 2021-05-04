import React from 'react'
import './Grid.css'
import Row from './Row'

export default class Grid extends React.Component {
  render () {
    const grid = []
    for (let i = 0; i < this.props.r; i++) {
      grid.push(
        <Row
          key={i}
          rowval={i}
          {...this.props}
        />
      )
    }
    return (
      <div className="gridCont">{grid}</div>
    )
  }
}
Grid.propTypes = {
  r: Number
}

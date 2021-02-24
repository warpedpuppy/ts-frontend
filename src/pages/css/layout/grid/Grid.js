import React, { Component } from 'react';
import './Grid.css';
export default class Grid extends Component {

  arr = [1,2,3,4,5,6,7,8,9,10,11,12]
  render() {
    return (
      <div>
      <div className="grid-parent">
        {
          this.arr.map( (item, index) => {
            return <div key={index}>{item}</div>
          })
        }
      </div>
    </div>
    );
  }
}

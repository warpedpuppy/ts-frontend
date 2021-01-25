import React, { Component } from 'react';
import './HexPicker.css';
export default class HexPicker extends Component {
  state = {
      arr: '0123456789ABCDEF'.split('')
  }

  render() {
      let style = {
          width: `${this.props.boxSize}px`,
          height: `${this.props.boxSize}px`
      }
    return (
      <div className="hex-picker"> 
         {
             this.state.arr.map((item, index) => <div style={style} onClick={(e) => this.props.clickHandler(e, index, item, this.props.n)} key={index}>{item}</div>)
         }
      </div>
    );
  }
}

import React, { Component } from 'react';
import './HexPicker.css';
export default class HexPicker extends Component {
  state = {
      arr: '0123456789ABCDEF'.split('')
  }

  render() {
    return (
      <div className="hex-picker"> 
         {
             this.state.arr.map((item, index) => <div onClick={() => this.props.clickHandler(item)} key={index}>{item}</div>)
         }
      </div>
    );
  }
}

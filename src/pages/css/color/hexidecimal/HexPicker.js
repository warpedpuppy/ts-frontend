import React, { Component } from 'react';
import './HexPicker.css';
export default class HexPicker extends Component {
  state = {
      arr: '0123456789ABCDEF'.split('')
  }

  render() { 
    let topValue = this.props.boxSize * this.state.arr.indexOf(this.props.currentHexValue);
      let style = {
          width: `${this.props.boxSize}px`,
          height: `${this.props.boxSize}px`,
          color: 'white', 
          backgroundColor: this.props.color
      }
      let style2 = {
        left: `-${topValue}px`
      }
    return (
      
      <div className="hex-picker" style={style2}> 
         {
             this.state.arr.map((item, index) => <div style={style} onClick={(e) => this.props.clickHandler(e, index, item, this.props.n)} key={index}>{item}</div>)
         }
      </div>
    );
  }
}

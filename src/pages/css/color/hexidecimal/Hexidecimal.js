import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './Hexidecimal.css'
import { cacheSlot } from '@apollo/client/cache';
export default class Hexidecimal extends Component {
  state = {
    hex: "000000",
    boxSize: 20
  }
  clickHandler = (e, index, value, n) => {
    console.log(e.target.parentElement, e.currentTarget)
    let val = index * this.state.boxSize;
    console.log(index, value, n)
    e.target.parentElement.style.top = `-${val}px`;
    let arr = this.state.hex.split('')
    console.log(arr)
    arr[parseInt(n, 10)] = value;
    console.log(arr);
    let str = arr.join('')
    console.log(str)
    this.setState({hex: str})
  }
  render() {
    let style = {
      backgroundColor: `#${this.state.hex}`
    }
    let width = 6 * this.state.boxSize;
    let windowStyle = {
      height: `${this.state.boxSize}px`,
      width: `${width}px`,
    }
    return (
      <div className="hexidecimal-page">
        <div className="hexidecimal">
          <div className="hexidecimal-window" style={windowStyle}></div>
          <HexPicker clickHandler={this.clickHandler} n="0" boxSize={this.state.boxSize} /> 
          <HexPicker clickHandler={this.clickHandler} n="1" boxSize={this.state.boxSize} /> 
          <HexPicker clickHandler={this.clickHandler} n="2" boxSize={this.state.boxSize} /> 
          <HexPicker clickHandler={this.clickHandler} n="3" boxSize={this.state.boxSize} /> 
          <HexPicker clickHandler={this.clickHandler} n="4" boxSize={this.state.boxSize} /> 
          <HexPicker clickHandler={this.clickHandler} n="5" boxSize={this.state.boxSize} /> 
        </div>
        <div style={style} className="hexidecimal-color"></div>
      </div>
    );
  }
}

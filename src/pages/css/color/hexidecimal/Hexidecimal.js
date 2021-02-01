import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './Hexidecimal.css'
import HexCreator from './HexCreator';
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
    arr[parseInt(n, 10)] = value;
    let str = arr.join('')
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
        <HexCreator windowStyle={windowStyle} boxSize={this.state.boxSize} clickHandler={this.clickHandler} /> 
        <div style={style} className="hexidecimal-color"></div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './Hexidecimal.css'
import HexCreator from './HexCreator';
export default class Hexidecimal extends Component {
  state = {
    hex: "FF00FF",
    boxSize: 20
  }
  clickHandler = (e, index, value, n) => {
    let val = index * this.state.boxSize;
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
        <div className="hex-creator" >
          <HexCreator 
            currentHex={this.state.hex} 
            windowStyle={windowStyle} 
            boxSize={this.state.boxSize} 
            clickHandler={this.clickHandler} 
            /> 
          <div style={style} className="hexidecimal-color"></div>
        </div>
        {/* <div className="hex-comments">
          <p>Hex is similar to RGB in that you are using three units: red, green and blue.  But with hex we are using base 16 to express it.</p>
          <p>Hex codes are sometimes written in shorthand using three characters if the values are repeated. So "FF00FF" can become "F0F".</p>

        </div> */}
      </div>
    );
  }
}

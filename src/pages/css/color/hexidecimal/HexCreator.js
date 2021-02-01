import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './HexCreator.css';
export default class HexCreator extends Component {
  render() {
    let windowStyle = {
        height: `${this.props.windowStyle.boxSize}px`,
        width: `${this.props.windowStyle.width}px`,
      }
    return (
        <div className="hexidecimal-creator">
            <div className="hexidecimal-window" style={this.props.windowStyle}></div>
            <HexPicker clickHandler={this.props.clickHandler} n="0" boxSize={this.props.boxSize} /> 
            <HexPicker clickHandler={this.props.clickHandler} n="1" boxSize={this.props.boxSize} /> 
            <HexPicker clickHandler={this.props.clickHandler} n="2" boxSize={this.props.boxSize} /> 
            <HexPicker clickHandler={this.props.clickHandler} n="3" boxSize={this.props.boxSize} /> 
            <HexPicker clickHandler={this.props.clickHandler} n="4" boxSize={this.props.boxSize} /> 
            <HexPicker clickHandler={this.props.clickHandler} n="5" boxSize={this.props.boxSize} /> 
      </div>
    );
  }
}

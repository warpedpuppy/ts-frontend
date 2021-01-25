import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './Hexidecimal.css'
export default class Hexidecimal extends Component {

  clickHandler = (id, item) => {
    console.log(id)
  }
  render() {
    return (
      <div className="hexidecimal">
        <div className="hexidecimal-window"></div>
        <HexPicker clickHandler={this.clickHandler} /> 
        <HexPicker clickHandler={this.clickHandler} /> 
        <HexPicker clickHandler={this.clickHandler} /> 
        <HexPicker clickHandler={this.clickHandler} /> 
        <HexPicker clickHandler={this.clickHandler} /> 
        <HexPicker clickHandler={this.clickHandler} /> 
      </div>
    );
  }
}

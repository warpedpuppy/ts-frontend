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
          {
            this.props.currentHex.split('').map( (item, index) => {
              return <HexPicker
                        currentHexValue={item} 
                        key={index} 
                        clickHandler={this.props.clickHandler} 
                        n={index} 
                        boxSize={this.props.boxSize} 
                        color={['red', 'red', 'green', 'green', 'blue', 'blue'][index]} /> 
            })
          }
      </div>
    );
  }
}

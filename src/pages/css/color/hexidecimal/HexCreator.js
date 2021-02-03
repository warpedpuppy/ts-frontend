import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './HexCreator.css';
export default class HexCreator extends Component {


  render() { 
   
    let containerStyle = {
     
        width: `${this.props.backgroundWidth}px`
    }
    return (
      <div className="hexidecimal-creator" style={containerStyle}>
        <div className="hexidecimal-creator-inner">
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
      </div>
    );
  }
}

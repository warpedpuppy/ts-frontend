import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './HexCreator.css';
import AppContext from '../../../../AppContext';
export default class HexCreator extends Component {


  render() { 
    let containerStyle = {
        width: this.context.browserWidth > 800 ? `${31 * this.props.boxSize}px` : `${6 * this.props.boxSize}px`,
        height: this.context.browserWidth > 800 ? `${6 * this.props.boxSize}px` : `${31 * this.props.boxSize}px`
    }
    return (
      <div className="hexadecimal-creator" style={containerStyle}>
        <div className="hexadecimal-creator-inner">
          <div className="hexadecimal-window" style={this.props.windowStyle}></div>
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
HexCreator.contextType = AppContext
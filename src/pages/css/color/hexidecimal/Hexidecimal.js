import React, { Component } from 'react';
import HexPicker from './HexPicker';
import './Hexidecimal.css'
import HexCreator from './HexCreator';
import {Form, Button} from 'react-bootstrap'
export default class Hexidecimal extends Component {
  state = {
    hex: "FF00FF",
    boxSize: 20,
    activeState: 'manual',
    timerObject: undefined
  }
  clickHandler = (e, index, value, n) => {
    if (this.state.activeState !== 'manual') return
    let val = index * this.state.boxSize;
    e.target.parentElement.style.left = `-${val}px`;
    let arr = this.state.hex.split('')
    arr[parseInt(n, 10)] = value;
    let str = arr.join('')
    this.setState({hex: str})
  }
  change = (e) => {
      if (e.target.value === 'random') {
        this.chooseRandomHex();
        clearInterval(this.state.timerObject)
      } else if (e.target.value === 'change') {
        let obj = setInterval(() => this.chooseRandomHex(), 1000)
        this.setState({timerObject: obj})
      } else {
        clearInterval(this.state.timerObject)
      }
      this.setState({activeState: e.target.value})
  }
  chooseRandomHex = (e) => {
    if (e) e.preventDefault();
    let str = '0123456789ABCDEF';
    let arr = [];
    for (let i = 0; i < 6; i ++) {
      arr.push(str.charAt(Math.floor(Math.random() * str.length)))
    }
     this.setState({hex:arr.join('')});
  }
  render() {
    let style = {
      backgroundColor: `#${this.state.hex}`
    }
   
    let width = 6 * this.state.boxSize;
    let backgroundWidth = 32 * this.state.boxSize;

    let windowStyle = {
      height: `${width}px`,
      width: `${this.state.boxSize}px`,
    }
    const {activeState } = this.state;
   
    return (
      <div className="hexidecimal-page">
        <Form>
            <Form.Check 
            type='radio' 
            name='hex' 
            value='manual'
            id='manual'
            onChange={this.change}
            checked={activeState === 'manual' ? 'checked' : ''} 
            label={`manual`} />

            <Form.Check 
            type='radio' 
            name='hex' 
            value='change' 
            id='change'
            onChange={this.change}
            checked={activeState === 'change' ? 'checked' : ''} 
            label={`change every second`} 
            />

            <Form.Check 
            type='radio' 
            name='hex' 
            id='random'
            value='random' 
            onChange={this.change}
            checked={activeState === 'random' ? 'checked' : ''} 
            label={`choose random`} 
            />
            { this.state.activeState === 'random' ?   <Button size="sm" onClick={this.chooseRandomHex} variant="outline-success">choose new random color</Button> : ''}
        </Form>
        <div  style={style} className="hex-creator-container">
          <HexCreator 
            backgroundWidth={backgroundWidth}
            currentHex={this.state.hex} 
            windowStyle={windowStyle} 
            boxSize={this.state.boxSize} 
            clickHandler={this.clickHandler} 
            /> 
         
        </div>
      </div>
    );
  }
}

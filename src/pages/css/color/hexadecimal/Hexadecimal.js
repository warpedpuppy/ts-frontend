import React, { Component } from 'react';
import './Hexadecimal.css'
import HexCreator from './HexCreator';
import {Form, Button} from 'react-bootstrap'
import AppContext from '../../../../AppContext';
export default class Hexadecimal extends Component {
  state = {
    hex: "FF00FF",
    boxSize: 20,
    activeState: 'change'
  }
  intervalObject = undefined;
  componentDidMount = () => {
    this.change({target: {value: this.state.activeState}})
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalObject)
  }

  clickHandler = (e, index, value, n) => {
    if (this.state.activeState !== 'manual') return
    let val = index * this.state.boxSize;
    let property = this.context.browserWidth > 800 ? 'left' : 'top' ;
    e.target.parentElement.style[property] = `-${val}px`;
    let arr = this.state.hex.split('')
    arr[parseInt(n, 10)] = value;
    let str = arr.join('')
    this.setState({hex: str})
  }
  change = (e) => {
      if (e.target.value === 'random') {
        this.chooseRandomHex();
        clearInterval(this.intervalObject)
      } else if (e.target.value === 'change') {
        this.intervalObject = setInterval(() => this.chooseRandomHex(), 2000)
      } else {
        clearInterval(this.intervalObject)
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
   

    let windowStyle = {
      height: this.context.browserWidth > 800 ? `${width}px` : `${this.state.boxSize}px`,
      width:  this.context.browserWidth > 800 ? `${this.state.boxSize}px` : `${width}px`,
    }
    const {activeState } = this.state;
   
    return (
      <div className="hexadecimal-page" style={style}>
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
            label={`change every two seconds`} 
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
        <div className="hex-creator-container">
          <HexCreator 
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
Hexadecimal.contextType = AppContext;
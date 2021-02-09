import React, { Component } from 'react';
import './RGB.css';
import {Form, Button} from 'react-bootstrap'
export default class RGB extends Component {
  state = {r:0, g: 0, b: 0, activeState: 'manual', timerObject: undefined}
  arr = [...Array(251).keys()]
  componentDidMount = () => {
      this.chooseRandomRBG();
  }
  changeColor = (e) => {
     let obj = {};
     obj[e.target.name] = parseInt(e.target.value, 10);
     this.setState(obj)
     
  }
  chooseRandomRBG = () => {
    this.setState({r: this.random(), g: this.random(), b: this.random()})
  }
  random = () =>{
      return Math.floor(Math.random() * 250)
  }
  change = (e) => {
      if (e.target.value === 'random') {
        this.chooseRandomRBG();
        clearInterval(this.state.timerObject)
      } else if (e.target.value === 'change') {
        let obj = setInterval(() => this.chooseRandomRBG(), 2000)
        this.setState({timerObject: obj})
      } else {
        clearInterval(this.state.timerObject)
      }
      this.setState({activeState: e.target.value})
  }
  render() {
    let { r, g, b, activeState } = this.state;
    let style = {
        backgroundColor: `rgb(${r},${g},${b})`
    }
    let disabled = this.state.activeState !== 'manual' ? true : false ;
    return (
      <div className="rgb-page" style={style}> 
        <div className="rgb-controls">
          <h4>RGB</h4>
          <label>red:</label>
          <input value={r} type='number' min="0" max="255" name="r" disabled={disabled} onChange={this.changeColor} />
          <label>green:</label>
          <input value={g} type='number' min="0" max="255" name="g" disabled={disabled} onChange={this.changeColor} />
          <label>blue:</label>
          <input value={b} type='number' min="0" max="255" name="b" disabled={disabled} onChange={this.changeColor} />
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
            { this.state.activeState === 'random' ?   <Button size="sm" onClick={this.chooseRandomRBG} variant="success">choose new random color</Button> : ''}
        </Form>
        </div>
      </div>
    );
  }
}

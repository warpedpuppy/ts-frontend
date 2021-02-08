import React, { Component } from 'react';
import './RGB.css'
export default class RGB extends Component {
  state = {r:0, g: 0, b: 0}
  arr = [...Array(251).keys()]
  componentDidMount = () => {
      this.setState({r: this.random(), g: this.random(), b: this.random()})
  }
  changeColor = (e) => {
     let obj = {};
     obj[e.target.name] = parseInt(e.target.value, 10);
     this.setState(obj)
     
  }
  random = () =>{
      return Math.floor(Math.random() * 250)
  }
  render() {
    let {r,g,b} = this.state;
    let style = {
        backgroundColor: `rgb(${r},${g},${b})`
    }
    return (
      <div className="rgb-page" style={style}> 
        <div className="rgb-controls">
          <h4>RGB</h4>
          <label>red:</label>
          <input value={r} type='number' min="0" max="255" name="r" onChange={this.changeColor} />
          <label>green:</label>
          <input value={g} type='number' min="0" max="255" name="g" onChange={this.changeColor} />
          <label>blue:</label>
          <input value={b} type='number' min="0" max="255" name="b" onChange={this.changeColor} />
        </div>
      </div>
    );
  }
}

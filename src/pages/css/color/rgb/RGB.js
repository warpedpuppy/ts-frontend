import React, { Component } from 'react';
import './RGB.css'
import RBGSlider from './RBGSlider';
export default class RGB extends Component {
  state = {r: 0, g: 0, b: 0}
  arr = [...Array(251).keys()]
  changeColor = (id, val) => {
      console.log(val, id)
      let newObj = Object.assign(this.state)
      newObj[id] = parseInt(val, 10)
     this.setState(newObj, () => console.log(this.state))
     // this.setState({rgb: })
  }
  render() {
    let {r,g,b} = this.state;
    let style = {
        backgroundColor: `rgb(${r},${g},${b})`
    }
    return (
      <div> RGB 
          <RBGSlider arr={this.arr} id="r" changeColor={this.changeColor} />
          <RBGSlider arr={this.arr} id="g" changeColor={this.changeColor} />
          <RBGSlider arr={this.arr} id="b" changeColor={this.changeColor} />
          <div className="rgb-product" style={style}></div>
      </div>
    );
  }
}

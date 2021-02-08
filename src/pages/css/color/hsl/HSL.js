import React, { Component } from 'react';
import './HSL.css'
export default class HSL extends Component {

  state = {
    hueRotation: 0,
    saturation: 100,
    lightness: 50,
    hueSpinObject: undefined
  }
  componentDidMount = () => {
    this.setState({hueSpinObject: setInterval(this.spinHandler, 50)})
  }
  componentWillUnmount = () => {
    clearInterval(this.state.hueSpinObject);
  }
  spinHandler = () => {
    this.setState({
        hueRotation: this.state.hueRotation <= 360 ? this.state.hueRotation + 1 : 0
    })
    // document.querySelector("body").style.backgroundColor = `hsl(${this.state.hueRotation}, ${this.state.saturation}%, ${this.state.lightness}%)`
  }  
  changeHandler = (e, str) => {
    let obj ={};
    obj[str] = e.target.value;
    this.setState(obj)
  }

  render() {
    let hueStyle = {
        transform: `rotate(${this.state.hueRotation}deg)`
    }
    let saturationStyle = {
        height: `${this.state.saturation}%`
    }
    let lightnessStyle = {
        height: `${this.state.lightness}%`
    }
    let colorProduct = {
        backgroundColor: `hsl(${this.state.hueRotation}, ${this.state.saturation}%, ${this.state.lightness}%)`
    }
    return (
      <div className="hsl-container" style={colorProduct}>
        <section className="hsl-controls">
            <fieldset><legend>hue</legend>
                <div className="hue-spinner" style={hueStyle}>
                    <div></div>
                </div>
                <div>{this.state.hueRotation}</div>  
            </fieldset>
            <fieldset><legend>saturation</legend>
                <div className="saturation-bar">
                    <div style={saturationStyle}></div>
                </div>
                <select onChange={e => this.changeHandler(e, 'saturation')}>
                  {
                    [...Array(100).keys()].map( item => {
                      let adjusted = item + 1;
                      let selected = adjusted === this.state.saturation ? true : false
                      return <option defaultValue={adjusted} key={adjusted} selected={selected}>{adjusted}</option>
                    })
                  }
                </select>
            
            </fieldset>
            <fieldset><legend>lightness</legend>
                <div className="saturation-bar">
                    <div style={lightnessStyle}></div>
                </div>
                <select onChange={e => this.changeHandler(e, 'lightness')}>
                  {
                    [...Array(100).keys()].map( item => {
                      let adjusted = item + 1;
                      let selected = adjusted === this.state.lightness ? true : false
                      return <option defaultValue={adjusted} key={adjusted} selected={selected}>{adjusted}</option>
                    })
                  }
                </select>
            </fieldset>
        </section>
        <div className="color-result" ></div>
      </div>
    );
  }
}

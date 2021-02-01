import React, { Component } from 'react';
import './HSL.css'
export default class HSL extends Component {

  state = {
    hueRotation: 0,
    saturation: 50,
    lightness: 0,
    hueSpinObject: undefined
  }
  spinHandler = () => {
    this.setState({
        hueRotation: this.state.hueRotation <= 360 ? this.state.hueRotation + 1 : 0,
        saturation: this.state.saturation <= 100 ? this.state.saturation + 1 : 0,
        lightness: this.state.lightness <= 100 ? this.state.lightness + 0.5 : 0,
    })
    // document.querySelector("body").style.backgroundColor = `hsl(${this.state.hueRotation}, ${this.state.saturation}%, ${this.state.lightness}%)`
  }  
  componentDidMount = () => {
    this.state.hueSpinObject = setInterval(this.spinHandler, 50)
  }
  componentWillUnmount = () => {
    clearInterval(this.state.hueSpinObject);
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
      <div>
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
                <div>{this.state.saturation}</div>  
            </fieldset>
            <fieldset><legend>lightness</legend>
                <div className="saturation-bar">
                    <div style={lightnessStyle}></div>
                </div>
                <div>{Math.floor(this.state.lightness)}</div>  
            </fieldset>
        </section>
        <div className="color-result" style={colorProduct}></div>
      </div>
    );
  }
}

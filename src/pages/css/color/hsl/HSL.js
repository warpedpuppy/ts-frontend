import React, { Component } from 'react';
import './HSL.css'
export default class HSL extends Component {

  state = {
    hueRotation: 0,
    saturation: 50,
    lightness: 100,
    hueSpinObject: undefined
  }
  spinHandler = () => {
    this.setState({
        hueRotation: this.state.hueRotation <= 360 ? this.state.hueRotation + 1 : 0,
        saturation: 100,
        lightness: 50,
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
                <div>{Math.floor(this.state.saturation)}</div>  
            </fieldset>
            <fieldset><legend>lightness</legend>
                <div className="saturation-bar">
                    <div style={lightnessStyle}></div>
                </div>
                <div>{Math.floor(this.state.lightness)}</div>  
            </fieldset>
        </section>
        <div className="color-result" ></div>
      </div>
    );
  }
}

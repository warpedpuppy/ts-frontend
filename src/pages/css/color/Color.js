import React, { Component } from 'react';
import Hexadecimal from './hexadecimal/Hexadecimal';
import HSL from './hsl/HSL';
import RGB from './rgb/RGB';
import PageLayout from '../../../components/layout-templates/PageLayout';
export default class Color extends Component {
  state = {
    active: 'hexadecimal',
    buttons: ['hexadecimal', 'hsl', 'rgb']
  }
  onChange = (active) => {   
   this.setState({active})
  }
  render() {
    let activeComponent;
    if (this.state.active === 'hexadecimal') {
      activeComponent = <Hexadecimal />
    } else if (this.state.active === 'hsl') {
      activeComponent = <HSL />
    } else {
      activeComponent = <RGB />
    }
    return <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} activeComponent={activeComponent} />
  }
}

import React, { Component } from 'react';
import '../../../sitewide-css/page-layout-with-menu.css';
import Hexadecimal from './hexadecimal/Hexadecimal';
import HSL from './hsl/HSL';
import RGB from './rgb/RGB';
import PageLayout from '../../../components/PageLayout';
export default class Color extends Component {
  state = {
    active: 'hexadecimal',
    buttons: ['hexadecimal', 'hsl', 'rgb']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {
    let active;
    if (this.state.active === 'hexadecimal') {
      active = <Hexadecimal />
    } else if (this.state.active === 'hsl') {
      active = <HSL />
    } else {
      active = <RGB />
    }
    return <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} active={active} />
  }
}

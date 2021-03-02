import React, { Component } from 'react';
import PageLayout from '../../components/layout-templates/PageLayout';
import Operators from './operators/Operators';

export default class DBS extends Component {
  state = {
    active: 'operators',
    buttons: ['operators', 'isNaN', 'current target v target', 'functional v OOP', 'maze solver code']
  }

  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {
    let active;
    if (this.state.active === 'operators') {
      active = <Operators />
    }
    return <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} active={active} />
  }
}

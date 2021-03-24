import React, { Component } from 'react';
import PageLayout from '../../components/layout-templates/PageLayout';
import Operators from './operators/Operators';
import RecursivePermutation from './RecursivePermutation';
export default class DBS extends Component {
  state = {
    active: 'operators',
    buttons: ['operators', 'isNaN', 'current target v target', 'functional v OOP', 'maze solver code', 'object pooling', 'recursive permutation']
  }

  onChange = (active) => {   
   this.setState({active})
  }
  render() {
    let active;
    if (this.state.active === 'operators') {
      active = <Operators />
    } else {
      active = <RecursivePermutation />
    }
    return <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} active={active} />
  }
}

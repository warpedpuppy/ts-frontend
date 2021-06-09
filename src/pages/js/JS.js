import React, { Component } from 'react';
import PageLayout from '../../components/layout-templates/PageLayout';
import MazeSolver from './mazeSolver/MazeSolver';
import RecursivePermutation from './recursivePermutation/RecursivePermutation';
import ObjectPooling from './objectPooling/ObjectPooling';
export default class DBS extends Component {
  state = {
    active: 'maze solver code',
    buttons: ['maze solver code', 'recursive permutation', 'object pooling']
  }

  onChange = (active) => {   
   this.setState({active})
  }
  render() {
    let active;
    if (this.state.active === 'maze solver code') {
      active = <MazeSolver />
    } else if (this.state.active === 'recursive permutation') {
      active = <RecursivePermutation />
    } else {
      active = <ObjectPooling />
    }
    return (
    <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} activeComponent={active} />
    )
  }
}

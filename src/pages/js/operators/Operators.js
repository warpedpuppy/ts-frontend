import React, { Component } from 'react';
import Submenu from '../../../components/layout-templates/SubMenu';
import PlusPlus from './PlusPlus';
export default class Operators extends Component {

    state = {
        active: '++',
        categories: ['++']
      }
      clickHandler = (e) => {
        this.setState({active: e.target.innerHTML})
      }
  render() {
    let active;
    if (this.state.active === '++') {
        active = <PlusPlus />
    }
    return (
      <div> 
        <Submenu title={`operators - ${this.state.active}`} menuItems={this.state.categories} onChange={this.clickHandler} /> 
        { active }
      </div>
    );
  }
}

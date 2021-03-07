import React, { Component } from 'react';
import Submenu from '../../components/layout-templates/SubMenu';
import CRUD from './crud/CRUD';
import JoinPopulate from './JoinPopulate';

export default class DBS extends Component {
  state = {
    active: 'crud',
    categories: ['crud', 'join/populate', 'relational / non relational', 'performance', 'browser storage']
  }

  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {
    let active;
    if (this.state.active === 'crud') {
      active = <CRUD />
    } else if (this.state.active === 'join/populate') {
      active = <JoinPopulate />
    }
    return (
      <>
      <Submenu title={`dbs - ${this.state.active}`} menuItems={this.state.categories} onChange={this.onChange} />
      { active }
      </>
    );
  }
}

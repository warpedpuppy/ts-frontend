import React, { Component } from 'react';
import '../../sitewide-css/page-layout-with-menu.css';
import Submenu from '../../components/SubMenu';
import CRUD from './CRUD';
import JoinPopulate from './JoinPopulate';
import Config from '../../config';

import Mutations from './graphql/services/mutations';
export default class DBS extends Component {
  state = {
    active: 'crud',
    categories: ['crud', 'join/populate', 'performance']
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

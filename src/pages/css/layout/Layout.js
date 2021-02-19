import React, { Component } from 'react';
import '../../../sitewide-css/page-layout-with-menu.css';
import Grid from './grid/Grid';
import Flex from './flex/Flex';
import PageLayout from '../../../components/PageLayout';
export default class Layout extends Component {
  state = {
    active: 'flex',
    buttons: ['flex', 'grid']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {

    let active;
    if (this.state.active === 'flex') {
      active = <Flex />
    } else {
      active = <Grid />
    }
    return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} active={active} onChange={this.onChange} />
  }
}

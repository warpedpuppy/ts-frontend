import React, { Component } from 'react';
import Grid from './grid/Grid';
import Flex from './flex/Flex';
import PageLayout from '../../../components/layout-templates/PageLayout';
export default class Layout extends Component {
  state = {
    active: 'grid',
    buttons: ['flex', 'grid']
  }
  onChange = (string) => {   
   this.setState({active: string})
  }
  render() {

    let activeComponent;
    if (this.state.active === 'flex') {
      activeComponent = <Flex />
    } else {
      activeComponent = <Grid />
    }
    return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} activeComponent={activeComponent} onChange={this.onChange} />
  }
}

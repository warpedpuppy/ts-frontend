import React, { Component } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import AbsoluteUnits from './absolute/AbsoluteUnits';
import RelativeUnits from './relative/RelativeUnits';

export default class UnitsOfMeasurement extends Component {
  state = {
    active: 'absolute units',
    buttons: ['absolute units', 'relative units']
  }
  onChange = (active) => {   
   this.setState({active})
  }
  render() {

    let activeComponent;
    if (this.state.active === 'absolute units') {
      activeComponent = <AbsoluteUnits />
    } else {
      activeComponent = <RelativeUnits />
    }
    return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} activeComponent={activeComponent} onChange={this.onChange} />
  }
}

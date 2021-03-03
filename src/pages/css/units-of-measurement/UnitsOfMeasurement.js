import React, { Component } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import AbsoluteUnits from './absolute/AbsoluteUnits';
import RelativeUnits from './relative/RelativeUnits';
import FontSpecific from './font-specific/FontSpecific';
export default class UnitsOfMeasurement extends Component {
  state = {
    active: 'absolute units',
    buttons: ['font-specific', 'absolute units', 'relative units']
  }
  onChange = (active) => {   
   this.setState({active})
  }
  render() {

    let activeComponent;
    if (this.state.active === 'absolute units') {
      activeComponent = <AbsoluteUnits />
    } else if (this.state.active === 'relative units') {
      activeComponent = <RelativeUnits />
    } else {
      activeComponent = <FontSpecific />
    }
    return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} activeComponent={activeComponent} onChange={this.onChange} />
  }
}

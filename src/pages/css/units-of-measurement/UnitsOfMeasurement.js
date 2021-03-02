import React, { Component } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import AbsoluteUnits from './absolute/AbsoluteUnits';
import RelativeUnits from './relative/RelativeUnits';

export default class UnitsOfMeasurement extends Component {
  state = {
    active: 'absolute units',
    buttons: ['absolute units', 'relative units']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {

    let active;
    if (this.state.active === 'absolute units') {
      active = <AbsoluteUnits />
    } else {
      active = <RelativeUnits />
    }
    return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} active={active} onChange={this.onChange} />
  }
}

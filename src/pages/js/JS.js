import React, { Component } from 'react';
import '../../sitewide-css/page-layout-with-menu.css';
import PageLayout from '../../components/layout-templates/PageLayout';
export default class DBS extends Component {
  state = {
    active: 'operators',
    buttons: ['operators', 'isNaN', 'current target v target', 'functional v OOP', 'maze solver code']
  }
  onChange = (e) => {   
   this.setState({active: e.target.innerHTML})
  }
  render() {
    return <PageLayout activeString={this.state.active} buttons={this.state.buttons} onChange={this.onChange} active={undefined} />
  }
}

import React, { Component } from 'react';
import './CSS.css';
import Color from './color/Color';
import Layout from './layout/Layout';
import FontSizing from './font-sizing/FontSizing';
import Submenu from '../../components/layout-templates/SubMenu';
export default class CSS extends Component {
  state = {
    active: 'layout',
    categories: ['color', 'layout', 'font size units']
  }
  clickHandler = (e) => {
    this.setState({active: e.target.innerHTML})
  }
  render() {
    let active;
    if (this.state.active === 'color' ) {
      active =  <Color /> ;
    } else if (this.state.active === 'layout') {
      active = <Layout /> ;
    } else {
      active = <FontSizing />
    }
    return (
      <section className="css-page">
        <Submenu title={`css - ${this.state.active}`} menuItems={this.state.categories} onChange={this.clickHandler} />
        { active }
      </section>
    );
  }
}

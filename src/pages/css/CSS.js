import React, { Component } from 'react';
import './CSS.css';
import Color from './color/Color';
import Layout from './layout/Layout';
import Submenu from '../../components/layout-templates/SubMenu';
export default class CSS extends Component {
  state = {
    active: 'color',
    categories: ['color', 'layout']
  }
  clickHandler = (e) => {
    this.setState({active: e.target.innerHTML})
  }
  render() {
    let active = this.state.active === 'color' ?  <Color />  : <Layout /> ;
    return (
      <section className="css-page">
        <Submenu title={`css - ${this.state.active}`} menuItems={this.state.categories} onChange={this.clickHandler} />
        { active }
      </section>
    );
  }
}

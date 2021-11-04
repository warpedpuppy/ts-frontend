import React, { Component } from 'react';
import './CSS.css';
import Color from './color/Color';
import Layout from './layout/Layout';
import UnitsOfMeasurement from './units-of-measurement/UnitsOfMeasurement';
import Submenu from '../../components/layout-templates/SubMenu';
import Utils from '../../services/Utils';
import CSS_EXPERIMENTS from './css_experiments/CSS_EXPERIMENTS';
import CSSLanding  from './landing/CSSLanding';
export default class CSS extends Component {
  state = {
    active: 'landing',
    categories: ['landing', 'color', 'layout', 'units of measurement', 'experiments']
  }
  componentDidMount = () => {
    let obj = Utils.parseURLVars(this.props.history.location.search);
    if (obj.category) {
      let { category } = obj;
      category.replace(/%20/gi, " ")
      this.setState({active: category})
    }
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
    } else if (this.state.active === 'experiments') {
      active = <CSS_EXPERIMENTS />
    } else if (this.state.active === 'units of measurement') {
      active = <UnitsOfMeasurement />
    } else {
      active = <CSSLanding />
    }
    return (
      <section className="css-page">
        <Submenu 
          active={this.state.active}
          title={`css - ${this.state.active.replace(/%20/gi, " ")}`} 
          menuItems={this.state.categories} 
          onChange={this.clickHandler} />
        { active }
      </section>
    );
  }
}

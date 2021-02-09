import React, { Component } from 'react';
import './CSS.css';
import Color from './color/Color';
import Layout from './layout/Layout';
export default class CSS extends Component {
  state = {active: 'color'}
  clickHandler = (e) => {
    this.setState({active: e.target.innerHTML})
  }
  render() {
    let active = this.state.active === 'color' ?  <Color />  : <Layout /> ;
    return (
      <section className="css-page">
        <h1>css</h1>
        <div className="css-buttons" onClick={this.clickHandler}>color</div>
        <div className="css-buttons" onClick={this.clickHandler}>layout</div>
        { active }
      </section>
    );
  }
}

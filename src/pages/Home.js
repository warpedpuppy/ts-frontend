import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
export default class Home extends Component {

  render() {
    return (
      <>
        <div className="main-menu-ul">
            <h3><Link to="/css">css</Link></h3>
            <h3><Link to="/dbs">dbs</Link></h3>
            <h3><Link to="/js">js</Link></h3>
        </div>
      </>
    );
  }
}

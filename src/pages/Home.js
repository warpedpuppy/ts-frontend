import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
export default class Home extends Component {

  expand = (e) => {
    document.querySelectorAll('.sub-categories').forEach( item => {if(item !== e.target) item.classList.remove("open")})
    e.currentTarget.nextSibling.classList.add("open");
  }
  render() {
    return (
      <>
        <div className="main-menu-ul">
            <h3 onClick={this.expand}>css</h3>
                <ul className="sub-categories">
                    <li><Link to="/css">color units</Link></li>
                    <li>font units</li>
                </ul>
            <h3 onClick={this.expand}>html</h3>
            <ul className="sub-categories">
              <li>++ operator</li>
              <li>isNaN</li>
              </ul>
            <h3 onClick={this.expand}>js</h3>
            <ul className="sub-categories">
              <li>++ operator</li>
              <li>isNaN</li>
              </ul>
            <h3 onClick={this.expand}>dbs</h3>
              <ul className="sub-categories">
              <li>graphql</li>
              <li>postresql</li>
              <li>mongo</li>
              </ul>
                
        </div>


      </>
    );
  }
}

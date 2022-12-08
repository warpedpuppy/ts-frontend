import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Home.css';
import MongoServices from '../services/mongo-services';
import PostgresQL from '../services/postgresql-services';
import AWS from '../services/aws-services';
import HomePageAnimation from '../site-animations/home-page-animation';
import AppContext from '../AppContext';

export default class Home extends Component {
  state = {
    mongo: false,
    postresql: false,
    aws: false
  }
  static contextType = AppContext;
  componentDidMount = async () => {

    setTimeout(this.createSwirls, 100)

    let result = await MongoServices.getTotalRecords();

    if (result) {
      this.setState({mongo:true})
    }
    result = await PostgresQL.getTotalRecords();

    if (result) {
      this.setState({postresql:true})
    }
    result = await AWS.getTotalRecords();

    if (result) {
      this.setState({aws:true})
    }

    window.addEventListener('resize', this.resizeHandler);
  }
  createSwirls = () => {
    HomePageAnimation.init(this.context.browserWidth, this.context.browserHeight);
  }
  componentWillUnmount = () => {
    HomePageAnimation.destroy();
    window.removeEventListener('resize', this.resizeHandler);
  }
  resizeHandler = () => {
    let obj = this.context.updateContext();
    HomePageAnimation.resize(obj.browserWidth, obj.browserHeight);
  }

  render() {
    let d = new Date()
	let y = d.getFullYear();
	let diff = y - 2004;
    return (
      <div className="homePageShell">
      <section id="main-text">
        <div id="home-canvas"></div>
        <p>Hi, I'm Ted.</p>
        <p>This is my new site, but I sure do still love my <a href="https://warpedpuppy.com" target="_blank" rel="noopener noreferrer">old site</a>.</p>
        <p>I'm a webdev with {diff} years experience!</p>
        <p>Here is my <a href="https://github.com/warpedpuppy" rel="noopener noreferrer" target="_blank">github</a>, and here is my <a href="https://www.linkedin.com/in/edward-ted-walther-98926a8/" rel="noopener noreferrer" target="_blank">linkedin</a>.</p>
        <p>This site ties into three different dbs in order to let me experiment, let's see if they are up and running:</p>
        <ul>
          <li>remote mongo: <span className={this.state.mongo ? 'on' : 'off'}>{this.state.mongo.toString()}</span></li>
          <li>remote postrgresql: <span className={this.state.postresql ? 'on' : 'off'}>{this.state.postresql.toString()}</span></li>
          <li>aws postrgresql: <span className={this.state.aws ? 'on' : 'off'}>{this.state.aws.toString()}</span></li>
        </ul>
      </section>
      </div>
    );
  }
}

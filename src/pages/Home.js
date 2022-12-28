import React, { Component } from 'react';
import ConnectedToDB from '../components/home/ConnectedToDB';
import './Home.css';
import MongoServices from '../services/mongo-services';
import PostgresQL from '../services/postgresql-services';
import AWS from '../services/aws-services';
import HomePageAnimation from '../site-animations/home-page-animation';
import AppContext from '../AppContext';

export default class Home extends Component {
  state = {
    mongo: undefined,
    postresql: undefined,
    aws: undefined
  }
  static contextType = AppContext;
  componentDidMount = async () => {

    setTimeout(this.createSwirls, 100)

    let mongo = await MongoServices.getTotalRecords();
	this.setState({ mongo })


    let postresql = await PostgresQL.getTotalRecords();
	this.setState({ postresql })

    let aws = await AWS.getTotalRecords();
	this.setState({ aws })


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
          <li>express &rarr; mongo: <ConnectedToDB connected={ this.state.mongo } /></li>
          {/* <li>express &rarr;  postrgresql: <ConnectedToDB connected={ this.state.postresql } /></li>
          <li>lambda &rarr; postrgresql: <ConnectedToDB connected={ this.state.aws }/></li> */}
        </ul>
      </section>
      </div>
    );
  }
}

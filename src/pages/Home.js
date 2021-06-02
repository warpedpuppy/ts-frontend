import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log("boom")
    HomePageAnimation.destroy();
    window.removeEventListener('resize', this.resizeHandler);
  }
  resizeHandler = () => {
    let obj = this.context.updateContext();
    HomePageAnimation.resize(obj.browserWidth, obj.browserHeight);
  }

  render() {
    return (
      <>
      <section id="main-text">
        <div id="home-canvas"></div>
        <h2>Welcome!</h2>
        <p>It has been about a very, very long time since I created a personal site, so I decided to leave <a href="//warpedpuppy.com" rel="noreferrer" target="_blank">that site</a> alone and start scratch here.</p>
        <p>I talk about my professional history on the <Link to='/about'>about</Link> page.  Mostly this site is devoted to whatever <Link to="/js">js</Link>, <Link to="/css">css</Link>, or <Link to="/dbs">db</Link> issue I&apos;m currently dealing with or trying to communicate to a student.</p>
        <p>Let's see if the dbs are up and running:</p>
        <ul>
          <li>remote mongo: <span className={this.state.mongo ? 'on' : 'off'}>{this.state.mongo.toString()}</span></li>
          <li>remote postrgresql: <span className={this.state.postresql ? 'on' : 'off'}>{this.state.postresql.toString()}</span></li>
          <li>aws postrgresql: <span className={this.state.aws ? 'on' : 'off'}>{this.state.aws.toString()}</span></li>
        </ul>
      </section>
      </>
    );
  }
}

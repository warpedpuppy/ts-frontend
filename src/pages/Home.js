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
    return (
      <div className="homePageShell">
      <section id="main-text">
        <div id="home-canvas"></div>
        <p>Hi, I'm Ted.</p>
        <p>Let's see if the dbs are up and running:</p>
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

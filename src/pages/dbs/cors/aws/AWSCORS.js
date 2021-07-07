import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AWSCORSServices from './aws-cors-services';
export default class AWSCORS extends Component {

  testEndpoint = async e => {
      e.preventDefault();
      await AWSCORSServices.testEndpoint();
  }
  dbConnect = async e => {
        e.preventDefault();
        await AWSCORSServices.dbConnect();
    }
    specifiedOrigin = async e => {
        e.preventDefault();
        await AWSCORSServices.specifiedOrigin();
    }
    withMiddleware = async e => {
        e.preventDefault();
        await AWSCORSServices.withMiddleware();
    }
    multipleOrigins = async e => {
        e.preventDefault();
        await AWSCORSServices.multipleOrigins();
    }
  render() {
    return (
    <div> 
          <p>the goal was to create an aws endpoint that allowed more than one cross origin url.</p>
          <p>and as always, spoiler alert, the solution came from a combo of console logging all available data until I saw what was available to me and then some plain old JavaScript.</p>
          <p>lingering issue here is what role aws api gateway plays here -- when the cors settings there are clearly different</p>
          <p>add discussion of difference bettween yaml and handler and print out event object</p>
          <p>I split the tasks in groups to approach the issue systematically:
              <ol>
                <li><Button onClick={this.testEndpoint}>just test the endpoint</Button></li> 
                <li><Button onClick={this.dbConnect}>test to see whether the database can connect</Button></li>
                <li><Button variant="danger" onClick={this.specifiedOrigin}>test to see if the function will reject a domain not the origin</Button></li>
                <li><Button onClick={this.withMiddleware}>Attempt at using middy middleware to create cors list https://github.com/middyjs/middy</Button></li>
                <li> <Button onClick={this.multipleOrigins}>make a function that accepts multiple origin domains</Button></li> 
               
              </ol>
          </p>
    </div>
    );
  }
}

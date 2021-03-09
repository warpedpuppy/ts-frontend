import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AWSCORSServices from './aws-cors-services';
export default class AWSCORS extends Component {

  testEndpoint = async e => {
      e.preventDefault();
      let result = await AWSCORSServices.testEndpoint();
      console.log(result)
  }
  dbConnect = async e => {
        e.preventDefault();
        let result = await AWSCORSServices.dbConnect();
        console.log(result)
    }
    specifiedOrigin = async e => {
        e.preventDefault();
        let result = await AWSCORSServices.specifiedOrigin();
        console.log(result)
    }
    withMiddleware = async e => {
        e.preventDefault();
        let result = await AWSCORSServices.withMiddleware();
        console.log(result)
    }
    multipleOrigins = async e => {
        e.preventDefault();
        let result = await AWSCORSServices.multipleOrigins();
        console.log(result)
    }
  render() {
    return (
    <div> 
          <p>the goal was to create an aws endpoint that allowed more than one cross origin url.</p>
          <p>and as always, spoiler alert, the solution came from a combo of console logging all available data until I saw what was available to me and then some plain old JavaScript.</p>
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

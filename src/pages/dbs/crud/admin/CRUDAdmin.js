import React, { Component } from 'react';
import MongoServices from '../mongo/services/mongo-services';
import PosgresServices from '../postresql/services/postgresql-services';
import AWSServices from '../aws/services/aws-services';

export default class CRUDAdmin extends Component {

  state = {
    mongoAtlasRecordQ: 0,
    postgresRecordQ: 0,
    awsRecordQ: 0
  }

  componentDidMount = async () => {
    try {
      let {result} = await MongoServices.getTotalRecords();
      this.setState({mongoAtlasRecordQ: result})
    } catch (e) {
      console.error(e)
    }

    try {
      let result = await PosgresServices.getTotalRecords();
      this.setState({postgresRecordQ: result.total.rows[0].count})
    } catch (e) {
      console.error(e)
    }

    try {
      let {result} = await AWSServices.getTotalRecords();
      this.setState({awsRecordQ: result.rows[0].count})
    } catch (e) {
      console.error(e)
    }

    
  }
  empty = async (tech) => {
    try {
      if (tech === "mongo") {
        let result = await MongoServices.empty();
        if (result) this.setState({mongoAtlasRecordQ: 0})
      } else if (tech === "postgres") {
        let {success} = await PosgresServices.empty();
        if (success) this.setState({postgresRecordQ: 0})
      } else if (tech === "aws") {
        let {success} = await AWSServices.empty();
        console.log(success)
        if (success) this.setState({awsRecordQ: 0})
      }
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    return (
      <div> 
        <fieldset><legend>mongo</legend>
          <ul>
            <li>mongoatlas db record count: {this.state.mongoAtlasRecordQ} </li>
            <li><button onClick={() => this.empty("mongo")}>empty mongoatlas db</button></li>
          </ul>
        </fieldset>
        <fieldset><legend>postgres</legend>
          <ul>
            <li>empty postgres db record count: {this.state.postgresRecordQ} </li>
            <li><button onClick={() => this.empty("postgres")}>empty postgres db</button></li>
          </ul>
        </fieldset>
        <fieldset><legend>aws</legend>
          <ul>
            <li>empty aws db record count: {this.state.awsRecordQ} </li>
            <li><button onClick={() => this.empty("aws")}>empty aws db</button></li>
          </ul>
        </fieldset>
      </div>
    );
  }
}

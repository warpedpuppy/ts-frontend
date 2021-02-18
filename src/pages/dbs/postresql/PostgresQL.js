import React, { Component } from 'react';
import CrudButtons from '../components/CrudButtons';
import Config from '../../../config';
import Faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../../services/Utils';
export default class PostgresQL extends Component {

  componentDidMount = () => {
    this.uuid = uuidv4();
  }
  componentWillUnmount = async () => {
    let response = await fetch(`${Config.API_URL}/postgresql-restful/delete-all`, {
      method: "DELETE", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userid: this.uuid})
    })
    console.log('delete all response = ', response)
  }
  create = async (e) => {
      e.preventDefault();
      let obj = {
          userid: this.uuid,
          character_name: Faker.name.findName(),
          character_color: Utils.randomHex()
      }

      let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      })
      let responseJson = await response.json();
      console.log(responseJson)

  }
  read = async (e) => {
    e.preventDefault();
    let response = await fetch(`${Config.API_URL}/postgresql-restful/${this.uuid}`)
    let responseJson = await response.json();
    console.log(responseJson)
  }
  update = async (e, obj) => {
    e.preventDefault();

    let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    let responseJson = await response.json();
    console.log(responseJson)
  }
  delete = async (e, obj) => {
    e.preventDefault();
  
    let response = await fetch(`${Config.API_URL}/postgresql-restful`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    let responseJson = await response.json();
    console.log(responseJson)
  }
  
  render() {
      console.log("postgres")
    return (
      <CrudButtons create={this.create} read={this.read} update={this.update} delete={this.delete} />
    );
  }
}

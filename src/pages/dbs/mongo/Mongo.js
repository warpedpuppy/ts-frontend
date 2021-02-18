import React, { Component } from 'react';
import CrudButtons from '../components/CrudButtons';
import Config from '../../../config';
import Faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../../services/Utils';
export default class Mongo extends Component {
  state = {characters: [], activeCharacter: undefined}

  componentDidMount = () => {
    this.uuid = uuidv4();
  }
  componentWillUnmount = async () => {
    let response = await fetch(`${Config.API_URL}/mongo-restful/delete-all`, {
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

      let response = await fetch(`${Config.API_URL}/mongo-restful`, {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      })
      let responseJson = await response.json();
  }
  read = async (e) => {
    e.preventDefault();
    let response = await fetch(`${Config.API_URL}/mongo-restful/${this.uuid}`)
    let responseJson = await response.json();
    console.log(responseJson)
   this.setState({characters: responseJson, activeCharacter: responseJson[0]})
  }
  update = async (e) => {
    e.preventDefault();
    if (!this.state.activeCharacter) return;
    let obj = {
      id: this.state.activeCharacter.id,
      character_color: Utils.randomHex(),
      character_name: this.state.activeCharacter.character_name
    }
    let response = await fetch(`${Config.API_URL}/mongo-restful`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    let responseJson = await response.json();
    console.log(obj.id, responseJson)
  }
  delete = async (e) => {
    e.preventDefault();
    if (!this.state.activeCharacter) return;
    let obj = {
      id: this.state.activeCharacter.id
    }
    let response = await fetch(`${Config.API_URL}/mongo-restful`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    let responseJson = await response.json();
    console.log(obj.id, responseJson)
  }
  
  render() {
    return (
      <>
      <CrudButtons create={this.create} read={this.read} update={this.update} delete={this.delete} />
      <ul>
        {
          this.state.characters.map ( (item, index) => {
            return (<li key={index}>
              <ul>
                <li>{item.id}</li>
                <li>{item.character_color}</li>
                <li>{item.character_name}</li>
              </ul>
            </li>)
          })
        }
      </ul>
      </>
    );
  }
}

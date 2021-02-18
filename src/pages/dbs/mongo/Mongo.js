import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MongoServices from './services/mongo-services';
import CrudButtons from '../components/CrudButtons';
export default class Mongo extends Component {

  state = {characters: []}
  
  componentWillUnmount = async () => {
      console.log('delete all')
    MongoServices.deleteAll();
  }
  create = async e => {
        e.preventDefault();
        let characters = await MongoServices.create()
        this.setState({characters})
    } 
  delete = async (e, id) => {
    e.preventDefault();
    let characters = await MongoServices.delete(id)
    this.setState({characters})
  }
  editFormHandler = async (e, id) => {
    e.preventDefault();
    let name = e.target.name.value;
    let characters = await MongoServices.edit({_id: id, name, color: "#FF00FF"})
    this.setState({characters})
  }
  render() {
    return (
        <>
      <CrudButtons />
        <ul>
            {
                this.state.characters.map ( (c, i) => {
                    return (
                    <li key={i}>
                    <div>{c.name}, {c._id}</div>
                    <Button onClick={ e => this.delete(e, c._id)}>delete</Button>
                    <form onSubmit={e => this.editFormHandler(e, c._id)}>
                        <input type="text" name="name" defaultValue={c.name} />
                        <input type="submit" />
                    </form>
                    </li>)
                })
            }
        </ul>
      </>
    );
  }
}

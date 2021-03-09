import React from 'react';
import Utils from '../../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
import CrudButtons from './CrudButtons';
import './CrudBody.css';
import CharacterModule from './CharacterModule';
import FishTank from './FishTank';

export default class CrudBody extends React.Component {
    state = {activeCharacter: undefined, instructions: 'db is empty!', mode: undefined, characters: []};

    componentDidMount = () => {
      this.props.service.setUserID(uuidv4());
      this.props.service.deleteAllCharacters();
    }
    componentWillUnmount = async () => {
        try {
          await this.props.service.deleteAllCharacters();
        } catch(e) {
          console.error(e)
        } 
    }
    create = async (e) => {
      e.preventDefault();
      this.setState({mode: 'create'})
      if (this.state.characters.length >= 5) {
        this.setState({instructions: 'only 5 allowed!'})
        return;
      }
      try {
        let character = await this.props.service.create(this.state.characters.length); 
        console.log(character)
        //this.setState({characters: [...this.state.characters, character], instructions: ''})
      } catch(e) {
        console.error(e)
      } 
    }
    read = async (e) => {
      e.preventDefault();
      this.setState({mode: 'read'})
      let result = await this.props.service.read();
      let characters = Array.isArray(result) ? result : result.data.characters;
      if (!characters.length) {
        this.setState({instructions: "db is empty!"})
      } else {
        this.setState({characters, instructions: ''})
      }
      
    }
    update = async (e) => {
      e.preventDefault();
      if (!this.state.characters.length) {
        this.setState({instructions: "db is empty!"})
      } else {
        if (this.state.mode === 'update') {
          this.setState({instructions: '', mode: ''})
        } else {
          this.setState({instructions: 'click on char to update', mode: 'update'})
        }
      }
    }
    updateHandler = async (e, id, character_name) => {
      e.preventDefault();
      try {
        let newColor = Utils.randomHex();
        //remote
        await this.props.service.update(id, character_name, newColor);

        //local
        this.setState({characters: this.state.characters.map( character => {
          return Object.assign(character, {character_color: character_name === character.character_name ? newColor : character.character_color})}), instructions: '', mode: ''
        })
      } catch (e) {
          console.error(e)
      }
    }

    delete = (e) => {
      e.preventDefault();
      if (!this.state.characters.length) {
        this.setState({instructions: "db is empty!"})
      } else {
        if (this.state.mode === 'delete') {
          this.setState({instructions: '', mode: ''})
        } else {
          this.setState({instructions: 'click on char to delete', mode: 'delete'})
        }
      }
    }

    deleteHandler = async (id) => {
      try {
        this.setState({characters: this.state.characters.filter(c => c.id !== id)})
        this.setState({instructions: '', mode: ''})
        await this.props.service.delete(id); 
      } catch(e) {
        console.error(e)
      } 
    }
   
   render () {
    const { instructions } = this.state;
    return (
      <>
          <CrudButtons create={this.create} read={this.read} update={this.update} delete={this.delete} />
          <div className="instructions">{ instructions }</div>
          <div className={`character-div ${this.state.mode}`}>
            {
              this.state.characters.map((item, index) => <CharacterModule 
              key={index} 
              mode={this.state.mode}
              deleteHandler={this.deleteHandler} 
              changeColor={this.updateHandler} 
              {...item} /> )
            }
          </div>
          <FishTank characters={this.state.characters} />
          </>
        )
    }
}

import React from 'react';
import Mutations from './services/mutations';
import './DisplayChars.css';
import * as PIXI from 'pixi.js'
import Utils from '../../../services/Utils';
import { v4 as uuidv4 } from 'uuid';
import CrudButtons from '../components/CrudButtons';
import './GraphQL.css';
import Config from '../../../config';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CharacterModule from '../components/CharacterModule';

export default class GraphQL extends React.Component {
    state = {activeCharacter: undefined, instructions: '', mode: undefined, characters: []};

    constructor (){
      super()
        this.client = new ApolloClient({
        uri: `${Config.API_URL}/graphql`,
        cache: new InMemoryCache()
      });
      Mutations.setClient(this.client); console.log(this.client, `${Config.API_URL}/graphql`)
    }

    componentDidMount = () => {
      Mutations.setUserID(uuidv4());
      Mutations.deleteAllCharacters();
    }
    componentWillUnmount = async () => {
        try {
          await Mutations.deleteAllCharacters();
        } catch(e) {
          console.error(e)
        } 
    }
    create = async () => {
      try {
        let character = await Mutations.addChar(); 
        this.setState({characters: [...this.state.characters, character], instructions: ''})
      } catch(e) {
        console.error(e)
      } 
    }
    read = async () => {
      let result = await Mutations.getChars();
      if (!result.data.characters.length) {
        this.setState({instructions: "db is empty!"})
      } else {
        this.setState({characters: result.data.characters, instructions: ''})
      }
      
    }
  
    update = async (obj) => {
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
        let result = await Mutations.updateChar(id, character_name, newColor);

        //local
        this.setState({characters: this.state.characters.map( character => {
          return Object.assign(character, {character_color: character_name === character.character_name ? newColor : character.character_color})}), instructions: '', mode: ''
        })
      } catch (e) {
          console.error(e)
      }
    }


    delete = () => {
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
       let result = await Mutations.deleteChar(id); 
       console.log(result)
       if (result) {
        this.setState({characters: this.state.characters.filter(c => c.id !== id)})
       }
      } catch(e) {
        console.error(e)
      } 
    }
   



    chooseCharacter = (e) => {


      if (this.state.activeCharacter) return;
     

      if (this.state.mode === 'delete') {
        this.setState({activeCharacter: e.target})
        //remote
        this.deleteCharacter(this.state.activeCharacter.id);
        //local
        let char = this.characters.find( c => c === this.state.activeCharacter);
        this.stage.removeChild(char);
        this.characters.splice(this.characters.indexOf(char), 1)
        this.setState({activeCharacter: undefined})
        return;
      }  else if (this.state.mode === 'update') {
        this.setState({activeCharacter: e.target, instructions: ''})
        let temp = this.state.activeCharacter;
        temp.rotation = 0;
        temp.scale.set(1);
        temp.x = (this.canvasWidth / 2) - (temp.width / 2);
        temp.y = this.canvasHeight / 2;
      }
    

    }

  
    changeColorHandler = (e) => {
      e.preventDefault();
      this.setState({instructions: ''})
      let newColor =  Utils.randomHex();
       //change remote
       let obj = {
        character_name: this.state.activeCharacter.character_name,
        character_color: newColor,
        id: this.state.activeCharacter.id
      };
      this.updateCharacter(obj);

       //change local
       let temp = this.state.activeCharacter;
       temp.tint =  `0x${newColor.substring(1)}`;
       temp.scale.set(0.5);
       this.setState({activeCharacter: undefined})

    }

    cancelEdit = (e) => {
      if (e) e.preventDefault();
      if (this.state.activeCharacter) {
         this.state.activeCharacter.scale.set(0.5);
          this.setState({activeCharacter: undefined, mode: ''})
      }
     
    }
    crudButtonsHandler = (e) => {
      this.cancelEdit();
      let text = e.target.innerHTML;
      this.setState({instructions: '', mode: '', characters: []})
      if (text === 'Create') {
         this.addCharacter()
      } else if (text === 'Update') {
        this.setState({mode: 'update'})
        if (this.characters.length) {
          this.setState({instructions: "click on one to update its name or color"})
        } else {
          this.setState({instructions: "there are none to update! click create first!"})
        }
      } else if (text === 'Delete') {
        this.setState({mode: 'delete'})
        if (this.characters.length) {
          this.setState({instructions: "click on one to delete it"})
        } else {
          this.setState({instructions: "there are none to delete! click create first!"})
        }
        
      } else if (text === "Read") {
        this.getCharacters();
      }
    }


   render () {
    const { activeCharacter, instructions } = this.state;
    if (!this.client) return <div>loading. . . </div>
    return (
      <>
      <ApolloProvider client={this.client}>
          <CrudButtons create={this.create} read={this.read} update={this.update} delete={this.delete} />
          <div className="instructions">{ instructions }</div>
          <div className="character-div">
            {
              this.state.characters.map((item, index) => <CharacterModule 
              key={index} 
              mode={this.state.mode}
              deleteHandler={this.deleteHandler} 
              changeColor={this.updateHandler} 
              {...item} /> )
            }
          </div>
          </ApolloProvider>
          </>
        )
    }
}

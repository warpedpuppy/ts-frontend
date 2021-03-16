import React from 'react';
import Utils from '../../../../services/Utils';
import CrudButtons from './CrudButtons';
import './CrudBody.css';
import CharacterModule from './CharacterModule';
import FishTank from './FishTank';

export default class CrudBody extends React.Component {
    state = {activeCharacter: undefined, instructions: 'db is empty!', mode: undefined, characters: [], query: '', response: ''};

    componentDidMount = () => {
     // this.props.service.setUserID(uuidv4());
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
        let { character, query } = await this.props.service.create(this.state.characters.length); 

        if (character) {
          this.setState({
            characters: [...this.state.characters, character],
            instructions: "", 
            query, 
            response: JSON.stringify(character)
          })
        }

      } catch(e) {
        console.error(e)
      } 
    }
    read = async (e) => {
      e.preventDefault();
      this.setState({mode: 'read'})
      let { query, characters } = await this.props.service.read();
      //let characters = Array.isArray(response) ? response : response.data.characters;
      if (!characters.length) {
        this.setState({instructions: "db is empty!", query, response: JSON.stringify(characters)})
      } else {
        this.setState({characters, instructions: '', query, response: JSON.stringify(characters) })
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
        let newColor = Utils.trueRandomHex();
        //remote
        let { query, response } = await this.props.service.update(id, character_name, newColor);
        let characters = this.state.characters.map( character => {
          return Object.assign(character, {character_color: character_name === character.character_name ? newColor : character.character_color})})
          console.log(response)
        //local
        this.setState({
          characters, 
          instructions: '', 
          mode: '',
          query,
          response: JSON.stringify(response)
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
        let { query, character} = await this.props.service.delete(id); 
        this.setState({
          characters: this.state.characters.filter(c => c.id !== id), 
          instructions: '', 
          mode: '',
          query,
          response: JSON.stringify(character)
        })
      } catch(e) {
        console.error(e)
      } 
    }
   
   render () {
    const { mode, characters, query, response  } = this.state;
    return (
      <div className="crud-shell">
          <CrudButtons create={this.create} read={this.read} update={this.update} delete={this.delete} />

          {  
          this.state.characters.length > 0 &&  <table className={`character-table ${mode}`}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>character name</th>
                      <th>character color</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.characters.map((item, index) => <CharacterModule 
                    key={index}
                    index={index} 
                    mode={this.state.mode}
                    deleteHandler={this.deleteHandler} 
                    changeColor={this.updateHandler} 
                    {...item} /> )
                  }
                  </tbody>
                </table>
            }


          <div className="query-response-div">
            <code><h3>query</h3>{query}</code>
            <code><h3>response</h3>{response}</code>
          </div>
          <FishTank characters={characters} />
          </div>
        )
    }
}

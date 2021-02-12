import React from 'react';
import Mutations from './services/mutations';
import EditChar from './EditChar';
import { Button } from 'react-bootstrap';
import './DisplayChars.css';
export default class DisplayChars extends React.Component {
    state = {characters: []};
    addCharacter = async () => {
      try {
        let result = await Mutations.addChar(); 
       this.setState({characters: result})
      } catch(e) {
        console.error(e)
      } 
    }
    deleteCharacter = async (id) => {
      try {
       let result = await Mutations.deleteChar(id); 
       this.setState({characters: result})
      } catch(e) {
        console.error(e)
      } 
    }
    updateCharacter = async (id, name, color) => {
      try {
        let result = await Mutations.updateName(id, name, color);
        this.setState({characters: result});
        return result ? true : false;
      } catch (e) {
          console.error(e)
      }
    }

   showEditForm (e) {
      e.preventDefault();
      let classList = e.target.parentElement.parentElement.classList;
      if (!classList.contains("edit")){classList.add('edit')} else {classList.remove('edit')}
    }

   render () {
    const { characters } = this.state;
    return (
        <>
          <Button onClick={e => this.addCharacter()}>create</Button>
          <div className="graphql-fish-tank"></div>
          <div className="character-grid">
            {characters.map(c => {
              let style={backgroundColor: `${c.color}`}
              return (
                <div className="character" style={style} key={c.id} >
                <div className="character-name"> {c.name} </div>
                  <div>
                    <Button onClick={ e => this.deleteCharacter(c.id) }>delete</Button>
                    <Button onClick={this.showEditForm}>edit</Button>
                    <EditChar updateCharacter={this.updateCharacter} {...c}/>
                  </div>
                </div> )
              })
            }
          </div>
        </>
        )
    }
}

import React from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import AddChar from './AddChar';

import DeleteChar from './DeleteChar';
import EditChar from './EditChar';
import {Button} from 'react-bootstrap';
import './DisplayChars.css';
import Mutations from './services/mutations';
export default class DisplayChars extends React.Component {

    state = {characters: []}

    componentDidMount = async () => {
        let result = await Mutations.getChars();
        console.log(result)
       this.setState({characters: result.data.characters});

    }


   edit (e, id) {
      e.preventDefault();
      let classList = e.target.parentElement.parentElement.classList;
      if (!classList.contains("edit")){classList.add('edit')} else {classList.remove('edit')}
      //props.editCharacter(e, id)
    }
   render(){
    return (
        <>
          {/* <Button onClick={() => refetch()}>Refetch!</Button> */}
          <AddChar />
          <div className="character-grid">
            {this.state.characters.map(c => {
              console.log("HERE")
            let style={backgroundColor: `${c.color}`}
            return (
              <div className="character" style={style} key={c.id} >
               <div className="character-name"> {c.name} </div>
                <div>
                  <DeleteChar id={c.id} />
                  <Button onClick={(e) => this.edit(e, c.id)}>edit</Button>
                  <EditChar client={this.props.client} id={c.id} name={c.name} />
                </div>
              </div> )
            })
            }
          </div>
        </>
        )
          }
}

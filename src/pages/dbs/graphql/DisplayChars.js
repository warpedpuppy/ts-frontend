import React from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import AddChar from './AddChar';

import DeleteChar from './DeleteChar';
import {Button} from 'react-bootstrap';
import './DisplayChars.css';
export default function DisplayChars(props) {

    const CHARS = gql`
    query GetCharacters {
        characters {
          id
          name
          color
        }
      }`;



    const { loading, error, data, refetch, networkStatus } = useQuery(CHARS,  {
        notifyOnNetworkStatusChange: true,
      });
    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

   
    return (
        <>
          <Button onClick={() => refetch()}>Refetch!</Button>
          <AddChar GET_CHARS={CHARS} />
          <div className="character-grid">
            {data.characters.map(c => {
            let style={backgroundColor: `${c.color}`}
            return (
              <div className="character" style={style} key={c.id} >
                {c.name}
                <div>
                  <DeleteChar id={c.id}  GET_CHARS={CHARS} />
                  {/* <div onClick={(e) => deleteCharacter(e, c.id)}>delete</div> */}
                  <span>edit</span>
                </div>
              </div> )
            })
            }
          </div>
        </>
        )
}

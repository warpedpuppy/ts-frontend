import React from 'react'
// import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import Mutations from './services/mutations';
export default function DeleteChar(props) {

    // const DELETE_CHAR = gql`
    //     mutation deleteCharacter {
    //         deleteCharacter(input:{
    //         id:  "${props.id}"
    //         }) {
    //         id
    //         name
    //         color
    //         }
    //     }`;
    // const [deleteChar] = useMutation(DELETE_CHAR, {
    //     refetchQueries: [
    //         {
    //             query: props.GET_CHARS
    //         }
    //     ]
    // });
    return (
        <div>
            <Button onClick={ e => Mutations.deleteChar(props.id) }>delete</Button>
        </div>
    )
}

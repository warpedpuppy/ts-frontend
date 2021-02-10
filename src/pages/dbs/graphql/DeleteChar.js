import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
export default function AddChar(props) {

    const DELETE_CHAR = gql`
        mutation deleteCharacter {
            deleteCharacter(input:{
            id:  "${props.id}"
            }) {
            id
            name
            color
            }
        }`;
    const [deleteChar] = useMutation(DELETE_CHAR, {
        refetchQueries: [
            {
                query: props.GET_CHARS
            }
        ]
    });
    return (
        <div>
            <Button onClick={e => {e.preventDefault(); deleteChar(); }}>delete</Button>
        </div>
    )
}
